import Image from "next/image";
import OrderInfoInitializer from "../components/checkout/OrderInfoInitializer";
import ShippingForm from "../components/checkout/ShippingForm";
import ShippingMethod from "../components/checkout/ShippingMethod";
import BillingForm from "../components/checkout/BillingForm";
import OrderSummary from "../components/checkout/OrderSummary";
import PaymentMethods from "../components/checkout/PaymentMethods";
import { CheckoutProvider } from "../context/CheckoutContext";
import { ReduxProvider } from "../providers";

export default function CheckoutPage() {
  return (
    <ReduxProvider>
      <CheckoutProvider>
        <section className="py-10 px-4 md:px-8 bg-accent-light">
          {/* Logo Section */}
          <div className="text-center mb-8">
            <Image
              src="/putec-logo.jpg"
              alt="Pútec Logo"
              width={80}
              height={80}
              className="mx-auto rounded-full shadow-2xl border-4 border-accent mb-4"
            />
            <h1 className="text-3xl font-bold text-foreground">Objednávka</h1>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Main Forms */}
            <div className="lg:col-span-2 space-y-8">
              <OrderInfoInitializer />
              <ShippingForm />
              <ShippingMethod />
              <BillingForm />
              <PaymentMethods />
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <OrderSummary />
            </div>
          </div>
        </section>
      </CheckoutProvider>
    </ReduxProvider>
  );
}
