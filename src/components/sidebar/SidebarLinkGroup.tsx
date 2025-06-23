import { ReactNode, useState } from "react";

interface Props {
  children: (func: () => unknown, open: boolean) => ReactNode;
  activeCondition: boolean;
}

const SidebarLinkGroup: React.FC<Props> = ({
  children,
  activeCondition,
}: Props) => {
  const [open, setOpen] = useState(activeCondition);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <li
      className={` rounded-[1.25rem]  last:mb-1  ${
        activeCondition ? " bg-white text-secondary-500" : ""
      }`}
    >
      {children(handleClick, open)}
    </li>
  );
};

export default SidebarLinkGroup;
