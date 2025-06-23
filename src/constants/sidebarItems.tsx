import { AiOutlineShop } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";

import { PATH } from "@/constants/paths";
import { ReactNode } from "react";
interface SidebarChild {
  title: string;
  icon: ReactNode;
  link: string;
}
interface SidebarItem {
  title: string;
  icon: ReactNode;
  link?: string;
  children?: SidebarChild[];
}
export const SIDE_BAR_ITEMS: SidebarItem[] = [
  {
    title: "Product",
    icon: <AiOutlineShop className="text-xl " />,
    link: PATH.product,
  },
  {
    title: "Cart",
    icon: <FiShoppingCart className="text-xl " />,
    link: PATH.cart,
  },
];
