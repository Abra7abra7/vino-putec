"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  items?: {
    title: string;
    href: string;
  }[];
}

export function LuxuryWineryHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navigationItems: NavItem[] = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "Collection",
      items: [
        { title: "Red Wines", href: "/collection/red" },
        { title: "Limited Edition", href: "/collection/limited" },
        { title: "Estate Reserve", href: "/collection/reserve" },
        { title: "Legacy Series", href: "/collection/legacy" },
      ],
    },
    {
      title: "Vineyard",
      items: [
        { title: "Our Story", href: "/vineyard/story" },
        { title: "Terroir", href: "/vineyard/terroir" },
        { title: "Winemaking", href: "/vineyard/winemaking" },
        { title: "Sustainability", href: "/vineyard/sustainability" },
      ],
    },
    {
      title: "Experience",
      items: [
        { title: "Tastings", href: "/experience/tastings" },
        { title: "Tours", href: "/experience/tours" },
        { title: "Events", href: "/experience/events" },
        { title: "Private Dining", href: "/experience/dining" },
      ],
    },
    {
      title: "Contact",
      href: "/contact",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <h1 className={`font-playfair text-2xl font-bold ${
              isScrolled ? "text-stone-900" : "text-white"
            }`}>
              PUTEC
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    className={`font-montserrat text-sm tracking-wide hover:opacity-80 transition-opacity ${
                      isScrolled ? "text-stone-900" : "text-white"
                    }`}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <button
                    className={`flex items-center space-x-1 font-montserrat text-sm tracking-wide hover:opacity-80 transition-opacity ${
                      isScrolled ? "text-stone-900" : "text-white"
                    }`}
                  >
                    <span>{item.title}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.items && activeDropdown === item.title && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="py-1">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-stone-900 hover:bg-stone-50"
                        >
                          {subItem.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden relative z-10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={isScrolled ? "text-stone-900" : "text-white"} />
            ) : (
              <Menu className={isScrolled ? "text-stone-900" : "text-white"} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-0 left-0 w-full bg-white shadow-lg lg:hidden"
            >
              <div className="py-20 px-4">
                {navigationItems.map((item) => (
                  <div key={item.title}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        className="block py-4 text-center font-montserrat text-stone-900 hover:text-stone-600"
                        onClick={() => setIsOpen(false)}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <>
                        <button
                          className="w-full py-4 text-center font-montserrat text-stone-900 hover:text-stone-600"
                          onClick={() => setActiveDropdown(activeDropdown === item.title ? null : item.title)}
                        >
                          <span className="flex items-center justify-center">
                            {item.title}
                            <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${
                              activeDropdown === item.title ? "rotate-180" : ""
                            }`} />
                          </span>
                        </button>
                        <AnimatePresence>
                          {activeDropdown === item.title && item.items && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="bg-stone-50"
                            >
                              {item.items.map((subItem) => (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className="block py-3 text-center font-montserrat text-sm text-stone-700 hover:text-stone-900"
                                  onClick={() => setIsOpen(false)}
                                >
                                  {subItem.title}
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
