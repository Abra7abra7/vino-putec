import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Mail, Phone } from 'lucide-react'; // Icons for contact
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'; // Import Accordion
import { Metadata } from 'next';

// Metadáta pre stránku Degustácie
export const metadata: Metadata = {
  title: 'Degustácie vín | Víno Pútec Vinosady',
  description: 'Zažite neopakovateľnú atmosféru pri degustácii našich vín priamo vo vinárstve Pútec vo Vinosadoch. Objednajte si termín pre seba alebo skupinu.',
  // OG/Twitter tagy môžu byť špecifické pre degustácie
};

const degustaciePackages = [
    {
        title: 'Balík č. 1 „Malá vínna chvíľka“',
        people: '2 – 5 osôb',
        wines: '4 druhy vína',
        food: 'Malý studený záhryz',
        duration: '1,5 hodiny',
        price: '119 €',
        extra: 'Každá ďalšia začatá hodina: 30 € + fľaša vína'
    },
    {
        title: 'Balík č. 2 „Víno trochu inak“',
        people: '6 – 9 osôb',
        wines: '8 druhov vína',
        food: 'Studený záhryz',
        tour: 'Prehliadka výrobnej časti vinárstva',
        duration: '2,5 hodiny',
        price: '295,90 €',
        extra: 'Každá ďalšia začatá hodina: 30 € + fľaša vína'
    },
    {
        title: 'Balík č. 3 „Víno trochu inak Vol.2“',
        people: '10 – 15 osôb',
        wines: '8 druhov vína',
        food: 'Studený záhryz',
        tour: 'Prehliadka výrobnej časti vinárstva',
        duration: '3 hodiny',
        price: '490 €',
        extra: 'Každá ďalšia začatá hodina: 30 € + fľaša vína'
    },
];

const piknikPackage = {
    title: 'Romantika na deke',
    description: 'Piknikový košík pre 2 osoby s bohato obloženými bagetami, sladkou pochúťkou, orieškami, minerálkou, fľašou vína podľa vlastného výberu a potrebnými drobnosťami.',
    rental: 'Košík a pikniková deka na zapožičanie.',
    deposit: 'Vratná záloha 20 €',
    price: '59,90 €'
};

export default function DegustaciePage() {
    return (
        <div className="container mx-auto px-4 py-12 md:py-20">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 md:mb-14 text-center">
                Degustácie a Zážitky vo Vinosadoch
            </h1>

            <p className="text-lg text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
                Objavte chute Malých Karpát priamo v našom vinárstve. Ponúkame rôzne degustačné balíky navrhnuté tak, aby vyhovovali vašim predstavám o dokonalej vínnej chvíľke.
            </p>

            {/* Degustačné balíky */}
            <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Naše Degustačné Balíky</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-16">
                {degustaciePackages.map((pkg, index) => (
                    <Card key={index} className="flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
                        <CardHeader>
                            <CardTitle className="text-xl md:text-2xl">{pkg.title}</CardTitle>
                            <CardDescription>{pkg.people}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <ul className="list-disc list-outside pl-5 text-muted-foreground space-y-1 mb-4">
                                <li>{pkg.wines}</li>
                                <li>{pkg.food}</li>
                                {pkg.tour && <li>{pkg.tour}</li>}
                                <li>Dĺžka: {pkg.duration}</li>
                            </ul>
                            <p className="text-sm text-muted-foreground/80">{pkg.extra}</p>
                        </CardContent>
                        <CardFooter className="flex flex-col items-start pt-4 border-t">
                            <p className="text-2xl font-semibold text-primary mb-4">{pkg.price}</p>
                            <Button className="w-full">Objednať Balík</Button> {/* Link/Action TBD */}
                        </CardFooter>
                    </Card>
                ))}
            </div>

             {/* Piknikový kôš */}
            <Separator className="my-16" />
             <h2 className="text-2xl md:text-3xl font-semibold mb-8 text-center">Špeciálna Ponuka</h2>
             <Card className="max-w-2xl mx-auto mb-16 hover:shadow-lg transition-shadow duration-300">
                 <CardHeader>
                     <CardTitle className="text-xl md:text-2xl">{piknikPackage.title}</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p className="text-muted-foreground mb-3">{piknikPackage.description}</p>
                     <p className="text-muted-foreground mb-3">{piknikPackage.rental}</p>
                     <p className="text-sm text-muted-foreground/80">{piknikPackage.deposit}</p>
                 </CardContent>
                 <CardFooter className="flex flex-col items-start pt-4 border-t">
                     <p className="text-2xl font-semibold text-primary mb-4">{piknikPackage.price}</p>
                     <Button className="w-full">Objednať Piknikový Kôš</Button> {/* Link/Action TBD */}
                 </CardFooter>
             </Card>

            {/* Sekcia: Často kladené otázky (FAQ) - Degustácie */}
            {/* Odstránený Separator, sekcia dostane vlastné oddelenie */}
            <section className="my-12 md:my-16 bg-muted/40 p-6 md:p-8 rounded-lg shadow-sm">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-8">Často kladené otázky k degustáciám</h2>
                <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
                    {/* Odstránené vnútorné pozadie a padding z Accordion, preberá ho sekcia */}
                    <AccordionItem value="item-1" className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="text-left hover:no-underline text-gray-800 dark:text-gray-200">Ako si môžem rezervovať degustáciu?</AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-600 dark:text-gray-400">
                            Rezerváciu môžete urobiť telefonicky alebo e-mailom. Kontaktné údaje nájdete nižšie. Odporúčame rezervovať termín v dostatočnom predstihu.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2" className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="text-left hover:no-underline text-gray-800 dark:text-gray-200">Čo všetko zahŕňa degustačný balík?</AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-600 dark:text-gray-400">
                            Každý balík zahŕňa degustáciu uvedeného počtu vzoriek vína, studený záhryz a prípadne prehliadku vinárstva (podľa typu balíka). Podrobný popis nájdete pri jednotlivých balíkoch.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3" className="border-b border-gray-200 dark:border-gray-700">
                        <AccordionTrigger className="text-left hover:no-underline text-gray-800 dark:text-gray-200">Je možné prísť na degustáciu aj individuálne alebo len v skupine?</AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-600 dark:text-gray-400">
                            Naše balíky sú navrhnuté pre rôzne veľkosti skupín, od 2 osôb. Ak máte záujem o individuálnu degustáciu alebo inú veľkosť skupiny, kontaktujte nás a pokúsime sa nájsť riešenie.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4" className="border-b-0">
                        <AccordionTrigger className="text-left hover:no-underline text-gray-800 dark:text-gray-200">Poskytujete aj nealkoholické nápoje?</AccordionTrigger>
                        <AccordionContent className="pt-2 text-gray-600 dark:text-gray-400">
                            Áno, súčasťou každej degustácie je aj voda. Na požiadanie vieme zabezpečiť aj iné nealkoholické nápoje.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </section>

            {/* Ako objednať */}
            <Separator className="my-16" />
            <section className="text-center bg-muted/40 p-6 md:p-8 rounded-lg shadow-sm">
                {/* Zjednotený padding p-6 md:p-8 */}
                <h2 className="text-2xl md:text-3xl font-semibold mb-8">Máte záujem o degustáciu alebo piknik?</h2>
                {/* Zjednotené odsadenie mb-8 */}
                <p className="text-lg text-muted-foreground mb-6 max-w-xl mx-auto">
                    Pre rezerváciu termínu alebo viac informácií nás neváhajte kontaktovať. Radi vám pripravíme nezabudnuteľný zážitok.
                </p>
                 <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                    <Button variant="outline" asChild>
                        <a href="mailto:vino@putec.sk"> {/* TODO: Replace with actual email */}
                            <Mail className="mr-2 h-4 w-4" /> Napíšte nám
                        </a>
                    </Button>
                     <Button variant="outline" asChild>
                        <a href="tel:+4219XXXXXXXXX"> {/* TODO: Replace with actual phone */}
                            <Phone className="mr-2 h-4 w-4" /> Zavolajte nám
                        </a>
                    </Button>
                </div>
            </section>
        </div>
    );
}
