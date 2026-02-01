// components/PromoCard.jsx
import { Promotion } from "@/types/promo";
import Image from "next/image";

interface Props {
  promo: Promotion;
}
export default function PromoCard({ promo }: Readonly<Props>) {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 mb-6 max-w-xs mx-auto text-center p-1">
      {/* Image */}
      <div className="w-full h-40 relative items-center mx-auto rounded-lg">
        <Image
          src={promo.thumb || "/placeholder.png"}
          alt={promo.title}
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Title */}
      <h2 className="mt-4 text-lg sm:text-xl font-bold text-gray-900 px-4">
        {promo.title}
      </h2>

      {/* Merchant */}
      <p className="text-sm text-gray-500 mt-1">{promo.merchant}</p>

      {/* Details */}
      <div className="bg-gray-50 p-3 mt-4 flex flex-col gap-1 text-sm text-gray-600">
        <span>Valid Until: {promo.valid_to}</span>
        <span className="font-semibold">{promo.card_type} Card</span>
      </div>
    </div>
  );
}
