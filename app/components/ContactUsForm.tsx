'use client';

import { useState, FormEvent } from 'react';
import { useLocalization } from '@/app/context/LocalizationContext';

export default function ContactUsForm() {
  const { contactForm } = useLocalization();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (!res.ok) throw new Error('Something went wrong');

      setName('');
      setEmail('');
      setMessage('');
      setStatus(contactForm.successMessage);
      setTimeout(() => setStatus(null), 5000);
    } catch {
      setStatus(contactForm.errorMessage);
    }
  };

  return (
    <section className="w-full min-h-screen bg-primary-light py-16">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-foreground text-center">{contactForm.title}</h2>

        {status && <div className="mb-4 text-wine-red font-semibold">{status}</div>}

        <form
          onSubmit={handleSubmit}
          className="bg-background shadow-lg rounded-lg p-8 space-y-6 mt-3 border border-primary"
        >
          {/* Name Field */}
          <div>
            <label className="block text-foreground font-medium mb-2">
              {contactForm.nameLabel}
            </label>
            <input
              type="text"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder={contactForm.namePlaceholder}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-foreground font-medium mb-2">
              {contactForm.emailLabel}
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder={contactForm.emailPlaceholder}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-foreground font-medium mb-2">
              {contactForm.messageLabel}
            </label>
            <textarea
              rows={6}
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder={contactForm.messagePlaceholder}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-wine-red hover:bg-wine-dark text-background px-6 py-3 rounded-md font-semibold transition-colors"
          >
            {contactForm.buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}
