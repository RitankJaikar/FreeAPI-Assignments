import React from "react";
import ScrollToTop from "./ScrollToTop";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen p-4 sm:p-8 max-w-6xl mx-auto relative">
      {children}
      <ScrollToTop />
    </div>
  );
};

export default Layout;
