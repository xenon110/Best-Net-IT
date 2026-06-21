import React from "react";
import { motion } from "framer-motion";

export const LampCTA = () => {
  return (
    <LampContainer>
      <motion.div
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="text-center"
      >
        <h2 className="lamp-heading">
          Ready to Elevate <br /> Your IT Infrastructure?
        </h2>
        <p className="lamp-subtext">
          Partner with Elite IT Distribution and experience concierge-level
          procurement backed by 15+ years of global excellence.
        </p>
        <div className="lamp-buttons">
          <button className="lamp-btn-primary">
            Request a Quote
          </button>
          <button className="lamp-btn-secondary">
            Speak to an Advisor
          </button>
        </div>
      </motion.div>
    </LampContainer>
  );
};

const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={`lamp-container ${className || ""}`}
    >
      <div className="lamp-inner">
        {/* Left conic gradient arm */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="lamp-arm lamp-arm-left"
          style={{
            backgroundImage: `conic-gradient(from 70deg at center top, #c5a059, transparent, transparent)`,
          }}
        >
          <div className="lamp-mask-bottom" />
          <div className="lamp-mask-left" />
        </motion.div>

        {/* Right conic gradient arm */}
        <motion.div
          initial={{ opacity: 0.5, width: "15rem" }}
          whileInView={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="lamp-arm lamp-arm-right"
          style={{
            backgroundImage: `conic-gradient(from 290deg at center top, transparent, transparent, #c5a059)`,
          }}
        >
          <div className="lamp-mask-bottom" />
          <div className="lamp-mask-right" />
        </motion.div>

        {/* Background blur layer */}
        <div className="lamp-bg-blur"></div>
        {/* Backdrop blur */}
        <div className="lamp-backdrop"></div>
        {/* Central glow orb */}
        <div className="lamp-glow-orb"></div>
        {/* Animated inner glow */}
        <motion.div
          initial={{ width: "8rem" }}
          whileInView={{ width: "16rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="lamp-glow-inner"
        ></motion.div>
        {/* Animated light bar */}
        <motion.div
          initial={{ width: "15rem" }}
          whileInView={{ width: "30rem" }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="lamp-light-bar"
        ></motion.div>
        {/* Top dark cover */}
        <div className="lamp-top-cover"></div>
      </div>

      <div className="lamp-content">
        {children}
      </div>
    </div>
  );
};
