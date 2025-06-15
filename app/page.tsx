import ProductCard from "../components/custom/productCard";
import SortingPicker from "../components/custom/sortingPicker";
import type {Product} from '../lib/types';


async function fetchProducts(): Promise<Product[]> {
  const response = await fetch('https://testing-api.ru-rating.ru/cars');
  return response.json();
}

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-4 bg-blue-50 p-4">
      <div className="w-full rounded-xl bg-white p-4 shadow-md">
        <SortingPicker />
      </div>
      <div className="flex flex-wrap justify-between gap-4">
        <ProductCard />
      </div>
    </main>
  );
}
