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

// Animation variants for the contact button
const buttonVariants = {
  initial: { 
    scale: 1,
    boxShadow: "0 0 0 rgba(0, 120, 255, 0)"
  },
  hover: {
    scale: 1.05,
    boxShadow: "0 0 10px rgba(0, 120, 255, 0.5)",
    transition: { 
      scale: { duration: 0.2 },
      boxShadow: { duration: 0.3 }
    }
  },
  tap: { 
    scale: 0.95,
    boxShadow: "0 0 5px rgba(0, 120, 255, 0.3)",
    transition: { duration: 0.1 }
  }
};

const shineVariants = {
  initial: { 
    x: "-100%", 
    opacity: 0 
  },
  hover: { 
    x: "100%", 
    opacity: 0.7,
    transition: { 
      duration: 0.6, 
      ease: "easeInOut" 
    }
  }
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const isMobile = useIsMobile();
  const [rippleEffect, setRippleEffect] = useState({ x: 0, y: 0, isAnimating: false });

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 10);
  };

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Handle normal navigation
    handleNavClick(e);
    
    // Create ripple effect
    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    setRippleEffect({ x, y, isAnimating: true });
    
    // Reset animation after it completes
    setTimeout(() => {
      setRippleEffect({ x: 0, y: 0, isAnimating: false });
    }, 600);
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
    } else if (href) {
      // Navigate to page routes
      window.location.href = href;
      
      if (isOpen) {
        setIsOpen(false);
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
          <nav className="hidden md:flex space-x-10 items-center">
            {navItems.map((item) => (
              item.label === "Contact" ? (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={handleContactClick}
                  className="px-5 py-2.5 rounded-md bg-primary text-white font-medium relative overflow-hidden shadow-sm"
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  animate={{
                    boxShadow: ["0 0 0 rgba(0, 120, 255, 0)", "0 0 8px rgba(0, 120, 255, 0.3)", "0 0 0 rgba(0, 120, 255, 0)"],
                  }}
                  transition={{
                    boxShadow: {
                      repeat: Infinity,
                      duration: 2,
                      repeatType: "reverse"
                    }
                  }}
                >
                  <motion.span 
                    className="absolute inset-0 bg-white/30"
                    variants={shineVariants}
                  />
                  {rippleEffect.isAnimating && (
                    <motion.span
                      className="absolute bg-white/40 rounded-full"
                      initial={{ 
                        width: 0, 
                        height: 0,
                        opacity: 0.7,
                        x: rippleEffect.x,
                        y: rippleEffect.y,
                        translateX: "-50%",
                        translateY: "-50%"
                      }}
                      animate={{ 
                        width: 300, 
                        height: 300,
                        opacity: 0
                      }}
                      transition={{ duration: 0.6 }}
                    />
                  )}
                  {item.label}
                </motion.a>
              ) : item.isPage ? (
                <Link key={item.href} href={item.href}>
                  <a className="font-medium hover:text-primary transition-colors">
                    {item.label}
                  </a>
                </Link>
              ) : (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              )
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
                  item.label === "Contact" ? (
                    <motion.a
                      key={item.href}
                      href={item.href}
                      onClick={handleContactClick}
                      className="font-medium py-2.5 px-5 bg-primary text-white rounded-md relative overflow-hidden w-fit shadow-sm"
                      variants={buttonVariants}
                      initial="initial"
                      whileHover="hover"
                      whileTap="tap"
                      animate={{
                        boxShadow: ["0 0 0 rgba(0, 120, 255, 0)", "0 0 8px rgba(0, 120, 255, 0.3)", "0 0 0 rgba(0, 120, 255, 0)"],
                      }}
                      transition={{
                        boxShadow: {
                          repeat: Infinity,
                          duration: 2,
                          repeatType: "reverse"
                        }
                      }}
                    >
                      <motion.span 
                        className="absolute inset-0 bg-white/30"
                        variants={shineVariants}
                      />
                      {rippleEffect.isAnimating && (
                        <motion.span
                          className="absolute bg-white/40 rounded-full"
                          initial={{ 
                            width: 0, 
                            height: 0,
                            opacity: 0.7,
                            x: rippleEffect.x,
                            y: rippleEffect.y,
                            translateX: "-50%",
                            translateY: "-50%"
                          }}
                          animate={{ 
                            width: 300, 
                            height: 300,
                            opacity: 0
                          }}
                          transition={{ duration: 0.6 }}
                        />
                      )}
                      {item.label}
                    </motion.a>
                  ) : item.isPage ? (
                    <Link key={item.href} href={item.href}>
                      <a className="font-medium hover:text-primary transition-colors">
                        {item.label}
                      </a>
                    </Link>
                  ) : (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={handleNavClick}
                      className="font-medium hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  )
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
