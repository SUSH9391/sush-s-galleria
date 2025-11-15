import React, { useEffect, useState } from "react";

export default function Navbar() {
  const [isShrunk, setIsShrunk] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsShrunk(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close menu on Escape and close on large-screen resizes
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("body-no-scroll");
    } else {
      document.body.classList.remove("body-no-scroll");
    }
  }, [menuOpen]);

  return (
    <header
      className={
        "fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out rounded-lg shadow-lg " +
        (isShrunk ? "h-12 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm" : "h-16 bg-white/90 dark:bg-gray-800/90")
      }
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Left: Hamburger button */}
        <button
          className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((s) => !s)}
        >
          {/* Icon morph: hamburger -> X */}
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            {menuOpen ? (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

       {/* Center: Logo */}
<div className="flex items-center gap-4">
  <a className="flex items-center no-underline" href="/">
    <div
      className={
        "transition-transform duration-300 ease-in-out " +
        (isShrunk ? "scale-85" : "scale-100")
      }
      style={{ transformOrigin: "center" }}
    >
      <img
        src="/SUSH'S_GALLERIA.png"
        alt="Sush's Galleria"
        className="h-12 w-auto"   // bigger logo
      />
    </div>
  </a>
</div>


        {/* Right: Contact button */}
        <a
          className="px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700"
          href="/contact"
        >
          Contact me
        </a>
      </div>

      {/* Side menu overlay/drawer */}
      {/* Using fixed full-height panel that animates from left. */}
      <div
        className={
          "fixed left-0 top-0 h-full z-40 transition-transform duration-300 ease-in-out " +
          (menuOpen
            ? "translate-x-0 pointer-events-auto"
            : "-translate-x-full pointer-events-none")
        }
        aria-hidden={!menuOpen}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30"
          onClick={() => setMenuOpen(false)}
          aria-hidden="true"
        />

        {/* Panel */}
        <div
          className={
            "relative bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm w-80 h-full shadow-lg overflow-auto"
          }
          role="dialog"
          aria-modal="true"
        >
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <a href="/" className="no-underline">
                <span className="font-semibold text-lg text-gray-900 dark:text-gray-100">Sush's Galleria</span>
              </a>
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex flex-col gap-4 text-lg">
              <a className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 text-gray-900 dark:text-gray-100" href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 text-gray-900 dark:text-gray-100" href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
              <a className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded px-2 text-gray-900 dark:text-gray-100" href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a
                className="mt-3 inline-block px-4 py-2 rounded-md font-medium bg-blue-500 text-white hover:bg-blue-600"
                href="/signup"
                onClick={() => setMenuOpen(false)}
              >
                Get started
              </a>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
