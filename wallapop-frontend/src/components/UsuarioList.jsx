import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context/AuthContext";
import { apiFetch } from "../apiFetch";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const { usuario } = useAuth();

  // Cargar todos los usuarios
  const cargarUsuarios = () => {
    apiFetch(`${API}/usuarios`)
      .then(res => res.json())
      .then(data => setUsuarios(data));
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  // Borrar usuario con confirmación
  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este usuario?")) return;

    apiFetch(`${API}/usuarios/${id}`, { method: "DELETE" })
      .then(() => cargarUsuarios());
  };

  return (
    <div className="container">
      <h2>Listado de Usuarios</h2>

      <input
        placeholder="Buscar por email"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      {usuarios
        .filter(u =>
          u.email.toLowerCase().includes(
            busqueda.toLowerCase()
          )
        )
        .map(u => (
        <article
          key={u.id}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginBottom: "15px",
            padding: "10px",
            borderBottom: "1px solid #e1caff",
          }}
        >
          {/* Imagen circular o fallback */}
          {u.imagen ? (
            <img
              src={u.imagen}
              alt={u.nombre}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                objectFit: "cover",
              }}
            />
          ) : (
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                background: "#ccc",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                color: "#fff",
              }}
            >
              ?
            </div>
          )}

          {/* Datos del usuario */}
          <div style={{ flex: 1 }}>
            <strong>{u.nombre}</strong>
            <p>{u.email}</p>
          </div>

          {/* Botones de acción */}
          {usuario?.id === u.id && (
  <>
          <Link to={`/usuarios/editar/${u.id}`}>
            <button className="outline">Editar</button>
          </Link>

          <button
            className="secondary"
            onClick={() => handleDelete(u.id)}
            style={{ marginLeft: "10px" }}
          >
            Borrar
          </button>
        </>
      )}
        </article>
      ))}
    </div>
  );
}