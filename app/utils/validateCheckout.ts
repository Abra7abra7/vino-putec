import { CheckoutState } from "../store/slices/checkoutSlice";

export const isCheckoutValid = (checkout: CheckoutState): boolean => {
  const { shippingForm, billingForm, shippingMethodId, paymentMethodId, differentBilling } = checkout;

  // Always required fields
  const requiredFields = [
    shippingForm.firstName,
    shippingForm.lastName,
    shippingForm.country,
    shippingForm.address1,
    shippingForm.postalCode,
    shippingForm.phone,
    shippingForm.email,
    shippingMethodId,
    paymentMethodId,
  ];

  // If company is selected, require company fields
  if (shippingForm.isCompany) {
    requiredFields.push(
      shippingForm.companyName,
      shippingForm.companyICO
    );
  }

  // If different billing is selected, require billing fields
  if (differentBilling) {
    requiredFields.push(
      billingForm.firstName,
      billingForm.lastName,
      billingForm.country,
      billingForm.address1,
      billingForm.postalCode,
      billingForm.phone,
      billingForm.email,
    );

    // If company is selected for billing, require company fields
    if (billingForm.isCompany) {
      requiredFields.push(
        billingForm.companyName,
        billingForm.companyICO
      );
    }
  }

  return requiredFields.every((field) => field && field.trim() !== "");
};
