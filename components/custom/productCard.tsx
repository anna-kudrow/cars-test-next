import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
import type { Product } from "~/lib/types";

function ProductCard({ product }: { product: Product }) {
  return (
    <Card className="gap-2 py-0">
      <CardContent className="px-0">
        <Image
          className="rounded-t-xl"
          src={product.images.image[0]}
          width={300}
          height={200}
          alt={product.mark_id}
        />
        <div className="px-4">
          <h3>
            <span>{product.mark_id}</span>
            <span>{product.folder_id}</span>
          </h3>
          <div>
            <span>{product.price}</span>
            <span>{product.currency}</span>
          </div>
          <div>{product.modification_id}</div>
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
            <Button variant="secondary" />
            <Button variant="secondary" />
          </div>
          <Button>КУПИТЬ</Button>
        </div>
      </CardFooter>
    </Card>
  );
}

export default ProductCard;
