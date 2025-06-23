import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { removeFromCart } from "@/store/slice/cartSlice";

const CartPage = () => {
  const cart = useSelector((state: RootState) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemove = (productId: string) => {
    dispatch(removeFromCart(productId));
  };

  return (
    <div className="p-4 bg-white rounded-xl ">
      <h2 className="text-2xl font-bold mb-4">Cart Items</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S.N.</TableHead>
            <TableHead>Product ID</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cart.length > 0 ? (
            cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.productId}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell className="text-center">
                  <button
                    onClick={() => handleRemove(item.productId)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full"
                  >
                    Remove
                  </button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={4}
                className="text-center text-muted-foreground"
              >
                Cart is empty.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CartPage;
