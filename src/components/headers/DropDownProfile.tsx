import { FC, useRef, useState, useEffect, useCallback } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/authSlice";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/paths";
interface DropdownProfileProps {
  align?: "left" | "right";
}

const UserMenu: FC<DropdownProfileProps> = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  }, []);

  useEffect(() => {
    if (dropdownOpen) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownOpen, handleClickOutside]);

  const handleLogout = () => {
    dispatch(logout());
    setDropdownOpen(false);
    navigate(PATH.login);
  };

  return (
    <div className="relative inline-flex" ref={dropdownRef}>
      <button
        className="inline-flex justify-center items-center gap-3 group cursor-pointer"
        aria-haspopup="true"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        aria-expanded={dropdownOpen}
      >
        <img
          className="border border-gray-300 w-8 h-8 object-contain rounded-full"
          src="/logo.webp"
          width="32"
          height="32"
          alt="User"
        />
        <div className="flex items-center">
          <IoMdArrowDropdown
            className={`transition-transform ${dropdownOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {dropdownOpen && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
          <button
            className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={handleLogout}
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
