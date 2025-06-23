import { useState } from "react";
import AddProductModal from "../modal/AddProductModal";

const ProductToolbar = () => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="flex justify-between items-center">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <button
        onClick={() => setOpenModal(true)}
        className="  px-3 w-fit bg-secondary-500 text-white font-semibold py-3 rounded-full shadow-box transition-colors typography-paragraph-small cursor-pointer "
      >
        + Add Product
      </button>
      <AddProductModal isOpen={openModal} onClose={() => setOpenModal(false)} />
    </div>
  );
};

export default ProductToolbar;
