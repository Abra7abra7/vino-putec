# SuperFaktúra integrácia - Implementačný návod

## Prehľad
Tento dokument popisuje implementáciu SuperFaktúry do e-shopu Vino Putec pre automatické generovanie právne platných faktúr po úspešnej platbe cez Stripe.

## Implementované zmeny

### 1. Nové závislosti
- **axios**: HTTP klient pre komunikáciu s SuperFaktúra API
```bash
npm install axios
```

### 2. Nové súbory
- `app/utils/superfaktura.ts` - Hlavná logika pre vytváranie faktúr v SuperFaktúre

### 3. Upravené súbory
- `app/api/stripe/webhook/route.tsx` - Pridané volanie SuperFaktúry po Stripe faktúre
- `env.example` - Pridané SuperFaktúra environment premenné

## Environment premenné

Pridajte do `.env.local` a Vercel Environment Variables:

```env
# SuperFaktura (fakturácia)
SUPERFAKTURA_EMAIL=vas-email@domena.sk
SUPERFAKTURA_API_KEY=vasklucodsuperFaktury
```

## Ako to funguje

### Flow po úspešnej platbe:
1. **Stripe webhook** prijme `payment_intent.succeeded` event
2. **Vytvorí sa Stripe faktúra** (existujúci kód)
3. **Vytvorí sa SuperFaktúra faktúra** (nový kód)
4. **Error handling**: Ak SuperFaktúra zlyhá, Stripe faktúra zostane

### Dátové mapovanie:
- **Položky košíka**: `item_{i}_title`, `item_{i}_qty`, `item_{i}_price_cents`
- **Doprava**: `shippingMethod`, `shippingPriceCents`
- **Fakturačné údaje**: `billing_*` (vrátane firemných)
- **Dodacie údaje**: `shipping_*`

## Konfigurácia SuperFaktúry

### DPH sadzba
Predvolene je nastavená 20% DPH. Pre zmenu upravte v `app/utils/superfaktura.ts`:
```typescript
tax: 20, // Zmeňte podľa potreby
```

### Mena
Podporované meny: EUR, CZK (podľa `pi.currency`)

### Krajiny
- Slovensko: ID 189
- Česko: ID 58

## Testovanie

### Lokálne testovanie:
```bash
# 1. Nastavte SuperFaktúra kľúče v .env.local
# 2. Spustite Stripe CLI
stripe listen --forward-to localhost:3000/api/stripe/webhook

# 3. Spustite dev server
npm run dev

# 4. Vykonajte testovaciu objednávku
```

### Logy na sledovanie:
- `✅ SuperFaktura invoice created successfully` - úspešné vytvorenie
- `❌ SuperFaktura API Error` - chyba API
- `❌ Failed to create SuperFaktura invoice` - všeobecná chyba

## Produkčné nasadenie

### Vercel Environment Variables:
1. Prejdite do Vercel Dashboard → Project Settings → Environment Variables
2. Pridajte:
   - `SUPERFAKTURA_EMAIL`
   - `SUPERFAKTURA_API_KEY`
3. Redeploy projekt

### Stripe Webhook:
- URL: `https://vino-putec-web.vercel.app/api/stripe/webhook`
- Events: `payment_intent.succeeded`

## Troubleshooting

### Časté problémy:

1. **SuperFaktúra faktúra sa nevytvára**
   - Skontrolujte environment premenné
   - Skontrolujte logy v Vercel Functions

2. **Nesprávne ceny**
   - Overte, že `item_{i}_price_cents` obsahuje ceny v centoch
   - Skontrolujte delenie 100 pre konverziu na eurá

3. **Chyba DPH**
   - Upravte `tax` hodnotu v `superfaktura.ts`
   - Skontrolujte, či všetky produkty majú rovnakú sadzbu

4. **Chyba krajiny**
   - Overte `billing_country` a `shipping_country` hodnoty
   - Skontrolujte mapovanie v `getCountryId` funkcii

## Monitoring

### Vercel Functions Logs:
1. Prejdite do Vercel Dashboard → Functions
2. Vyberte `api/stripe/webhook`
3. Sledujte logy pre SuperFaktúra správy

### SuperFaktúra Dashboard:
- Skontrolujte vytvorené faktúry v SuperFaktúra účte
- Overte správnosť údajov a cien

## Bezpečnosť

- API kľúče sú uložené v environment premenných
- SuperFaktúra komunikácia prebieha cez HTTPS
- Error handling zabraňuje úniku citlivých údajov do logov

## Podpora

Pre technickú podporu kontaktujte:
- **Email**: brano.putec@gmail.com
- **Telefón**: +421 903465666

---

**Poznámka**: Táto integrácia je navrhnutá ako doplnok k existujúcej Stripe fakturácii, nie ako náhrada. Obe systémy fungujú paralelne pre maximálnu spoľahlivosť.
