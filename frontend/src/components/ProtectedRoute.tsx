import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { autenticado, usuario } = useAuth();

  console.log("Autenticado:", autenticado);
  console.log("Usuário:", usuario);
  if (!autenticado) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
