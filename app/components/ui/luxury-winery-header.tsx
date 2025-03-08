"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";

interface NavItem {
  title: string;
  href?: string;
  action?: () => void;
  items?: {
    title: string;
    href: string;
    action?: () => void;
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
      action: () => {},
    },
    {
      title: "About",
      href: "/about",
      action: () => {},
    },
    {
      title: "Vineyard",
      href: "/vineyard",
      action: () => {},
    },
    {
      title: "Wines",
      href: "/wines",
      action: () => {},
    },
    {
      title: "Experiences",
      href: "/experiences",
      action: () => {},
    },
    {
      title: "Events",
      href: "/events",
      action: () => {},
    },
    {
      title: "Contact",
      href: "/contact",
      action: () => {},
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
          <div className="hidden lg:flex items-center space-x-6">
            {navigationItems.map((item) => (
              <div
                key={item.title}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(item.title)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                {item.href ? (
                  <Link
                    href={item.href}
                    onClick={() => item.action && item.action()}
                    className={`font-montserrat text-sm tracking-wide transition-all duration-300 ${
                      isScrolled ? "text-stone-900" : "text-white"
                    } group-hover:text-wine`}
                  >
                    <span className="relative py-2 inline-block">
                      {item.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine transition-all duration-300 group-hover:w-full"></span>
                    </span>
                  </Link>
                ) : (
                  <button
                    onClick={() => item.action && item.action()}
                    className={`flex items-center space-x-1 font-montserrat text-sm tracking-wide transition-all duration-300 ${
                      isScrolled ? "text-stone-900" : "text-white"
                    } group-hover:text-wine`}
                  >
                    <span className="relative py-2 inline-block">
                      {item.title}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-wine transition-all duration-300 group-hover:w-full"></span>
                    </span>
                    <ChevronDown className="h-4 w-4 transition-transform duration-300 group-hover:rotate-180" />
                  </button>
                )}

                {/* Dropdown Menu */}
                {item.items && (
                  <div 
                    className={`absolute left-0 mt-2 w-52 transform origin-top-left transition-all duration-300 ${
                      activeDropdown === item.title ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'
                    }`}
                  >
                    <div className="py-2 bg-white shadow-xl rounded-md border border-stone-100 overflow-hidden">
                      <div className="absolute h-1 w-full bg-wine top-0 left-0"></div>
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.href}
                          href={subItem.href}
                          onClick={() => subItem.action && subItem.action()}
                          className="block px-5 py-2.5 text-sm text-stone-900 hover:bg-stone-50 hover:text-wine transition-colors"
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
            className="lg:hidden relative z-10 p-1 rounded-md transition-all duration-200 hover:bg-white/10"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={`transform transition-transform duration-300 ${isScrolled ? "text-stone-900" : "text-white"}`} />
            ) : (
              <Menu className={`transform transition-transform duration-300 hover:scale-110 ${isScrolled ? "text-stone-900" : "text-white"}`} />
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
                        className="block py-4 text-center font-montserrat text-stone-900 hover:text-wine transition-colors"
                        onClick={() => {
                          setIsOpen(false);
                          item.action && item.action();
                        }}
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <button
                        className="block py-4 w-full text-left font-montserrat text-stone-900 hover:text-wine transition-colors"
                        onClick={() => {
                          setIsOpen(false);
                          item.action && item.action();
                        }}
                      >
                        {item.title}
                      </button>
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
