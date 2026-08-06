import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Topbar from "../components/admin/Topbar";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#02040A] text-white">
      <Sidebar />
      <Topbar />
      <main className="flex-1 ml-72 overflow-y-auto max-w-[85%] pt-0 p-8 flex flex-col gap-8">
        <Outlet />
      </main>
    </div>
  );
}
