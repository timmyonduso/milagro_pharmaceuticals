import React, { useRef, useState, useEffect } from "react";
import { gsap } from "gsap";
import { X, Menu } from "lucide-react";

const menuItems = ["Home", "About", "Projects", "Services", "Contact"];

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef([]);
  const iconRef = useRef(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";

      gsap.fromTo(
        overlayRef.current,
        { autoAlpha: 0, scale: 0.95, yPercent: -10 },
        {
          autoAlpha: 1,
          scale: 1,
          yPercent: 0,
          duration: 0.6,
          ease: "power4.out",
        }
      );

      gsap.from(menuLinksRef.current, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        delay: 0.2,
      });
    } else {
      document.body.style.overflow = "auto";
      gsap.to(overlayRef.current, {
        autoAlpha: 0,
        scale: 0.95,
        yPercent: -10,
        duration: 0.4,
        ease: "power2.inOut",
      });
    }
  }, [open]);

  const toggleMenu = () => setOpen(!open);

  return (
    <>
      {/* Hamburger Icon */}
<div className="fixed top-5 right-5 z-[100] md:hidden sm:top-6 sm:right-6">
        <button
          onClick={toggleMenu}
          aria-label={open ? "Close menu" : "Open menu"}
          ref={iconRef}
          className="p-2 bg-black/80 rounded-full backdrop-blur text-white hover:scale-110 transition-transform duration-200"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay Menu */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-40 bg-black/90 text-white backdrop-blur-lg md:hidden flex flex-col items-center justify-center transition-opacity duration-300 ${open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
      >
        <nav className="flex flex-col gap-6 text-2xl font-semibold">
          {menuItems.map((item, i) => (
            <button
              key={item}
              ref={(el) => (menuLinksRef.current[i] = el)}
              onClick={toggleMenu}
              className="hover:text-neutral-300 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>
        <p className="mt-12 text-sm text-neutral-400 tracking-wide">
          © {new Date().getFullYear()} Sharon Mann Design. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default MobileNav;
