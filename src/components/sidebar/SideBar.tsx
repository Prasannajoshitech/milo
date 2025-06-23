import React, { ReactNode, useRef } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { MdOutlineLogout } from "react-icons/md";
import { RiExpandWidthLine } from "react-icons/ri";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../public/logo.webp";
import { PATH } from "@/constants/paths";
import { SIDE_BAR_ITEMS } from "@/constants/sidebarItems";
import SidebarLinkGroup from "./SidebarLinkGroup";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch } from "react-redux";
import { logout } from "@/store/slice/authSlice";
interface SideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (val: boolean) => unknown;
}

const SideBar: React.FC<SideBarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebar = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    dispatch(logout());
    navigate(PATH.login);
  };
  return (
    <div className={`m-5 `}>
      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`flex flex-col  lg:translate-x-0 h-[95vh] overflow-y-scroll lg:overflow-y-auto no-scrollbar   shadow-md p-4 transition-all  ease-in-out bg-secondary-500 duration-500 rounded-2xl ${sidebarOpen ? "w-52" : "w-24"} `}
      >
        <div className="flex flex-col justify-between sm:px-2 pr-3">
          <div className="flex sidebar-expanded:flex-row flex-col justify-start gap-y-3 sidebar-expanded:py-5 pb-3 h-24 border-b border-[#FFF1EF]">
            <a
              href={PATH.product}
              className="flex justify-center overflow-auto "
            >
              <img className="w-32 aspect-auto" src={logo} alt="" />
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-8">
          {/* Pages group */}
          <div>
            <ul className="flex flex-col gap-1 mt-3 text-white">
              {SIDE_BAR_ITEMS.map((data, index) => {
                const children = (data?.children || []) as {
                  icon: ReactNode;
                  link: string;
                  title: string;
                }[];
                const hasChildren = children.length > 0;

                const childrenLinks = children.map((child) => child.link);

                const isActive = childrenLinks.includes(pathname);
                return (
                  <React.Fragment key={index}>
                    {hasChildren ? (
                      <SidebarLinkGroup
                        activeCondition={isActive}
                        key={data.title}
                      >
                        {(handleClick, open) => {
                          return (
                            <>
                              <a
                                href="#0"
                                className={`block truncate line-clamp-1 px-4 py-3   ${
                                  isActive
                                    ? " text-secondary-500"
                                    : "text-white"
                                }`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                                  sidebarOpen
                                    ? handleClick()
                                    : setSidebarOpen(true);
                                }}
                              >
                                <div className="flex  justify-between items-center">
                                  <div className="flex  flex-wrap justify-center items-center">
                                    <div className="text-primary text-3xl shrink-0 pr-2 ">
                                      {data.icon}
                                    </div>

                                    <span
                                      className={`font-medium text-sm duration-200 ${
                                        sidebarOpen ? "flex " : "hidden "
                                      }`}
                                    >
                                      {data.title}
                                    </span>
                                  </div>
                                  {/* Icon */}
                                  <div className=" ml-2 text-sm shrink-0  ">
                                    {open ? <FaAngleUp /> : <FaAngleDown />}
                                  </div>
                                </div>
                              </a>
                              <div className={`${sidebarOpen ? "" : "hidden"}`}>
                                <ul
                                  className={`pl-5 mt-1 ${!open && "hidden"}`}
                                >
                                  {children.map((child) => (
                                    <li
                                      className="mb-1 last:mb-0"
                                      key={child.link}
                                    >
                                      <NavLink
                                        end
                                        to={child.link}
                                        className={({ isActive }) =>
                                          " transition duration-150 truncate rounded-full py-2 flex px-5 " +
                                          (isActive ? " bg-white" : "")
                                        }
                                      >
                                        <div className="pr-2 ">
                                          {child.icon}
                                        </div>
                                        <span
                                          className={` font-medium text-xs duration-200 ${
                                            sidebarOpen ? "flex " : "hidden "
                                          }`}
                                        >
                                          {child.title}
                                        </span>
                                      </NavLink>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </>
                          );
                        }}
                      </SidebarLinkGroup>
                    ) : (
                      <li
                        className={` rounded-[1.25rem] overflow-hidden sidebar-expanded:mb-2 last:mb-1 ${
                          pathname.includes(data.link!) &&
                          "bg-primary text-white"
                        }`}
                        key={data.title}
                      >
                        <NavLink
                          end
                          to={data.link!}
                          className={({ isActive }) =>
                            " transition duration-150 truncate rounded-full py-2 flex px-5 " +
                            (isActive ? " bg-white !text-secondary-500" : "")
                          }
                        >
                          <div className="flex justify-between items-center">
                            <div
                              className={`flex items-center gap-x-2 gap-y-1 grow ${
                                !sidebarOpen ? "lg:flex-col " : "lg:flex-row "
                              }`}
                            >
                              <TooltipProvider>
                                <Tooltip>
                                  <div className="relative flex gap-2 items-center">
                                    <TooltipTrigger>{data.icon}</TooltipTrigger>

                                    <span
                                      className={` font-medium text-xs lg:sidebar-expanded:text-sm ${
                                        sidebarOpen ? "flex " : "hidden "
                                      }`}
                                    >
                                      {data.title}
                                    </span>
                                    <TooltipContent className="text-xs bg-white text-secondary-500   shadow-md absolute -bottom-12 text-nowrap">
                                      <span className="flex items-center gap-x-1">
                                        {data.title}
                                      </span>
                                    </TooltipContent>
                                  </div>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </NavLink>
                      </li>
                    )}
                  </React.Fragment>
                );
              })}

              <li className={`rounded-xl overflow-hidden mb-2 last:mb-1 `}>
                <button
                  onClick={handleLogout}
                  className={`block truncate transition  w-full  px-4  py-2 hover:bg-primary/5 hover:text-red-500  `}
                >
                  <div className="flex justify-between items-center">
                    <div
                      className={`flex items-center grow gap-x-2 gap-y-1 text-white  ${
                        sidebarOpen
                          ? "lg:flex-row lg:justify-start"
                          : "lg:flex-col lg:justify-center"
                      }`}
                    >
                      <div className="shrink-0">
                        {" "}
                        <MdOutlineLogout className="text-lg" />
                      </div>

                      <span
                        className={`font-medium text-xs lg:sidebar-expanded:text-sm ${
                          sidebarOpen ? "flex " : "hidden "
                        }
                        }`}
                      >
                        Logout
                      </span>
                    </div>
                  </div>
                </button>
                <button
                  className="text-white w-min transition-all cursor-pointer absolute bottom-15 right-5"
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                >
                  <RiExpandWidthLine className="text-lg sidebar-expanded:rotate-180 sidebar-expanded:6xl" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
