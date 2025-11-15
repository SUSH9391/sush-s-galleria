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
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [menuOpen]);

  return (
    <header
      className={
        "fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out rounded-lg shadow-lg " +
        (isShrunk ? "h-12 bg-white/80 backdrop-blur-sm" : "h-16 bg-yellow-50/90")
      }
    >
      <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <a className="flex items-center no-underline" href="/">
            <div
              className={
                "transition-transform duration-300 ease-in-out transform " +
                (isShrunk ? "scale-90" : "scale-100")
              }
              style={{ transformOrigin: "left center" }}
            >
              {/* Replace with svg/logo */}
              <span className="font-semibold text-lg">Jadebook</span>
            </div>
          </a>
        </div>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <a className="hover:underline" href="#features">Features</a>
          <a className="hover:underline" href="#pricing">Pricing</a>
          <a className="hover:underline" href="#about">About</a>
        </nav>

        {/* Right side: CTA + Mobile hamburger */}
        <div className="flex items-center gap-3">
          <a
            className={
              "px-4 rounded-md text-sm font-medium transition-all duration-200 " +
              (isShrunk ? "py-1" : "py-2")
            }
            href="/signup"
          >
            Get started
          </a>

          {/* Hamburger button (visible on small screens) */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
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
        </div>
      </div>

      {/* Mobile menu overlay/drawer */}
      {/* Using fixed full-width panel that animates from top. md:hidden ensures it's only for small screens */}
      <div
        className={
          "md:hidden fixed left-0 right-0 top-0 z-40 transition-transform duration-300 ease-in-out " +
          (menuOpen
            ? "translate-y-0 pointer-events-auto"
            : "-translate-y-full pointer-events-none")
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
            "relative bg-white/95 backdrop-blur-sm pt-5 pb-8 shadow-lg max-h-screen overflow-auto"
          }
          role="dialog"
          aria-modal="true"
        >
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between">
              <a href="/" className="no-underline">
                <span className="font-semibold text-lg">Jadebook</span>
              </a>
              <button
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
                aria-label="Close menu"
                onClick={() => setMenuOpen(false)}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="mt-6 flex flex-col gap-4 text-lg">
              <a className="block py-2" href="#features" onClick={() => setMenuOpen(false)}>Features</a>
              <a className="block py-2" href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
              <a className="block py-2" href="#about" onClick={() => setMenuOpen(false)}>About</a>
              <a
                className="mt-3 inline-block px-4 py-2 rounded-md font-medium"
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
