"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Users, Wine, Calendar, Facebook, Instagram, Twitter } from 'lucide-react';
import { LuxuryWineryHeader } from '../../../components/ui/luxury-winery-header';
import { LuxuryWineryFooter } from '../../../components/ui/luxury-winery-footer';
import BookingCalendar from '../../../components/booking/BookingCalendar';
import BookingForm from '../../../components/booking/BookingForm';
import { getExperienceById, AvailableDate } from '../../../data/bookable-experiences';

export default function ExperienceBookingPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [experience, setExperience] = useState(getExperienceById(params.id));
  const [selectedDate, setSelectedDate] = useState<AvailableDate | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // If experience not found, redirect to experiences page
  useEffect(() => {
    if (mounted && !experience) {
      router.push('/experiences');
    }
  }, [mounted, experience, router]);

  if (!mounted || !experience) {
    return null;
  }

  // Extract max attendees from capacity string (e.g., "2-8 guests" -> 8)
  const maxAttendees = parseInt(experience.capacity.match(/(\d+)(?!.*\d)/)?.[0] || '1');

  return (
    <main className="min-h-screen bg-white">
      <LuxuryWineryHeader />
      
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Breadcrumb */}
        <div className="mb-6">
          <Link 
            href={`/experiences/${params.id}`}
            className="inline-flex items-center text-amber-700 hover:text-amber-800"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Experience Details
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-2">
            Book {experience.title}
          </h1>
          <p className="text-gray-600">
            Select your preferred date and time to book this experience
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Experience Details */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  className="object-cover"
                />
              </div>
              
              <div className="p-4">
                <h2 className="text-xl font-playfair font-semibold text-gray-900 mb-4">
                  {experience.title}
                </h2>
                
                <p className="text-gray-700 mb-4">
                  {experience.description}
                </p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-amber-700 mr-2" />
                    <span className="text-gray-700">{experience.duration}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="h-5 w-5 text-amber-700 mr-2" />
                    <span className="text-gray-700">{experience.capacity}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Wine className="h-5 w-5 text-amber-700 mr-2" />
                    <span className="text-gray-700">{experience.priceDisplay}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Includes:</h3>
                  <ul className="space-y-2">
                    {experience.includes.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block h-2 w-2 rounded-full bg-amber-700 mt-2 mr-2"></span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Booking Calendar and Form */}
          <div className="lg:col-span-2 space-y-6">
            <BookingCalendar 
              availableDates={experience.availableDates}
              onSelectDate={setSelectedDate}
              selectedDateId={selectedDate?.id || null}
            />
            
            <BookingForm 
              itemId={experience.id}
              itemName={experience.title}
              itemType="experience"
              price={experience.price}
              image={experience.image}
              selectedDate={selectedDate}
              maxAttendees={maxAttendees}
            />
          </div>
        </div>
      </div>
      
      <LuxuryWineryFooter
        brandName="Putec"
        tagline="Crafting exceptional wines in Ribera del Duero since 1892"
        wineCollections={[
          {
            name: "Red Wines",
            links: [
              { href: "/wines/reserve-cabernet", label: "Reserve Cabernet" },
              { href: "/wines/grand-cru-tempranillo", label: "Grand Cru Tempranillo" },
              { href: "/wines/limited-merlot", label: "Limited Edition Merlot" },
              { href: "/wines/crianza", label: "Crianza" },
            ],
          },
          {
            name: "Limited Editions",
            links: [
              { href: "/wines/vintage-collection", label: "Vintage Collection" },
              { href: "/wines/estate-reserve", label: "Estate Reserve" },
              { href: "/wines/winemakers-selection", label: "Winemaker's Selection" },
              { href: "/wines/legacy-series", label: "Legacy Series" },
            ],
          },
        ]}
        contactInfo={{
          address: "Carretera N-122, km 311, 47350 Quintanilla de Onésimo, Valladolid, Spain",
          phone: "+34 983 680 314",
          email: "visitas@putec.com",
        }}
        socialLinks={[
          {
            icon: <Facebook className="h-5 w-5" />,
            href: "https://facebook.com/putecwinery",
            label: "Facebook",
          },
          {
            icon: <Instagram className="h-5 w-5" />,
            href: "https://instagram.com/putecwinery",
            label: "Instagram",
          },
          {
            icon: <Twitter className="h-5 w-5" />,
            href: "https://twitter.com/putecwinery",
            label: "Twitter",
          },
        ]}
        mainLinks={[
          { href: "/about", label: "Our Heritage" },
          { href: "/vineyard", label: "The Vineyard" },
          { href: "/experiences", label: "Wine Experiences" },
          { href: "/events", label: "Private Events" },
          { href: "/contact", label: "Contact" },
        ]}
        legalLinks={[
          { href: "/privacy", label: "Privacy Policy" },
          { href: "/terms", label: "Terms of Service" },
          { href: "/shipping", label: "Shipping Information" },
        ]}
        copyright={{
          text: "© 2024 Putec Winery",
          license: "All rights reserved",
        }}
      />
    </main>
  );
}
