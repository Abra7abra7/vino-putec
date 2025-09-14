'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AgeVerification() {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user has already verified age
    const ageVerified = localStorage.getItem('ageVerified');
    if (!ageVerified) {
      setShowModal(true);
    }
  }, []);

  const verifyAge = (isOver18: boolean) => {
    if (isOver18) {
      localStorage.setItem('ageVerified', 'true');
      setShowModal(false);
    } else {
      // Redirect to homepage or show message
      router.push('/');
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Overenie veku
            </h2>
            <p className="text-foreground-muted mb-6">
              Pre prístup k sekcii vína musíte potvrdiť, že máte 18 a viac rokov.
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={() => verifyAge(true)}
              className="w-full bg-accent text-white py-3 px-6 rounded-md hover:bg-accent/90 transition-colors font-semibold"
            >
              Mám 18 a viac rokov
            </button>
            <button
              onClick={() => verifyAge(false)}
              className="w-full border border-gray-300 text-foreground py-3 px-6 rounded-md hover:bg-gray-50 transition-colors"
            >
              Mám menej ako 18 rokov
            </button>
          </div>
          
          <p className="text-xs text-foreground-muted mt-4">
            Podľa zákona č. 171/2018 Z. z. o ochrane zdravia pred škodlivými účinkami návykových látok
          </p>
        </div>
      </div>
    </div>
  );
}
