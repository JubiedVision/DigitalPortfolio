import { useState, useEffect } from "react";
import { Link } from "wouter";
import { AnimatePresence, motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

const navItems = [
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#contact", label: "Contact" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const href = e.currentTarget.getAttribute("href");
    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });

        if (isOpen) {
          setIsOpen(false);
        }
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-sm" : "bg-white"}`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/">
            <a className="text-2xl font-bold text-primary">UX Centerd</a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-10">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-dark focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && isMobile && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden pt-4 pb-2"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={handleNavClick}
                    className="font-medium py-2 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
