import Link from 'next/link';
import { getWarehousesOverview } from '@/app/admin/_actions/warehouseActions';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Pencil } from "lucide-react"; // Import ikony ceruzky
import { WarehouseDeleteButton } from "./_components/WarehouseDeleteButton"; // Import nového komponentu

export default async function WarehousesPage() {
  const { data: warehouses, error } = await getWarehousesOverview();

  if (error) {
    return <div className="text-red-500 p-4">Chyba pri načítaní skladov: {error}</div>;
  }

  if (!warehouses || warehouses.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Prehľad skladov</h1>
        <p>Zatiaľ neboli vytvorené žiadne sklady.</p>
        <Button asChild className="mt-4">
          <Link href="/admin/sklady/novy">Vytvoriť nový sklad</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Prehľad skladov</h1>
        <Button asChild>
          <Link href="/admin/sklady/novy">Vytvoriť nový sklad</Link>
        </Button>
      </div>

      <Table>
        <TableCaption>Zoznam všetkých skladov.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Názov skladu</TableHead>
            <TableHead>Lokalita</TableHead>
            <TableHead>Dátum vytvorenia</TableHead>
            <TableHead className="text-right">Akcie</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {warehouses.map((warehouse) => (
            <TableRow key={warehouse.id}>
              <TableCell className="font-medium">
                <Link href={`/admin/sklady/${warehouse.id}`} className="hover:underline">
                  {warehouse.name}
                </Link>
              </TableCell>
              <TableCell>{warehouse.location || '-'}</TableCell> {/* Zobrazí pomlčku ak je null */}
              <TableCell>
                {new Date(warehouse.created_at).toLocaleDateString('sk-SK')} {/* Formátovanie dátumu */}
              </TableCell>
              <TableCell className="text-right space-x-2"> {/* Pridaný space-x-2 pre medzeru */}
                {/* Link na úpravu ako ikonkové tlačidlo */}
                <Button variant="outline" size="icon" asChild title="Upraviť sklad">
                  <Link href={`/admin/sklady/${warehouse.id}/upravit`}>
                    <Pencil className="h-4 w-4" />
                  </Link>
                </Button>
                {/* Klientsky komponent pre odstránenie */}
                <WarehouseDeleteButton 
                  warehouseId={warehouse.id} 
                  warehouseName={warehouse.name} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
