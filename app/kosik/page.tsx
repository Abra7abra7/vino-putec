'use client';

import { useCart } from '@/context/CartContext';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Trash2 } from 'lucide-react'; // Import Trash icon

export default function KosikPage() {
    const { cartItems, removeItem, updateQuantity, getTotalPrice, clearCart, isLoading } = useCart();

    if (isLoading) {
        // Show loading indicator while cart is loading from localStorage
        return <div className="container mx-auto py-8 px-4 text-center">Načítava sa košík...</div>;
    }

    if (cartItems.length === 0) {
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
                             <label htmlFor={`quantity-${item.id}`} className="sr-only">Množstvo pre {item.name}</label>
                            <Input
                                id={`quantity-${item.id}`}
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value, 10) || 1)}
                                className="w-16 h-9 text-center rounded"
                            />
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
                    {/* TODO: Add Checkout Button */}
                    <Button size="lg" className="mt-2 w-full sm:w-auto" disabled> {/* Disabled for now */}
                        Pokračovať k Pokladni
                    </Button>
                 </div>
            </div>
        </div>
    );
}
