import { permanentRedirect } from "next/navigation";

export default function LegacyStudioRedirect() {
  permanentRedirect("/approach");
}
