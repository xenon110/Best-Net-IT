export const BentoGrid = () => {
  return (
    <section className="py-32 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      <div className="text-center mb-16">
        <h2 className="font-headline-md text-headline-md text-on-surface mb-4">Curated Technology Portfolios</h2>
        <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">Discover our selection of enterprise-grade hardware, carefully sourced to meet the exacting standards of global industry leaders.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Commercial Laptops */}
        <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden card-border soft-shadow transition-transform duration-300 hover:-translate-y-1">
          <div className="aspect-w-16 aspect-h-10 bg-surface-container-low relative min-h-[250px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDw7eqTs44E5iAnNYcneueMaPJD4vVixF6-Eh8kU23fYbqdSHv8NBk3Gth8rtgPDcWxpv_9ED-uH-jgTWq8vf5Fn0ZM7ELcVlM2vEe8WUS0NO9TudiGFhrJkxKtlNAzDNm-fgrn4Z037_8b77IWabbfy1f7zGIMcx1fTOMqSC_nSUqXvZsc2_3wTf2l1GljUEjOBv0F1P5bsU3gVNv17ROIl1gRMYvxhgFZ6Yo1MvLpbs-8I41D11FZfq8qYTQs4Tq9hpz_hEz0q6B_')" }}></div>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Commercial Laptops</h3>
              <span className="material-symbols-outlined text-primary">laptop_mac</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Fleet-ready, high-performance mobility solutions for the modern executive workforce.</p>
            <a className="inline-flex items-center font-label-sm text-label-sm text-primary hover:text-on-primary-container transition-colors" href="#">
              View Collection <span className="material-symbols-outlined ml-2 text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
        {/* Workstations */}
        <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden card-border soft-shadow transition-transform duration-300 hover:-translate-y-1">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary-container"></div>
          <div className="aspect-w-16 aspect-h-10 bg-surface-container-low relative min-h-[250px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuB1KtI7_DY7qM-b31eNOANfAhdSEWf9nf0CZuPQ-nCKCFFC_uN9VyzlH7Y434WY7aFRrp2pngGBaq9gV61paIxNj8DV2SdB9PV7lIqOklzsA95I1deNWJR7Ucu3xbFMbbquHD2-TYrEaf_90M59YtVIlIoLI3I0i5FpiwrpCDoIPDqvVuyRQIfV0XDvewdu9Gxe_Kw70ZJs0gbvziza1e6NeGOxMhfmTpYjFJGe-PWw1VTQcqLdVvi7ZikEDnOQkmhTKw5Emfosz5JT')" }}></div>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Workstations</h3>
                <span className="bg-primary-container/20 text-on-primary-container px-2 py-1 rounded-[2px] font-label-sm text-[10px] tracking-wider uppercase">Exclusive</span>
              </div>
              <span className="material-symbols-outlined text-primary">computer</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Uncompromising compute power for data science, engineering, and advanced rendering.</p>
            <a className="inline-flex items-center font-label-sm text-label-sm text-primary hover:text-on-primary-container transition-colors" href="#">
              View Collection <span className="material-symbols-outlined ml-2 text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
        {/* Gaming & Creation */}
        <div className="group relative bg-surface-container-lowest rounded-xl overflow-hidden card-border soft-shadow transition-transform duration-300 hover:-translate-y-1">
          <div className="aspect-w-16 aspect-h-10 bg-surface-container-low relative min-h-[250px]">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDd4KDMtukB41C1hMkKfzlhTWpls0SKgGofEYsOjwng9UHzzbaJda0L4xENKkySqHGlddtKhjLqyN5IMVj1qgu7YeK0VyTKg_MgkOpn7ef_E484ZUcEdd2pqFg6W8y1D6f5rQC7jpsRptMdM1_eAyHjchy31eyHKMx1yT7UGxhvjL9TLE6JeU4UrEy0GaU_KD63jnGC-Kiy13oV90KUo62xu6GefWEgB9Lw0kcmnVJJ4Xx9QhK6x1mckwfMqyWEKvS0yPPRkb3VmzD2')" }}></div>
          </div>
          <div className="p-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline-sm text-headline-sm text-on-surface">Gaming &amp; Creation</h3>
              <span className="material-symbols-outlined text-primary">sports_esports</span>
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">Specialized hardware driving the next generation of digital entertainment and media production.</p>
            <a className="inline-flex items-center font-label-sm text-label-sm text-primary hover:text-on-primary-container transition-colors" href="#">
              View Collection <span className="material-symbols-outlined ml-2 text-[16px]">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
