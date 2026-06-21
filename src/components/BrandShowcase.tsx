import SocialCards from "./SocialCards";

const brandCards: { imgUrl: string; alt?: string; linkUrl?: string }[] = [
  {
    imgUrl: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=500&fit=crop",
    alt: "Enterprise Computing",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=500&fit=crop",
    alt: "Data Center Solutions",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=500&fit=crop",
    alt: "Circuit Innovation",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400&h=500&fit=crop",
    alt: "Modern Workstations",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=500&fit=crop",
    alt: "Cybersecurity",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=400&h=500&fit=crop",
    alt: "Networking Hardware",
  },
  {
    imgUrl: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=500&fit=crop",
    alt: "Cloud Infrastructure",
  },
];

export const BrandShowcase = () => {
  return (
    <section className="brand-showcase-section">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-4">
          <span className="px-3 py-1 text-xs border rounded-full border-outline text-on-surface-variant font-label-sm uppercase tracking-wider inline-block mb-4">
            Our Ecosystem
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Powering Enterprise Technology
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            From cutting-edge processors to enterprise networking — explore the technology that drives global business forward.
          </p>
        </div>
      </div>

      <SocialCards cards={brandCards} />

      {/* Bottom tagline to fill space */}
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="brand-showcase-bottom">
          <div className="brand-showcase-divider"></div>
          <div className="brand-showcase-stats">
            <div className="brand-stat">
              <span className="brand-stat-number">200+</span>
              <span className="brand-stat-label">Global Brands</span>
            </div>
            <div className="brand-stat-separator"></div>
            <div className="brand-stat">
              <span className="brand-stat-number">50K+</span>
              <span className="brand-stat-label">Products in Stock</span>
            </div>
            <div className="brand-stat-separator"></div>
            <div className="brand-stat">
              <span className="brand-stat-number">99.8%</span>
              <span className="brand-stat-label">Fulfillment Rate</span>
            </div>
          </div>
          <p className="brand-showcase-tagline">
            Every product we distribute is sourced directly from authorized channels — guaranteeing authenticity, warranty coverage, and enterprise-grade reliability.
          </p>
        </div>
      </div>
    </section>
  );
};
