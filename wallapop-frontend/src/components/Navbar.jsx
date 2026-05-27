import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {

  const { token, logout, usuario } = useAuth();
  const navigate = useNavigate();

  if (!token) {
    return (
      <nav
        style={{
          backgroundColor: "#bfa2ff",
          padding: "1rem",
          textAlign: "center",
          borderRadius: "0 0 12px 12px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          flexWrap: "wrap"
        }}
        >
          
        <Link
          to="/"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Inicio
        </Link>

        <Link
          to="/login"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Login
        </Link>

        <Link
          to="/register"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Registro
        </Link>
      </nav>
    );
  }

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      style={{
        backgroundColor: "#bfa2ff",
        padding: "1rem",
        textAlign: "center",
        borderRadius: "0 0 12px 12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        flexWrap: "wrap"
      }}
    >

        <Link
          to="/"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Anuncios
        </Link>

        <Link
          to="/nuevo"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Nuevo
        </Link>

        <Link
          to="/usuarios"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Usuarios
        </Link>

        <Link
          to="/mis-anuncios"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Mis anuncios
        </Link>

        <Link
          to="/categorias"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Categorías
        </Link>

        <Link
          to="/mis-compras"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Mis compras
        </Link>

        <Link
          to="/mis-ventas"
          style={{
            margin: "0 1rem",
            color: "#fff",
            fontWeight: "bold"
          }}
        >
          Mis ventas
        </Link>

        {usuario && (
          <Link
            to={`/usuarios/editar/${usuario.id}`}
            style={{
              margin: "0 1rem",
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            Mi perfil
          </Link>
        )}

        <button
          style={{ marginLeft: "1rem" }}
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>
  );
} 
