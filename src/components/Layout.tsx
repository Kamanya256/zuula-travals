import { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import SiteNavbar from "./SiteNavbar";
import SiteFooter from "./SiteFooter";
import FloatingWidgets from "./FloatingWidgets";

interface LayoutProps {
  children?: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteNavbar />
      <main className="flex-1">
        {children || <Outlet />}
      </main>
      <SiteFooter />
      <FloatingWidgets />
    </div>
  );
}
