# Vino Putec - E-shop pre prémiové vína

**Vino Putec** je moderný e-shop pre prémiové vína z rodinnej vinárne vo Vinosadoch. Postavený na Next.js 15, TypeScript, Tailwind CSS a Redux, optimalizovaný pre malé obchody s až 200 produktmi.

## O nás

Putec s.r.o. je rodinná vinárňa s dlhoročnou tradíciou vo Vinosadoch, ktorá sa špecializuje na výrobu prémiových vín. Naša história sa začala s láskou k vinohradníctvu a túžbou vytvoriť vína, ktoré odrážajú jedinečnú chuť našej krajiny.

## Kontakt

- **Adresa**: Pezinská 154, 902 01 Vinosady, Slovensko
- **Telefón**: +421 903465666
- **Email**: brano.putec@gmail.com
- **IČO**: 36658774
- **DIČ**: 2022219430
- **IČ DPH**: SK2022219430
- **IBAN**: SK08 7500 0000 0040 3035 3200

## Funkcie

- **Bez databázy** – Produkty sú uložené v JSON súboroch
- **Rýchly a ľahký** – Postavený na Next.js a optimalizovaný pre výkon
- **Košík a objednávka** – LocalStorage košík s Stripe a dobierkou
- **Newsletter integrácia** – Prihlásenie na newsletter
- **Kontaktný formulár s Google reCAPTCHA v3** – Ochrana pred spamom
- **Spracovanie objednávok cez email** – Používa Resend na odosielanie notifikácií
- **SEO optimalizovaný** – Rýchle, indexovateľné stránky produktov
- **Nasadenie kdekoľvek** – Funguje na Vercel alebo akomkoľvek statickom hostingu

## Technológie

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS, Redux
- **Úložisko**: JSON-based súborový systém (bez databázy)
- **Platby**:
  - **Stripe Payment Element** – Vložené platby kartou
  - **Dobierka** – Platba pri dodaní
- **Hosting**: Vercel alebo akýkoľvek statický hosting

## Spustenie

### Klonovanie repozitára
```sh
git clone https://github.com/Abra7abra7/vino-putec.git
cd vino-putec
```

### Inštalácia závislostí
```sh
npm install
```

### Konfigurácia

**/configs/products.json** - Obsahuje všetky údaje o produktoch pre váš obchod. Každý produkt obsahuje polia ako:
- ID, Názov, Slug, Krátky popis, Dlhý popis
- Bežná cena, Zľavová cena, Mena, Obrázok produktu
- Galéria obrázkov, Kategória, Typ predplatného, atď.

**/configs/locale.en.json** - Spravuje všetok lokalizovaný obsah pre rozhranie vášho obchodu vrátane:
- UI labely (tlačidlá, správy)
- Položky navigačného menu
- Footer a kontaktné informácie
- Sociálne médiá
- Obsah domovskej a o nás stránky

**/configs/checkout.json** - Definuje všetky nastavenia súvisiace s checkout skúsenosťou:
- Spôsoby dopravy: Názvy, ceny a meny
- Dostupné krajiny: Samostatné zoznamy pre krajiny dopravy a fakturácie
- Spôsoby platby: Zahŕňa Stripe a dobierku s možnosťami zapnúť/vypnúť

**/.env.local** – Ukladá citlivé premenné prostredia a konfiguráciu runtime pre váš obchod

### Nastavenie environment premenných
```sh
# Skopírujte príklad súboru
cp env.example .env.local

# Upravte .env.local s vašimi skutočnými API kľúčmi
# Všetky služby sú voliteľné - e-shop funguje aj bez nich
```

### Spustenie development servera
```sh
npm run dev
```

Potom otvorte http://localhost:3000 vo vašom prehliadači.

**Poznámka:** E-shop funguje aj bez nastavenia API kľúčov. Platobné metódy a newsletter budú dostupné až po nastavení príslušných služieb.

## Licencia

Vino Putec je vydaný pod MIT licenciou.

## Podpora

Ak nájdete tento projekt užitočný, zvážte podporu našej práce. Vaša podpora nám pomáha udržiavať tento projekt nažive a ďalej ho zlepšovať.

Ďakujeme! ❤️