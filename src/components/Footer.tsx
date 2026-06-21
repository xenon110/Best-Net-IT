export const Footer = () => {
  return (
    <footer className="w-full mt-20 bg-surface-container-low border-t border-outline-variant/20">
      <div className="flex flex-col md:flex-row justify-between items-center px-margin-mobile md:px-margin-desktop py-12 max-w-container-max mx-auto gap-gutter">
        <div className="font-headline-sm text-headline-sm text-on-surface text-center md:text-left mb-6 md:mb-0">
          ELITE IT DISTRO
        </div>
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          <a className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Privacy Policy</a>
          <a className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Terms of Service</a>
          <a className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">ISO Certifications</a>
          <a className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Global Logistics</a>
          <a className="font-label-sm text-label-sm text-on-secondary-container hover:text-primary underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity" href="#">Careers</a>
        </div>
      </div>
      <div className="text-center py-6 border-t border-outline-variant/10 text-on-surface-variant font-label-sm text-label-sm opacity-60">
        © 2024 Elite IT Distribution. All rights reserved. Global Excellence in B2B Technology.
      </div>
    </footer>
  );
};
