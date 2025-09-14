'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CookiesBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    if (!cookiesAccepted) {
      setShowBanner(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setShowBanner(false);
  };

  const rejectCookies = () => {
    localStorage.setItem('cookiesAccepted', 'false');
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-gray-200 shadow-lg z-50">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Súbory cookies a ochrana súkromia
            </h3>
            <p className="text-foreground-muted text-sm mb-2">
              Táto webová stránka používa súbory cookies na zlepšenie vašich skúseností a analýzu návštevnosti. 
              Pokračovaním v používaní stránky súhlasíte s našimi{' '}
              <Link href="/zasady-ochrany-osobnych-udajov" className="text-accent hover:underline">
                zásadami ochrany osobných údajov
              </Link>{' '}
              a{' '}
              <Link href="/obchodne-podmienky" className="text-accent hover:underline">
                obchodnými podmienkami
              </Link>.
            </p>
            <div className="flex flex-wrap gap-2 text-xs text-foreground-muted">
              <Link href="/nastroje-ochrany-sukromia" className="hover:text-accent">
                Nástroje na ochranu súkromia
              </Link>
              <span>•</span>
              <Link href="/reklamacny-poriadok" className="hover:text-accent">
                Reklamačný poriadok
              </Link>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={rejectCookies}
              className="px-4 py-2 text-sm border border-gray-300 text-foreground hover:bg-gray-50 transition-colors rounded-md"
            >
              Odmietnuť
            </button>
            <button
              onClick={acceptCookies}
              className="px-4 py-2 text-sm bg-accent text-white hover:bg-accent/90 transition-colors rounded-md"
            >
              Súhlasiť
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
