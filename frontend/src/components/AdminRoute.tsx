import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface AdminRouteProps {
  children: React.ReactNode;
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { usuario, autenticado } = useAuth();

  const location = useLocation();

  if (!autenticado) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (usuario?.cargo !== "admin") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}
