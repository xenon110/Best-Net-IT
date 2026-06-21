export const NavBar = () => {
  return (
    <nav className="w-full top-0 sticky bg-surface border-b border-outline-variant/30 shadow-sm shadow-on-surface/5 z-50">
      <div className="flex justify-between items-center px-margin-mobile md:px-margin-desktop py-6 max-w-container-max mx-auto">
        <div className="font-headline-sm text-headline-sm tracking-tight text-primary">
          ELITE IT DISTRO
        </div>
        <div className="hidden md:flex space-x-8">
          <a className="text-secondary hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#">Products</a>
          <a className="text-secondary hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#">Brands</a>
          <a className="text-secondary hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#">Industries</a>
          <a className="text-secondary hover:text-primary transition-colors duration-300 font-label-sm text-label-sm" href="#">Support</a>
        </div>
        <div className="flex items-center space-x-4">
          <span className="material-symbols-outlined text-on-surface hover:text-primary cursor-pointer transition-colors">search</span>
          <button className="btn-primary px-6 py-2 rounded font-label-sm text-label-sm hidden md:block">
            Request a Quote
          </button>
          <span className="material-symbols-outlined md:hidden text-on-surface">menu</span>
        </div>
      </div>
    </nav>
  );
};
