import Link from "next/link";
import Image from "next/image";
import { SiFacebook, SiInstagram, SiLinkedin, SiX } from "react-icons/si";
import ScrollToTopButton from "./ScrollToTopButton"; // Keep this as a client component
import { getLocalization } from "../utils/getLocalization";

// Define TypeScript interfaces
interface FooterLink {
  label: string;
  href: string;
}

type SocialIcon = "SiFacebook" | "SiX" | "SiInstagram" | "SiLinkedin";

// Map icon strings to components
const iconMap: Record<SocialIcon, React.ElementType> = {
  SiFacebook: SiFacebook,
  SiX: SiX,
  SiInstagram: SiInstagram,
  SiLinkedin: SiLinkedin
};

export default function Footer() {
  const content = getLocalization(); // Load localization data

  return (
    <footer className="bg-wine-dark text-primary py-12 relative">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
        
        {/* Logo & Brand */}
        <div className="flex flex-col items-center md:items-start">
          <Link href="/" className="flex flex-col items-center md:items-start space-y-3 hover:opacity-80 transition-opacity">
            <Image
              src="/putec-logo.jpg"
              alt="Pútec Logo"
              width={80}
              height={80}
              className="rounded-lg"
            />
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-background">{content.siteName}</h3>
              <p className="text-primary text-sm">{content.siteTagline}</p>
            </div>
          </Link>
        </div>
        
        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-background">{content.labels.quickLinks}</h3>
          <ul className="space-y-2">
            {content.footerLinks.map((link: FooterLink) => (
              <li key={link.label}>
                <Link href={link.href} className="text-primary hover:text-accent-gold transition">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-background">{content.labels.contactUs}</h3>
          <p>{content.labels.email}: <a href={`mailto:${content.email}`} className="text-primary hover:text-accent-gold transition">{content.email}</a></p>
          <p>{content.labels.phone}: <a href={`tel:${content.phone}`} className="text-primary hover:text-accent-gold transition">{content.phone}</a></p>
          <p>{content.labels.address}: {content.address}</p>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-background">{content.labels.followUs}</h3>
          <div className="flex justify-center md:justify-start space-x-4">
            {content.socialLinks.map((social) => {
              const IconComponent = iconMap[social.icon as SocialIcon]; // Type assertion to ensure TS compliance
              return (
                <Link key={social.id} href={social.url} target="_blank" className="text-primary hover:text-accent-gold transition">
                  <IconComponent size={24} />
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm mt-8">
        {content.copyright}
      </div>

      {/* Scroll to Top Button (Client Component) */}
      <ScrollToTopButton />
    </footer>
  );
}
