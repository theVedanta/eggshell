import Link from "next/link";

import { Brand } from "@/lib/db";

const BrandCard = ({ brand }: { brand: Brand }) => {
  return (
    <Link href={`/brands/${brand.id}`} className="block">
      <div className="border rounded-lg p-4 flex flex-col items-center hover:bg-muted/40 transition bg-background">
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-muted text-lg font-bold text-primary mb-2">
          {brand.name.charAt(0)}
        </div>
        <div className="text-center">
          <div className="font-medium text-sm">{brand.name}</div>
          <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
            {brand.description}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BrandCard;
