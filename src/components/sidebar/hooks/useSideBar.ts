import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/paths";
import { clearAllCookies } from "@/utils/cookie";

export function useSidebar(
  sidebarOpen: boolean,
  setSidebarOpen: (val: boolean) => void
) {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const trigger = useRef<HTMLButtonElement | null>(null);
  const sidebar = useRef<HTMLDivElement | null>(null);

  const storedSidebarExpanded = localStorage.getItem("sidebar-expanded");
  const [sidebarExpanded, setSidebarExpanded] = useState(
    storedSidebarExpanded === null ? false : storedSidebarExpanded === "true"
  );

  // Close on outside click
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Close on ESC key
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  }, [sidebarOpen, setSidebarOpen]);

  // Store expanded state in localStorage + body class
  useEffect(() => {
    localStorage.setItem("sidebar-expanded", String(sidebarExpanded));
    const body = document.querySelector("body");
    if (sidebarExpanded) {
      body?.classList.add("sidebar-expanded");
    } else {
      body?.classList.remove("sidebar-expanded");
    }
  }, [sidebarExpanded]);

  const onLogoutClick = () => {
    clearAllCookies();
    navigate(PATH.login);
  };

  return {
    pathname,
    trigger,
    sidebar,
    sidebarExpanded,
    setSidebarExpanded,
    onLogoutClick,
  };
}
