"use client";

import { FormEvent, useState } from "react";
import { DiscoverButton } from "@/components/ui/DiscoverLink";
import { capabilities } from "@/content/capabilities";

export function ProjectInquiryForm() {
  const [status, setStatus] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    setPending(true);
    const form = event.currentTarget;
    const data = new FormData(form);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      const result = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(result.error ?? "The enquiry could not be submitted.");
      setStatus("Your enquiry has been sent.");
      form.reset();
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "The enquiry could not be submitted.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <p
        id="prototype-form-notice"
        className="border border-ink/40 bg-gold/10 p-4 text-sm leading-6 text-muted"
      >
        Enquiry details are checked by the server. Message delivery is not configured yet, so this
        form will not send your enquiry.
      </p>
      <div className="grid gap-8 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          Name
          <input
            required
            name="name"
            type="text"
            autoComplete="name"
            aria-describedby="prototype-form-notice"
            className="border-b border-ink/50 bg-transparent px-0 py-3 outline-none transition-colors focus:border-ink"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Email
          <input
            required
            name="email"
            type="email"
            autoComplete="email"
            aria-describedby="prototype-form-notice"
            className="border-b border-ink/50 bg-transparent px-0 py-3 outline-none transition-colors focus:border-ink"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Organization <span className="text-muted">(optional)</span>
          <input
            name="organization"
            type="text"
            autoComplete="organization"
            className="border-b border-ink/50 bg-transparent px-0 py-3 outline-none transition-colors focus:border-ink"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm">
          Service required
          <select
            required
            name="service"
            defaultValue=""
            className="border-b border-ink/50 bg-transparent px-0 py-3 outline-none transition-colors focus:border-ink"
          >
            <option value="" disabled>
              Select a service
            </option>
            {capabilities.map((capability) => (
              <option key={capability.title} value={capability.title}>{capability.title}</option>
            ))}
          </select>
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm">
        Project description
        <textarea
          required
          name="description"
          rows={5}
          className="resize-y border-b border-ink/50 bg-transparent px-0 py-3 outline-none transition-colors focus:border-ink"
        />
      </label>
      <label className="sr-only" aria-hidden="true">
        Leave this field empty
        <input name="website" type="text" tabIndex={-1} autoComplete="off" />
      </label>
      <DiscoverButton type="submit" disabled={pending} className="w-fit">
        {pending ? "Checking enquiry" : "Send project enquiry"}
      </DiscoverButton>
      {status ? <p role="status" aria-live="polite" className="text-sm text-muted">{status}</p> : null}
    </form>
  );
}
