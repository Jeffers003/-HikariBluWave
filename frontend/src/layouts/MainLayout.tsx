import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/shared/ScrollToTop";
export function MainLayout() {
  return (
    <div className="min-h-screen bg-[#010308] text-white">
      <ScrollToTop />
      <Header />
      <main className="pt-8">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
