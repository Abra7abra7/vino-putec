"use client";

import { useState } from "react";
import { Product } from "../../../types/Product";

interface ReservationFormProps {
  product: Product;
}

export default function ReservationForm({ product }: ReservationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guests' ? parseInt(value) : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Tu by sa odoslal email s rezerváciou
    alert(`Rezervácia odoslaná pre ${product.Title} na ${formData.date} ${formData.time}`);
  };

  // Generovanie dátumov na najbližšie 30 dní
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 30; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
  };

  const timeSlots = [
    "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00"
  ];

  return (
    <div className="mt-10 p-6 bg-accent-subtle rounded-lg">
      <h3 className="text-2xl font-semibold text-foreground mb-6">Rezervácia degustácie</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Meno a priezvisko *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
              placeholder="Vaše meno a priezvisko"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
              placeholder="vas@email.sk"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Telefón *
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
              placeholder="+421 XXX XXX XXX"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Počet osôb *
            </label>
            <select
              name="guests"
              value={formData.guests}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
            >
              {Array.from({ length: 15 }, (_, i) => i + 1).map(num => (
                <option key={num} value={num}>{num} {num === 1 ? 'osoba' : num < 5 ? 'osoby' : 'osôb'}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Dátum *
            </label>
            <select
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
            >
              <option value="">Vyberte dátum</option>
              {generateDates().map(date => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('sk-SK', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Čas *
            </label>
            <select
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
              className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
            >
              <option value="">Vyberte čas</option>
              {timeSlots.map(time => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Dodatočné poznámky
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border-2 border-accent rounded-lg focus:border-accent-dark focus:outline-none"
            placeholder="Špeciálne požiadavky, alergie, atď."
          />
        </div>
        
        <div className="bg-background p-4 rounded-lg">
          <h4 className="font-semibold text-foreground mb-2">Súhrn rezervácie:</h4>
          <p className="text-foreground-muted">
            <strong>{product.Title}</strong><br/>
            {formData.date && formData.time && (
              <>
                Dátum: {new Date(formData.date).toLocaleDateString('sk-SK')}<br/>
                Čas: {formData.time}<br/>
              </>
            )}
            Počet osôb: {formData.guests}<br/>
            Cena: €{product.RegularPrice}
            {product.Deposit && (
              <>
                <br/>Vratná záloha: €{product.Deposit}
              </>
            )}
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full bg-accent hover:bg-accent-dark text-foreground px-6 py-3 rounded-lg font-semibold transition-colors"
        >
          Rezervovať degustáciu
        </button>
      </form>
    </div>
  );
}
