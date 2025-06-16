import { CarFront, Heart, Scale } from "lucide-react";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import type { Product } from "~/lib/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="max-w-[300px] gap-2 py-0">
      <CardContent className="space-y-1 px-0">
        <Image
          className="rounded-t-xl"
          src={product.images.image[0]}
          width={300}
          height={200}
          alt={product.mark_id}
        />
        <div className="space-y-1 px-4">
          <h3 className="font-bold">
            {`${product.mark_id} ${product.folder_id}`}
          </h3>
          <div className="font-bold">
            {`${product.price} ${product.currency}`}
          </div>
          <div className="flex items-center gap-1">
            <CarFront className="size-4" />
            {product.modification_id}
          </div>
          <div>
            <span>{`${product.run} км`}</span> <span>{product.gearbox}</span>
          </div>
          <div>
            <span>{product.engine_type}</span> <span>{product.color}</span>{" "}
            <span>{product.year}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 pb-6">
        <div className="flex w-full justify-between">
          <div className="flex gap-2">
            <Button variant="secondary">
              {" "}
              <Heart />
            </Button>
            <Button variant="secondary">
              {" "}
              <Scale />
            </Button>
          </div>
          <Button>КУПИТЬ</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
