import { useSelector, useDispatch } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RootState } from "@/store/store";
import { addToCart } from "@/store/slice/cartSlice";
import { useState } from "react";

const ProductTable = () => {
  const products = useSelector((state: RootState) => state.product.products);
  const dispatch = useDispatch();

  // ✅ local state to hold quantity per product
  const [quantityInputs, setQuantityInputs] = useState<Record<string, number>>(
    {}
  );

  // ✅ handle change in quantity input
  const handleQuantityChange = (productId: string, value: number) => {
    setQuantityInputs((prev) => ({
      ...prev,
      [productId]: value,
    }));
  };

  const handleAddToCart = (productId: string) => {
    const quantity = quantityInputs[productId] || 1; // default to 1
    dispatch(
      addToCart({
        productId,
        quantity,
      })
    );
  };

  return (
    <div className="mx-auto mt-5 p-4 bg-white rounded-xl shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <TableRow key={product.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell className="max-w-72 break-words whitespace-normal">
                  {product.description}
                </TableCell>
                <TableCell className="text-center flex justify-center">
                  <div className="flex items-center gap-2">
                    <span>qty</span>
                    <input
                      type="number"
                      min={1}
                      value={quantityInputs[product.id] || 1}
                      onChange={(e) =>
                        handleQuantityChange(product.id, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border border-gray-300 rounded mr-2 text-sm"
                    />
                  </div>

                  <button
                    onClick={() => handleAddToCart(product.id)}
                    className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-1 rounded-full text-sm"
                  >
                    + Add to Cart
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-center text-muted-foreground"
              >
                No products found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ProductTable;
