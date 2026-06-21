export const Stats = () => {
  return (
    <section className="py-20 bg-surface-container-lowest border-y border-outline-variant/30 relative z-30 -mt-10 mx-margin-mobile md:mx-margin-desktop rounded-lg soft-shadow">
      <div className="max-w-container-max mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 divide-x divide-outline-variant/30">
          <div className="text-center px-4">
            <div className="font-headline-md text-headline-md text-primary mb-2">15+</div>
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Years Excellence</div>
          </div>
          <div className="text-center px-4">
            <div className="font-headline-md text-headline-md text-primary mb-2">120+</div>
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Countries</div>
          </div>
          <div className="text-center px-4">
            <div className="font-headline-md text-headline-md text-primary mb-2">5K+</div>
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">Partners</div>
          </div>
          <div className="text-center px-4">
            <div className="font-headline-md text-headline-md text-primary mb-2">50K+</div>
            <div className="font-label-sm text-label-sm text-secondary tracking-widest uppercase">SKUs</div>
          </div>
        </div>
      </div>
    </section>
  );
};
