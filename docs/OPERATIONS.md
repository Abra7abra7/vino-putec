# Operácie – Stripe a fakturácia

## Webhook (produkcia)
- URL: `https://vino-putec.vercel.app/api/stripe/webhook`
- Events: `payment_intent.succeeded` (iba tento v produkte)
- API version: odporúčané držať na účtovej (aktuálne 2025-08-27.basil)
- Signing secret: nastav `STRIPE_WEBHOOK_SECRET` vo Vercel env

## Testovanie lokálne (Stripe CLI)
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
# .env.local: STRIPE_WEBHOOK_SECRET=whsec_...
npm run dev
```
V logu hľadaj: „➕ Created N invoice_items“, „📧 Stripe will send invoice email“, „✅ Invoice marked paid …“.

## Flow fakturácie (final)
1) Parse položky z `PaymentIntent.metadata`
2) Vymaž pending `invoice_items` s `[orderId]`
3) Vytvor `invoice_items` (položky + doprava)
4) `invoices.create` (send_invoice, auto_advance=false, pending_invoice_items_behavior=include)
5) `invoices.finalize`
6) `invoices.send` (Stripe pošle e‑mail)
7) `invoices.pay(..., paid_out_of_band=true)`
8) `PI.metadata.invoiced='1'`

## Checklist (produkcia)
- [ ] STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET vo Vercel
- [ ] Webhook events: iba `payment_intent.succeeded`
- [ ] Stripe Email settings → Invoice emails zapnuté
- [ ] Test kartovej platby: faktúra „paid“, e‑mail od Stripe

## Email behavior (test vs. prod)
- Test mode: zapni „Send emails in test mode“, inak e‑maily nemusia odchádzať
- Prod mode: e‑maily odchádzajú po `invoices.send` automaticky

## Troubleshooting
- Faktúra prázdna: skontroluj log „➕ Created N invoice_items“ (N>0)
- 2× faktúra/e‑mail: skontroluj `PI.metadata.invoiced` a duplicitu webhookov
- 400 Webhook signature: zlá `STRIPE_WEBHOOK_SECRET`


