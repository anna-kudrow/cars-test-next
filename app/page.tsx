import SortingPicker from "./components/sortingPicker";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-blue-50 p-4">
      <div className="w-full rounded-xl bg-white p-2">
        <SortingPicker />
      </div>
    </main>
  );
}
