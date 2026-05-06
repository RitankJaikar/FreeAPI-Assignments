import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const Layout = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Scroll position track karne ke liye logic
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto relative">
      {children}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 p-3 rounded-full bg-blue-600 text-white shadow-lg transition-all duration-300 hover:bg-blue-500 hover:scale-110 z-50 ${
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    </div>
  );
};

export default Layout;
