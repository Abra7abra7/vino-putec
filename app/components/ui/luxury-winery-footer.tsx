"use client";

import React from "react";
import { Wine, Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";

interface WineCollection {
  name: string;
  links: Array<{
    href: string;
    label: string;
  }>;
}

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
}

interface SocialLink {
  icon: React.ReactNode;
  href: string;
  label: string;
}

interface LuxuryWineryFooterProps {
  logo?: React.ReactNode;
  brandName: string;
  tagline?: string;
  wineCollections: WineCollection[];
  contactInfo: ContactInfo;
  socialLinks: SocialLink[];
  mainLinks: Array<{
    href: string;
    label: string;
  }>;
  legalLinks: Array<{
    href: string;
    label: string;
  }>;
  copyright: {
    text: string;
    license?: string;
  };
}

export function LuxuryWineryFooter({
  logo = <Wine className="h-10 w-10 text-[#8b0000]" />,
  brandName,
  tagline,
  wineCollections,
  contactInfo,
  socialLinks,
  mainLinks,
  legalLinks,
  copyright,
}: LuxuryWineryFooterProps) {
  return (
    <footer className="bg-stone-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link
              href="/"
              className="flex items-center gap-x-3"
              aria-label={brandName}
            >
              {logo}
              <span className="font-playfair text-2xl font-bold tracking-tight">
                {brandName}
              </span>
            </Link>
            {tagline && (
              <p className="text-stone-300 font-montserrat">{tagline}</p>
            )}

            {/* Contact Information */}
            <div className="space-y-4 pt-4">
              <div className="space-y-3">
                <div className="flex items-start gap-x-3">
                  <MapPin className="h-5 w-5 text-[#bf9b30] flex-shrink-0 mt-1" />
                  <span className="text-stone-300 text-sm">
                    {contactInfo.address}
                  </span>
                </div>
                <div className="flex items-center gap-x-3">
                  <Phone className="h-5 w-5 text-[#bf9b30]" />
                  <a
                    href={`tel:${contactInfo.phone}`}
                    className="text-stone-300 text-sm hover:text-white transition-colors"
                  >
                    {contactInfo.phone}
                  </a>
                </div>
                <div className="flex items-center gap-x-3">
                  <Mail className="h-5 w-5 text-[#bf9b30]" />
                  <a
                    href={`mailto:${contactInfo.email}`}
                    className="text-stone-300 text-sm hover:text-white transition-colors"
                  >
                    {contactInfo.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Wine Collections */}
          {wineCollections.map((collection) => (
            <div key={collection.name}>
              <h3 className="font-playfair text-lg font-semibold mb-6">
                {collection.name}
              </h3>
              <ul className="space-y-3">
                {collection.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-stone-300 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Main Links */}
          <div>
            <h3 className="font-playfair text-lg font-semibold mb-6">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {mainLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-stone-300 hover:text-white transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 py-8 border-t border-stone-700">
          {socialLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-400 hover:text-[#bf9b30] transition-colors"
              aria-label={link.label}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Legal Links and Copyright */}
        <div className="pt-8 border-t border-stone-700">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-stone-400 text-sm">
              <span>{copyright.text}</span>
              {copyright.license && (
                <span className="ml-2">• {copyright.license}</span>
              )}
            </div>
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-stone-400 hover:text-white transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
