"use client";

import { DiscoverButton } from "@/components/ui/DiscoverLink";
import { capabilities } from "@/content/capabilities";

export function ProjectInquiryForm() {
  return (
    <form className="space-y-8" aria-describedby="prototype-form-notice">
      <p
        id="prototype-form-notice"
        className="border-l-2 border-ink bg-stone px-5 py-4 text-sm leading-6 text-muted"
      >
        Form preview only. It is not connected and will not send your enquiry. Use the email address below to contact NARMA.design.
      </p>
      <fieldset disabled className="grid gap-8 sm:grid-cols-2">
        <legend className="sr-only">Enquiry form preview. Fields are disabled.</legend>
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
            spellCheck={false}
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
      </fieldset>
      <label className="flex flex-col gap-2 text-sm">
        Project description
        <textarea
          required
          name="description"
          rows={5}
          disabled
          className="resize-y border-b border-ink/50 bg-transparent px-0 py-3 outline-none transition-colors focus:border-ink"
        />
      </label>
      <label className="sr-only" aria-hidden="true">
        Leave this field empty
        <input name="website" type="text" tabIndex={-1} autoComplete="off" disabled />
      </label>
      <DiscoverButton type="button" disabled className="w-fit">
        Form unavailable
      </DiscoverButton>
    </form>
  );
}
