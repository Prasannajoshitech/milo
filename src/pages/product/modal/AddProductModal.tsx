import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddProductForm from "../partials/ProductForm";
import { useAddProductForm } from "../hooks/useAddProductForm";
interface HowItWorksModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<HowItWorksModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { formik } = useAddProductForm({ onClose: onClose });
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-secondary-600 font-bold text-center">
            Add Proudct
          </DialogTitle>
        </DialogHeader>
        <div
          className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto "
          style={{ scrollbarWidth: "thin" }}
        >
          <AddProductForm formik={formik} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductModal;
