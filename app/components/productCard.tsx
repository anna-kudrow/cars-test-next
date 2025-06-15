import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent, CardFooter } from "~/components/ui/card";
function ProductCard() {
  return (
    <Card>
      <CardContent>
        <Image src="" alt="" />
        <div>
          <h3>name</h3>
          <div>
            <span>price</span>
            <span>credit</span>
          </div>
          <div>engine</div>
          <div>
            <span>data</span> <span>data</span>
          </div>
          <div>
            <span>petrol</span> <span>color</span> <span>year</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between">
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
