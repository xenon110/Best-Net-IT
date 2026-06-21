import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  quote: string;
  name: string;
  designation: string;
  src: string;
}

function calculateGap(width: number) {
  const minWidth = 1024;
  const maxWidth = 1456;
  const minGap = 60;
  const maxGap = 86;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth)
    return Math.max(minGap, maxGap + 0.06018 * (width - maxWidth));
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Elite IT Distro transformed our procurement process entirely. Their concierge-level service and global logistics made deploying 2,000 workstations across 12 countries seamless.",
    name: "Sarah Chen",
    designation: "CTO, Meridian Financial Group",
    src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "The quality and reliability of hardware sourced through Elite IT is unmatched. We've reduced our equipment failure rate by 40% since partnering with them.",
    name: "James Whitfield",
    designation: "VP of Infrastructure, Nexus Technologies",
    src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "What sets Elite IT apart is their understanding of enterprise needs. They don't just sell hardware — they architect solutions that scale with your business.",
    name: "Amara Okafor",
    designation: "Director of IT, Atlas Consulting",
    src: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=500&h=500&fit=crop&crop=face",
  },
  {
    quote:
      "Their exclusive access to premium workstation lines gave us a competitive edge. The dedicated account team is responsive, knowledgeable, and genuinely invested in our success.",
    name: "Marcus Lindgren",
    designation: "Head of Engineering, Polaris Studio",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop&crop=face",
  },
];

export const Testimonials = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverPrev, setHoverPrev] = useState(false);
  const [hoverNext, setHoverNext] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1200);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const testimonialsLength = defaultTestimonials.length;
  const activeTestimonial = useMemo(
    () => defaultTestimonials[activeIndex],
    [activeIndex]
  );

  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    autoplayIntervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    }, 5000);
    return () => {
      if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
    };
  }, [testimonialsLength]);

  const handleNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  const handlePrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + testimonialsLength) % testimonialsLength);
    if (autoplayIntervalRef.current) clearInterval(autoplayIntervalRef.current);
  }, [testimonialsLength]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handlePrev, handleNext]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.8;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + testimonialsLength) % testimonialsLength === index;
    const isRight = (activeIndex + 1) % testimonialsLength === index;
    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 1,
        pointerEvents: "auto",
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.85) rotateY(-15deg)`,
        transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none",
      transition: "all 0.8s cubic-bezier(.4,2,.3,1)",
    };
  }

  const quoteVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <section className="testimonials-section">
      <div className="max-w-container-max mx-auto px-margin-mobile md:px-margin-desktop">
        <div className="text-center mb-16">
          <span className="px-3 py-1 text-xs border rounded-full border-outline text-on-surface-variant font-label-sm uppercase tracking-wider inline-block mb-4">
            Client Voices
          </span>
          <h2 className="font-headline-md text-headline-md text-on-surface mb-4">
            Trusted by Industry Leaders
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto">
            Hear from the executives and technology leaders who rely on Elite IT Distribution for their most critical infrastructure needs.
          </p>
        </div>

        <div className="testimonial-wrapper">
          <div className="testimonial-grid">
            {/* Images */}
            <div className="image-container" ref={imageContainerRef}>
              {defaultTestimonials.map((testimonial, index) => (
                <img
                  key={testimonial.src}
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="testimonial-image"
                  style={getImageStyle(index)}
                />
              ))}
            </div>
            {/* Content */}
            <div className="testimonial-content">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  variants={quoteVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  <h3 className="testimonial-name">
                    {activeTestimonial.name}
                  </h3>
                  <p className="testimonial-designation">
                    {activeTestimonial.designation}
                  </p>
                  <motion.p className="testimonial-quote">
                    {activeTestimonial.quote.split(" ").map((word, i) => (
                      <motion.span
                        key={i}
                        initial={{
                          filter: "blur(10px)",
                          opacity: 0,
                          y: 5,
                        }}
                        animate={{
                          filter: "blur(0px)",
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          duration: 0.22,
                          ease: "easeInOut",
                          delay: 0.025 * i,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {word}&nbsp;
                      </motion.span>
                    ))}
                  </motion.p>
                </motion.div>
              </AnimatePresence>
              <div className="arrow-buttons">
                <button
                  className="arrow-button"
                  onClick={handlePrev}
                  style={{
                    backgroundColor: hoverPrev ? "#c5a059" : "#1b1c1c",
                  }}
                  onMouseEnter={() => setHoverPrev(true)}
                  onMouseLeave={() => setHoverPrev(false)}
                  aria-label="Previous testimonial"
                >
                  <FaArrowLeft size={16} color="#ffffff" />
                </button>
                <button
                  className="arrow-button"
                  onClick={handleNext}
                  style={{
                    backgroundColor: hoverNext ? "#c5a059" : "#1b1c1c",
                  }}
                  onMouseEnter={() => setHoverNext(true)}
                  onMouseLeave={() => setHoverNext(false)}
                  aria-label="Next testimonial"
                >
                  <FaArrowRight size={16} color="#ffffff" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
