import React, { useState, useEffect, useRef } from "react";
import { navLinks } from "../constants";
import ThemeToggle from "./ThemeToggle";
import { Menu, X, Calendar, Phone } from "lucide-react";
import { gsap } from "gsap";

const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const overlayRef = useRef(null);
  const menuLinksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
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
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
      <>
        <header
            className={`navbar z-60 fixed w-full transition-all duration-300 ${
                scrolled
                    ? 'text-black bg-white/95 dark:bg-primary-dark/95 backdrop-blur-md shadow-lg border-b border-primary/10 dark:border-accent/20'
                    : 'bg-bg-light/90 dark:bg-black/90 backdrop-blur-sm shadow-sm '
            }`}


        >
          <div className="inner flex items-center justify-between px-6 py-2 md:py-3 max-w-7xl mx-auto">
            {/* Logo */}
            <a href="/" className="block relative -my-14 md:-my-16 z-50">
              <img
                  src="/images/logo.png"
                  alt="Milagro Pharmaceuticals Logo"
                  className={`w-auto object-contain filter dark:brightness-110 transition-all duration-300 ${
                      scrolled ? 'h-32 md:h-40' : 'h-52 md:h-60'
                  }`}
              />

            </a>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex gap-8">
              {navLinks.map(({ link, name }) => (
                  <a
                      key={name}
                      href={link}
                      className={`group relative font-medium transition-colors duration-200 ${
                          scrolled
                              ? 'text-primary-dark dark:text-white hover:text-primary dark:hover:text-accent'
                              : 'text-primary-dark/90 dark:text-white/90 hover:text-primary dark:hover:text-accent'
                      }`}
                  >
                    <span>{name}</span>
                    <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-primary dark:bg-accent group-hover:w-full transition-all duration-300 ease-out" />
                  </a>
              ))}
            </nav>

            {/* Right Side: Actions */}
            <div className="flex items-center gap-4">
              {/* Premium Book Appointment Button */}
              <a
                  href="/book-appointment"
                  className="hidden lg:inline-flex items-center gap-2 relative overflow-hidden bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-101 active:scale-95 border border-yellow-400/30 hover:border-yellow-400/50 group ml-3"
              >
                {/* Gold shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                <Calendar size={18} className="relative z-10" />
                <span className="relative z-10">Book Appointment</span>
              </a>

              {/* Premium Contact Button */}
              <a
                  href="/contact"
                  className="hidden lg:inline-flex items-center gap-2 relative overflow-hidden border-2 border-green-400 bg-green-400/10 hover:bg-green-400 text-green-600 hover:text-white dark:text-green-400 dark:hover:text-slate-900 px-5 py-2.5 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 hover:border-yellow-400 group"
              >
                {/* Gold accent on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/0 to-yellow-400/20 scale-0 group-hover:scale-100 transition-transform duration-200"></div>
                <Phone size={18} className="relative z-10" />
                <span className="relative z-10">Contact</span>
              </a>

              {/* Enhanced Theme Toggle */}
              {/*<div className="hidden lg:block relative">*/}
              {/*  <div className="absolute inset-0 bg-yellow-400/20 rounded-lg blur-sm opacity-0 hover:opacity-100 transition-opacity duration-300"></div>*/}
              {/*  <ThemeToggle />*/}
              {/*</div>*/}

              {/* Premium Mobile Menu Button */}
              <button
                  onClick={toggleMenu}
                  aria-label={menuOpen ? "Close menu" : "Open menu"}
                  className="lg:hidden relative overflow-hidden p-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 z-50 border border-yellow-400/30 group"
              >
                {/* Gold shimmer on mobile button */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                <div className="relative z-10">
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </div>
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        <div
            ref={overlayRef}
            className="fixed inset-0 z-40 bg-primary-dark/95 dark:bg-black/95 backdrop-blur-xl lg:hidden flex flex-col items-center justify-center opacity-0 pointer-events-none"
        >
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"></div>
          </div>

          {/* Close Button inside overlay */}
          <button
              onClick={toggleMenu}
              aria-label="Close menu"
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-xl text-white transition-all duration-200 hover:scale-110"
          >
            <X size={28} />
          </button>

          {/* Mobile Navigation */}
          <nav className="flex flex-col gap-6 text-center">
            {navLinks.map(({ name, link }, i) => (
                <a
                    key={name}
                    href={link}
                    onClick={toggleMenu}
                    ref={(el) => (menuLinksRef.current[i] = el)}
                    className="text-3xl font-semibold text-white hover:text-accent transition-colors duration-200 py-2"
                >
                  {name}
                </a>
            ))}

            {/* Mobile CTA Buttons */}
            <div className="flex flex-col gap-4 mt-8">
              <a
                  href="/book-appointment"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 bg-accent hover:bg-accent/80 text-primary-dark px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:scale-105"
              >
                <Calendar size={24} />
                <span>Book Appointment</span>
              </a>

              <a
                  href="/contact"
                  onClick={toggleMenu}
                  className="flex items-center justify-center gap-3 border-2 border-white text-white hover:bg-white hover:text-primary-dark px-6 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                <Phone size={24} />
                <span>Contact Us</span>
              </a>

              {/* Theme Toggle in Mobile Menu */}
              {/*<div className="flex justify-center mt-4">*/}
              {/*  <ThemeToggle />*/}
              {/*</div>*/}
            </div>
          </nav>

          {/* Footer */}
          <div className="absolute bottom-8 text-center">
            <p className="text-sm text-white/60 tracking-wide">
              © {new Date().getFullYear()} Milagro Pharmaceuticals
            </p>
            <p className="text-xs text-white/40 mt-1">
              Revolutionizing Natural Healing
            </p>
          </div>
        </div>
      </>
  );
};

export default NavBar;