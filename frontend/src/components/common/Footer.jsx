import React from "react";

const Footer = () => {
  return (
    // Outer container: dark background, subtle top border (common for footers)
    <footer className="bg-slate-950 border-t border-slate-800 py-4">
      {/* Inner container: max width, centered, padding */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Content wrapper: centered text */}
        <div className="flex justify-center items-center">
          {/* Copyright Text: small, muted color, centered */}
          <p className="text-xs text-slate-500 py-1">
            &copy; 2025 ASDT, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
