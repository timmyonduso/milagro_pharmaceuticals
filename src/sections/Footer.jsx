import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Heart,
  Shield,
  Award,
  ChevronRight
} from "lucide-react";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubscribed(true);
      setEmail("");

      // Reset success message after 3 seconds
      setTimeout(() => setSubscribed(false), 3000);
    }, 1000);
  };

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about" },
    { name: "Products", href: "/products" },
    { name: "Clinics", href: "/clinics" },
    { name: "Foundation", href: "/foundation" },
    { name: "Contact", href: "/contact" }
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms & Conditions", href: "/terms" },
    { name: "HIPAA Compliance", href: "/hipaa" },
    { name: "Accessibility", href: "/accessibility" }
  ];

  return (
      <footer className="footer relative bg-gradient-to-br from-bg-light via-white to-bg-light dark:from-black dark:via-primary-dark/20 dark:to-black text-primary-dark dark:text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 dark:opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-radial from-accent/10 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-radial from-primary/10 to-transparent"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-16">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">

            {/* Company Info */}
            <div className="lg:col-span-1">
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-accent mb-2">
                  Milagro Pharmaceuticals
                </h3>
                <p className="text-gray-600 dark:text-white/70 text-sm leading-relaxed">
                  Revolutionizing natural healing through science-backed alternative therapies that restore vitality and wellbeing.
                </p>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700 dark:text-white/80 text-sm leading-relaxed">
                  <Shield className="w-4 h-4 text-gray-900 dark:text-accent" />
                  <span>FDA Compliant</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-white/80 text-sm leading-relaxed">
                  <Award className="w-4 h-4 text-gray-900 dark:text-accent" />
                  <span>Certified</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-accent mb-6">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                    <li key={index}>
                      <a
                          href={link.href}
                          className="group flex items-center text-gray-600 dark:text-white/70 hover:text-primary dark:hover:text-accent transition-colors duration-200"
                      >
                        <ChevronRight className="w-4 h-4 mr-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-200" />
                        <span>{link.name}</span>
                      </a>
                    </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-accent mb-6">
                Contact Info
              </h4>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-gray-900 dark:text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white/70">Email</p>
                    <a
                        href="mailto:info@milagro-pharmaceuticals.com"
                        className="text-gray-900 dark:text-accent hover:underline text-sm font-medium"
                    >
                      info@milagro-pharmaceuticals.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-900 dark:text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white/70">Phone</p>
                    <a
                        href="tel:+18885550192"
                        className="text-gray-900 dark:text-accent hover:underline text-sm font-medium"
                    >
                      +1 (888) 555-0192
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-gray-900 dark:text-accent mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-white/70">Location</p>
                    <p className="text-sm text-gray-600 dark:text-white/70 font-medium">Atlanta, GA, USA</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Newsletter Signup */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 dark:text-accent mb-6">
                Stay Updated
              </h4>
              <p className="text-sm text-gray-600 dark:text-white/70 mb-4">
                Subscribe to our newsletter for the latest health insights and updates.
              </p>

              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="relative">
                  <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white dark:bg-primary-dark/30 border border-primary/20 dark:border-white/20 rounded-lg text-sm placeholder-text-muted/60 dark:placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-accent focus:border-transparent transition-all duration-200"
                      required
                  />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting || subscribed}
                    className="w-full bg-primary hover:bg-primary-dark dark:bg-accent dark:hover:bg-accent/80 text-white dark:text-primary-dark px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Subscribing...</span>
                      </>
                  ) : subscribed ? (
                      <>
                        <Heart className="w-4 h-4" />
                        <span>Subscribed!</span>
                      </>
                  ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Subscribe</span>
                      </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-primary/10 dark:border-white/10 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

              {/* Legal Links */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6">
                {legalLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.href}
                        className="text-sm text-gray-700 dark:text-white/70 hover:text-primary dark:hover:text-accent transition-colors duration-200"
                    >
                      {link.name}
                    </a>
                ))}
              </div>

              {/* Copyright */}
              <div className="text-center lg:text-right">
                <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed">
                  © {new Date().getFullYear()} Milagro Pharmaceuticals. All rights reserved.
                </p>
                <p className="text-gray-700 dark:text-white/80 text-sm leading-relaxed mt-1">
                  Revolutionizing Natural Healing
                </p>
              </div>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;