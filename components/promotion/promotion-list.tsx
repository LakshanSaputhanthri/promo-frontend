"use client";

import { useEffect, useState, useRef } from "react";
import { fetchPromotions } from "@/services/fetch-promo";
import PromoCard from "./promo-card";
import { Promotion } from "@/types/promo";

export default function PromoList({ initialPromotions = [] }) {
  const [promotions, setPromotions] = useState<Promotion[]>(initialPromotions);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const lastItemRef = useRef<HTMLDivElement>(null);

  // Fetch promotions safely
  useEffect(() => {
    let mounted = true;

    async function fetchPage() {
      if (!hasMore) return;
      setLoading(true);
      try {
        const newPromos = await fetchPromotions(page, 10);
        if (!mounted) return;

        if (newPromos.length === 0) {
          setHasMore(false);
        } else {
          setPromotions((prev) => [...prev, ...newPromos]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchPage();
    return () => {
      mounted = false;
    };
  }, [page, hasMore]);

  // IntersectionObserver for "near last item" trigger
  useEffect(() => {
    if (!promotions.length || !hasMore) return;

    const options = {
      root: null,
      rootMargin: "200px", // preload before reaching the end
      threshold: 0,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((prev) => prev + 1);
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observerRef.current = observer;

    // observe the 8th last item (or last item if fewer)
    const indexToObserve =
      promotions.length >= 8 ? promotions.length - 8 : promotions.length - 1;
    const target = document.getElementById(`promo-${indexToObserve}`);
    if (target) observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, [promotions, hasMore, loading]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 items-center w-full mx-auto">
      {promotions.map((promo, index) => (
        <div
          key={promo.id}
          id={`promo-${index}`}
          className="w-full animate-fadeIn  animate-fadeIn forwards "
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <PromoCard promo={promo} />
        </div>
      ))}
      {loading && (
        <div className="mt-4 text-gray-500 text-center animate-pulse">
          Loading...
        </div>
      )}
      {!hasMore && !loading && (
        <p className="text-gray-500 mt-4 text-center">No more promotions</p>
      )}
    </div>
  );
}
