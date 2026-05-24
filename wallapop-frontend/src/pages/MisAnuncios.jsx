import { useEffect, useState } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function MisAnuncios() {

  const [anuncios, setAnuncios] = useState([]);
  const [loading, setLoading] = useState(true);

  const { usuario } = useAuth();

  const handleDelete = (id) => {

    if (!window.confirm("¿Seguro?")) return;

    apiFetch(`${API}/anuncios/${id}`, {
      method: "DELETE"
    })
    .then(() => {
      setAnuncios(prev => prev.filter(a => a.id !== id));
    });
  };

  useEffect(() => {

    if (!usuario) return;

    apiFetch(`${API}/anuncios/todos`)
      .then(res => res.json())
      .then(data => {

        const mios = data.filter(
          a => Number(a.usuario?.id) === Number(usuario.id)
        );

        setAnuncios(mios);
        setLoading(false);

      })
      .catch(() => setLoading(false));

  }, [usuario]);

  if (!usuario) {
    return (
      <main className="container">
        <p>Debes iniciar sesión</p>
      </main>
    );
  }

  if (loading) {
    return (
      <main className="container">
        <p>Cargando anuncios...</p>
      </main>
    );
  }

  return (
    <main className="container">

      <h2>Mis anuncios</h2>

      {anuncios.length === 0 ? (

        <p>No tienes anuncios aún</p>

      ) : (

        anuncios.map(a => (

          <article
            key={a.id}
            style={{
              display: "flex",
              gap: "20px",
              alignItems: "center",
              padding: "20px 0",
              borderBottom: "1px solid #d8b4fe"
            }}
          >

            {/* Imagen */}
            <div
              style={{
                width: "150px",
                height: "150px",
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "#f3f3f3",
                borderRadius: "10px",
                overflow: "hidden"
              }}
            >
              {a.imagen ? (
                <img
                  src={a.imagen}
                  alt={a.titulo}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover"
                  }}
                />
              ) : (
                <span style={{ color: "#888" }}>
                  Sin imagen
                </span>
              )}
            </div>

            {/* Información */}
            <div>

              <strong>{a.titulo}</strong>

              <p>{a.descripcion}</p>

              <p>{a.precio} €</p>

              <div style={{ marginTop: "10px" }}>

                <Link to={`/editar/${a.id}`}>
                  <button>Editar</button>
                </Link>

                <button
                  onClick={() => handleDelete(a.id)}
                  style={{ marginLeft: "10px" }}
                >
                  Borrar
                </button>

              </div>

            </div>

          </article>

        ))
      )}

    </main>
  );
} 
