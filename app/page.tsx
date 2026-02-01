import PromoList from "@/components/promotion/promotion-list";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center justify-start py-16 px-4 sm:items-start">
        <PromoList />
      </main>
    </div>
  );
}
