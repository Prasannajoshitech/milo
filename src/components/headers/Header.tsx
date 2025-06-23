import UserMenu from "@/components/headers/DropDownProfile";
import { IoSearchSharp } from "react-icons/io5";

interface HeaderProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (val: boolean) => unknown;
}

const Header: React.FC<HeaderProps> = () => {
  return (
    <header className="top-0 z-40 sticky bg-body pb-5 bg-background-50">
      <div className="px-5">
        <div className="flex justify-between items-center h-16 pt-8">
          <div className="flex items-center bg-white border border-background-600 rounded-lg px-4 py-2 w-full max-w-md shadow-md">
            <IoSearchSharp className="text-xl text-text-300" />

            <input
              type="text"
              placeholder="Search"
              className="ml-2 bg-transparent outline-none w-full text-gray-600 placeholder-gray-400"
            />
          </div>

          <div className="flex items-center space-x-3 w-fit">
            <UserMenu align="right" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
