type PageIntroProps = {
  eyebrow?: string;
  title: string;
  description: string;
};

export function PageIntro({ eyebrow, title, description }: PageIntroProps) {
  return (
    <section className="border-b border-ink/15">
      <div className="site-container py-16 sm:py-24">
        {eyebrow ? <p className="mb-8 text-sm uppercase tracking-[0.14em] text-muted">{eyebrow}</p> : null}
        <h1 className="editorial-title max-w-5xl text-6xl leading-[0.88] tracking-[-0.07em] sm:text-8xl">
          {title}
        </h1>
        <p className="mt-10 max-w-xl text-lg leading-7 text-muted">{description}</p>
      </div>
    </section>
  );
}
