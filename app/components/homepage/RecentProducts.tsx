import ProductCardWithProvider from "../products/ProductCardWithProvider";
import { getLocalization } from "../../utils/getLocalization";
import getProducts from "../../utils/getProducts";
import { Product } from "../../../types/Product";

export default async function RecentProducts() {
  const localeData = getLocalization();
  const labels = localeData.labels;

  const allProducts = await getProducts();
  const recentProducts = allProducts.slice(0, 3);

  if (recentProducts.length === 0) {
    return <p className="text-center text-foreground">{labels.noProductsFound}</p>;
  }

  return (
    <section className="py-12 bg-accent-light">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-foreground text-center mb-8">
          {labels.recentProducts}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 mt-4 md:grid-cols-3 gap-6">
          {recentProducts.map((product: Product) => (
            <ProductCardWithProvider key={product.ID} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
