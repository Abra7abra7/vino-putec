import React, { useState } from 'react';
import Image from 'next/image';
import { loadStripe } from '@stripe/stripe-js';
import { Star, Award, Wine as WineIcon, ShoppingCart, CreditCard, Heart, Eye, ZapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

// Import useCart from CartProvider
import { useCart } from '../app/components/cart/CartProvider';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '');

const WineCard = ({ wine }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const [isBuying, setIsBuying] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  
  // Use the cart context for cart operations
  const { addItem, setIsCartOpen } = useCart();

  const handleBuyNow = async () => {
    try {
      setIsBuying(true);
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: [{ id: wine.id, quantity: 1 }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;
      
      if (stripe) {
        await stripe.redirectToCheckout({ sessionId });
      } else {
        throw new Error('Stripe failed to load');
      }
    } catch (error) {
      console.error('Error during checkout:', error);
      setToastMessage('Failed to process purchase. Please try again.');
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } finally {
      setIsBuying(false);
    }
  };

  const handleAddToCart = () => {
    // Add the wine to the cart using the cart context
    addItem({
      id: wine.id,
      name: wine.name,
      price: typeof wine.price === 'string' ? parseFloat(wine.price.replace('€', '')) : wine.price,
      image: wine.image,
      year: wine.year,
      displayName: `${wine.name} (${wine.year})`
    });
    
    // Show toast notification
    setToastMessage(`${wine.name} added to cart`);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    setIsFavorite(!isFavorite);
  };

  // Format price for better display
  const formattedPrice = typeof wine.price === 'string' ? wine.price : `€${wine.price.toFixed(2)}`;

  return (
    <div 
      className="wine-card relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-xl h-[500px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Stock indicator */}
      {wine.stock < 10 && (
        <div className="absolute top-3 left-3 z-10 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full">
          Only {wine.stock} left
        </div>
      )}

      {/* Favorite button */}
      <button 
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-white/80 p-2 rounded-full hover:bg-white transition-colors"
        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
      >
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
      </button>

      {/* Wine category badge */}
      {wine.category && (
        <div className="absolute top-3 left-1/2 transform -translate-x-1/2 z-10 bg-amber-100 text-amber-800 text-xs font-medium px-2.5 py-0.5 rounded-full uppercase tracking-wider">
          {wine.category}
        </div>
      )}

      {/* Background image covering the whole card */}
      <div className="absolute inset-0 w-full h-full">
        <div className="relative w-full h-full">
          <Image 
            src={wine.image} 
            alt={wine.name} 
            fill
            sizes="100vw"
            className={`object-cover transition-transform duration-700 ${isHovered ? 'scale-110' : 'scale-100'}`} 
          />
        </div>
        {/* Gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" style={{opacity: 0.8}}></div>
        
        {/* Quick view and buy buttons on hover */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button 
            onClick={() => setShowQuickView(true)}
            className="bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-md font-medium hover:bg-white transition-colors flex items-center z-10"
          >
            <Eye className="w-4 h-4 mr-2" />
            Quick View
          </button>
          
          <button 
            onClick={handleBuyNow}
            disabled={isBuying}
            className="bg-amber-600/90 backdrop-blur-sm text-white px-4 py-2 rounded-md font-medium hover:bg-amber-600 transition-colors flex items-center z-10"
          >
            {isBuying ? (
              <>
                <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="w-4 h-4 mr-2" />
                Quick Buy
              </>
            )}
          </button>
        </div>
      </div>

      {/* Wine details */}
      <div className="p-5 relative z-10 mt-auto absolute bottom-0 w-full">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-serif font-semibold text-white group-hover:text-amber-300 transition-colors">{wine.name}</h3>
          <span className="text-xl font-serif font-bold text-amber-300">{formattedPrice}</span>
        </div>
        
        <div className="flex items-center mb-2">
          <span className="text-sm text-amber-100/80 mr-2">{wine.year} • {wine.region}</span>
        </div>
        
        {/* Ratings */}
        <div className="flex items-center mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className={`w-4 h-4 ${i < wine.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-500'}`} />
          ))}
          <span className="ml-2 text-sm text-amber-100/70">{wine.rating}/5</span>
        </div>
        
        <p className="text-sm text-white/80 mb-4 line-clamp-2">{wine.description}</p>
        
        {/* Wine properties */}
        <div className="grid grid-cols-2 gap-2 mb-4 text-xs text-amber-100/70">
          {wine.tasting && (
            <>
              {wine.tasting.appearance && (
                <div className="flex items-center">
                  <span className="font-medium mr-1 text-white">Appearance:</span> {wine.tasting.appearance}
                </div>
              )}
              {wine.tasting.flavor && (
                <div className="flex items-center">
                  <span className="font-medium mr-1 text-white">Flavor:</span> {wine.tasting.flavor.substring(0, 20)}...
                </div>
              )}
            </>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex space-x-2">
          <button 
            onClick={handleAddToCart} 
            className="flex-1 flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white py-2.5 px-4 rounded-md transition-colors duration-200"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </button>
          <button 
            onClick={handleBuyNow} 
            className="flex-1 flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-2.5 px-4 rounded-md transition-colors duration-200"
          >
            <CreditCard className="w-4 h-4 mr-2" />
            Buy Now
          </button>
        </div>
      </div>

      {/* Quick view modal */}
      {showQuickView && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4" onClick={() => setShowQuickView(false)}>
          <div className="bg-white max-w-3xl w-full rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <div className="flex flex-col md:flex-row">
              {/* Wine image */}
              <div className="md:w-1/2 relative h-72 md:h-auto">
                <div className="relative w-full h-full">
                  <Image 
                    src={wine.image} 
                    alt={wine.name} 
                    fill
                    sizes="50vw"
                    className="object-cover" 
                  />
                </div>
                {wine.awards && wine.awards.length > 0 && (
                  <div className="absolute bottom-4 left-4 bg-amber-100/90 backdrop-blur-sm px-3 py-2 rounded-md">
                    <div className="flex items-center text-amber-800">
                      <Award className="w-5 h-5 mr-2" />
                      <span className="text-sm font-medium">{wine.awards[0].award}</span>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Wine details */}
              <div className="md:w-1/2 p-6">
                <button 
                  onClick={() => setShowQuickView(false)} 
                  className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
                
                <div className="flex items-center mb-2">
                  <WineIcon className="w-5 h-5 text-amber-700 mr-2" />
                  <span className="text-sm font-medium uppercase tracking-wider text-amber-700">{wine.category}</span>
                </div>
                
                <h2 className="text-2xl font-serif font-bold text-gray-800 mb-1">{wine.name}</h2>
                <p className="text-gray-600 mb-3">{wine.year} • {wine.region}</p>
                
                <div className="flex items-center mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className={`w-5 h-5 ${i < wine.rating ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-gray-600">{wine.rating}/5</span>
                </div>
                
                <div className="mb-4">
                  <h3 className="text-xl font-serif font-bold text-amber-700">{formattedPrice}</h3>
                  {wine.stock < 10 ? (
                    <p className="text-red-600 text-sm">Only {wine.stock} bottles left</p>
                  ) : (
                    <p className="text-green-600 text-sm">In Stock</p>
                  )}
                </div>
                
                <p className="text-gray-700 mb-6">{wine.description}</p>
                
                {wine.longDescription && (
                  <p className="text-gray-600 text-sm mb-6">{wine.longDescription.substring(0, 150)}...</p>
                )}
                
                {wine.tasting && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-6">
                    {wine.tasting.appearance && (
                      <div>
                        <h4 className="text-xs font-medium uppercase text-gray-500">Appearance</h4>
                        <p className="text-sm text-gray-700">{wine.tasting.appearance}</p>
                      </div>
                    )}
                    {wine.tasting.aroma && (
                      <div>
                        <h4 className="text-xs font-medium uppercase text-gray-500">Aroma</h4>
                        <p className="text-sm text-gray-700">{wine.tasting.aroma}</p>
                      </div>
                    )}
                    {wine.tasting.flavor && (
                      <div>
                        <h4 className="text-xs font-medium uppercase text-gray-500">Flavor</h4>
                        <p className="text-sm text-gray-700">{wine.tasting.flavor}</p>
                      </div>
                    )}
                    {wine.tasting.finish && (
                      <div>
                        <h4 className="text-xs font-medium uppercase text-gray-500">Finish</h4>
                        <p className="text-sm text-gray-700">{wine.tasting.finish}</p>
                      </div>
                    )}
                  </div>
                )}
                
                {wine.pairings && wine.pairings.length > 0 && (
                  <div className="mb-6">
                    <h4 className="text-xs font-medium uppercase text-gray-500 mb-1">Perfect Pairings</h4>
                    <div className="flex flex-wrap gap-2">
                      {wine.pairings.map((pairing, index) => (
                        <span key={index} className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{pairing}</span>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="flex space-x-3 mb-3">
                  <button 
                    onClick={() => {
                      handleAddToCart();
                      setShowQuickView(false);
                    }} 
                    className="flex-1 flex items-center justify-center bg-amber-700 hover:bg-amber-800 text-white py-3 px-4 rounded-md transition-colors duration-200"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                  <button 
                    onClick={handleBuyNow} 
                    className="flex-1 flex items-center justify-center bg-gray-800 hover:bg-gray-900 text-white py-3 px-4 rounded-md transition-colors duration-200"
                  >
                    <CreditCard className="w-5 h-5 mr-2" />
                    Buy Now
                  </button>
                </div>
                
                <button 
                  onClick={() => {
                    handleAddToCart();
                    setShowQuickView(false);
                    if (setIsCartOpen) {
                      setIsCartOpen(true);
                    }
                  }}
                  className="w-full flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-4 rounded-md transition-colors duration-200"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart & View Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Toast notification */}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-5 right-5 bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg z-50 flex items-center"
        >
          {toastMessage.includes('added to cart') ? (
            <ShoppingCart className="w-5 h-5 mr-2 text-amber-400" />
          ) : (
            <div className="w-5 h-5 mr-2 text-red-400">⚠️</div>
          )}
          <span>{toastMessage}</span>
        </motion.div>
      )}
    </div>
  );
};

export default WineCard;
