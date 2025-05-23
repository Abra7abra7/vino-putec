'use client'; // Tento komponent potrebuje byť client-side

import React from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Trash2, AlertTriangle, Minus, Plus } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

// Definícia komponentu presunutá sem
export default function CartContent() {
    const { cartItems, removeItem, updateQuantity, getTotalPrice, clearCart, isLoading } = useCart();
    const searchParams = useSearchParams(); // Použitie hooku tu
    const paymentCancelled = searchParams.get('status') === 'cancelled';
    const router = useRouter();

    const handleProceedToCheckout = () => {
        router.push('/pokladna');
    };

    if (isLoading) {
        return <div className="container mx-auto py-8 px-4 text-center">Načítava sa obsah košíka...</div>;
    }

    if (cartItems.length === 0 && !paymentCancelled) {
        return (
            <div className="container mx-auto py-12 px-4 text-center">
                <h1 className="text-3xl font-bold mb-4">Váš Nákupný Košík</h1>
                <p className="text-xl text-gray-600 mb-6">Váš košík je prázdny.</p>
                <Link href="/produkty">
                    <Button size="lg">Pokračovať v nákupe</Button>
                </Link>
            </div>
        );
    }

    return (
         <div className="container mx-auto py-8 px-4">
             <h1 className="text-3xl font-bold mb-6">Váš Nákupný Košík</h1>

            {paymentCancelled && (
                <div className="mb-6 flex items-center gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <p>Vaša platba bola zrušená. Skontrolujte obsah košíka a skúste to znova, ak si želáte.</p>
                </div>
            )}

            {cartItems.length > 0 ? (
                <>
                    <div className="border rounded-lg overflow-hidden mb-6">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex items-center justify-between p-4 border-b last:border-b-0 flex-wrap gap-4">
                                <div className="flex items-center gap-4 flex-1 min-w-[200px]">
                                    <div className="relative h-16 w-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                        {item.image_url ? (
                                            <Image src={item.image_url} alt={item.name} fill className="object-cover" />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-400 text-xs">Obrázok</div>
                                        )}
                                    </div>
                                    <div>
                                        <Link href={`/produkty/${item.id}`} className="font-semibold hover:underline">
                                            {item.name}
                                        </Link>
                                        <p className="text-sm text-gray-600">Cena: €{item.price.toFixed(2)}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3 flex-shrink-0">
                                    {/* Nový counter množstva */}
                                    <div className="flex items-center border rounded-md">
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-9 w-9 rounded-r-none" 
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            disabled={item.quantity <= 1} 
                                            aria-label={`Znížiť množstvo ${item.name}`}
                                        >
                                            <Minus size={16} />
                                        </Button>
                                        <span className="px-3 text-sm font-medium w-10 text-center tabular-nums" aria-live="polite">{item.quantity}</span>
                                        <Button 
                                            variant="ghost" 
                                            size="icon" 
                                            className="h-9 w-9 rounded-l-none" 
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                                            // Prípadná logika pre disabled na základe max. skladu, ak by sme ju mali k dispozícii
                                            aria-label={`Zvýšiť množstvo ${item.name}`}
                                        >
                                            <Plus size={16} />
                                        </Button>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="icon"
                                        onClick={() => removeItem(item.id)}
                                        aria-label={`Odstrániť ${item.name} z košíka`}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                                <div className="text-right font-semibold w-full sm:w-auto sm:min-w-[80px]">
                                    €{(item.price * item.quantity).toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <Button variant="outline" onClick={clearCart} className="w-full sm:w-auto">
                            Vyprázdniť Košík
                        </Button>
                        <div className="text-right w-full sm:w-auto">
                            <p className="text-xl font-bold">Celkom: €{getTotalPrice().toFixed(2)}</p>
                            <Button
                                size="lg"
                                className="mt-2 w-full sm:w-auto"
                                onClick={handleProceedToCheckout}
                                disabled={cartItems.length === 0}
                            >
                                Pokračovať k Pokladni
                            </Button>
                        </div>
                    </div>
                </>
            ) : (
                 !paymentCancelled && (
                     <div className="text-center">
                        <p className="text-xl text-gray-600 mb-6">Váš košík je prázdny.</p>
                        <Link href="/produkty">
                            <Button size="lg">Pokračovať v nákupe</Button>
                        </Link>
                     </div>
                )
            )}
        </div>
    );
}
