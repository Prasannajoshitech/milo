import { useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/headers/Header";
import SideBar from "@components/sidebar/SideBar";
import Main from "./Main";

const Layout = () => {
  const layoutref = useRef<HTMLDivElement>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen font-poppins overflow-hidden">
      {/* Sidebar wrapper */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-20"
        } transition-all duration-700 ease-in-out min-w-fit`}
      >
        <SideBar setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
      </div>

      {/* Main content wrapper - will adjust width based on sidebar */}
      <div
        ref={layoutref}
        className={`relative flex flex-col overflow-y-auto transition-all duration-500 ease-in-out w-full mr-5`}
      >
        <Header setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen} />
        <Main>
          <Outlet />
        </Main>
      </div>
    </div>
  );
};

export default Layout;
