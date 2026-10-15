import { capabilities } from "@/content/capabilities";

const MAX_BODY_BYTES = 16_384;
const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_ORGANIZATION = 160;
const MAX_DESCRIPTION = 5_000;
const allowedServices = new Set(capabilities.map(({ title }) => title));

function jsonError(message: string, status: number) {
  return Response.json(
    { error: message },
    { status, headers: { "Cache-Control": "no-store" } },
  );
}

function requestOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin) return origin;

  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

async function readLimitedBody(request: Request) {
  const reader = request.body?.getReader();
  if (!reader) return null;

  const chunks: Uint8Array[] = [];
  let total = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.byteLength;
    if (total > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder("utf-8", { fatal: true }).decode(body);
}

export async function POST(request: Request) {
  const expectedOrigin = new URL(request.url).origin;
  if (requestOrigin(request) !== expectedOrigin) {
    return jsonError("Request origin could not be verified.", 403);
  }

  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return jsonError("Cross-site requests are not accepted.", 403);
  }

  const mediaType = request.headers.get("content-type")?.split(";", 1)[0].trim().toLowerCase();
  if (mediaType !== "application/json") {
    return jsonError("A JSON request is required.", 415);
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (declaredLength > MAX_BODY_BYTES) {
    return jsonError("Request is too large.", 413);
  }

  let rawBody: string;
  try {
    const body = await readLimitedBody(request);
    if (body === null) return jsonError("Request is too large.", 413);
    rawBody = body;
  } catch {
    return jsonError("Request body could not be read.", 400);
  }

  let data: unknown;
  try {
    data = JSON.parse(rawBody);
  } catch {
    return jsonError("Request body must contain valid JSON.", 400);
  }

  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return jsonError("Enquiry details are invalid.", 400);
  }

  const fields = data as Record<string, unknown>;
  const { name, email, organization, service, description, website } = fields;
  const validString = (value: unknown, max: number) =>
    typeof value === "string" && value.trim().length > 0 && value.length <= max;

  if (typeof website === "string" && website.trim()) {
    return jsonError("Enquiry details are invalid.", 400);
  }
  if (
    !validString(name, MAX_NAME) ||
    !validString(email, MAX_EMAIL) ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email as string) ||
    !(organization === "" || organization === undefined || validString(organization, MAX_ORGANIZATION)) ||
    typeof service !== "string" ||
    !allowedServices.has(service) ||
    !validString(description, MAX_DESCRIPTION)
  ) {
    return jsonError("Please check the enquiry fields and try again.", 400);
  }

  // Delivery is intentionally disabled until the studio supplies its destination and provider.
  return jsonError("Enquiry delivery is not configured yet. No message was sent.", 503);
}
