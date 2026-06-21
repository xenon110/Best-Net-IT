import { ContainerScroll } from "./ContainerScroll";

export const Hero = () => {
  const Title = (
    <div className="mb-6">
      <h1 className="font-display-lg-mobile md:font-display-lg text-display-lg-mobile md:text-display-lg text-on-surface mb-6">
        Global IT Excellence. <br />
        <span className="text-primary">Delivered with Precision.</span>
      </h1>
      <p className="font-body-lg text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto">
        Experience concierge-level enterprise procurement. We connect the world's most demanding businesses with premium technology solutions, defined by clarity, reliability, and an uncompromising standard of service.
      </p>
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="btn-primary px-8 py-3 rounded font-label-sm text-label-sm">
          Explore Catalog
        </button>
        <button className="btn-secondary px-8 py-3 rounded font-label-sm text-label-sm bg-surface-container-lowest">
          Speak to an Advisor
        </button>
      </div>
    </div>
  );

  return (
    <section className="relative overflow-hidden w-full bg-background pt-10">
      <ContainerScroll titleComponent={Title}>
        {/* Animated Card Content */}
        <div className="w-full h-full relative rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB70qJggXNz_mZwaarl9jecU66VhillI0MkDMTdgWrYkwiiT3_fGYk0AJowKkXz10FR2x9OMkRCXn0pxat75HM4jdQtXYFvimkrvu4DDgPM80FzY-jpmmbjFBWDwPYv4DLFAYcgppf3z37aG-EfCSWF6srGn9qQJN1HRjucfYXuPJaMLa-2yBhHE2W-LM2YwDAjo8SdetYlXgrPb3GSZB_QOa6ueBKx8ymyrMIZQ6JoNHmTRbDr4Cje1JZfvW45eP_FoCoVqy28d61n')",
            }}
          ></div>
        </div>
      </ContainerScroll>
    </section>
  );
};
