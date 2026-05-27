import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";

export default function UsuarioPerfil() {

  const { id } = useParams();

  const [usuario, setUsuario] = useState(null);
  const [anuncios, setAnuncios] = useState([]);

  useEffect(() => {

    apiFetch(`${API}/usuarios/${id}`)
      .then(res => res.json())
      .then(data => setUsuario(data));

    apiFetch(`${API}/usuarios/${id}/anuncios`)
      .then(res => res.json())
      .then(data => setAnuncios(data));

  }, [id]);

  if (!usuario) return <p>Cargando...</p>;

  return (
    <main className="container">

      <h2>{usuario.nombre}</h2>

      {usuario.imagen && (
        <img
          src={usuario.imagen}
          alt={usuario.nombre}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            objectFit: "cover"
          }}
        />
      )}

      <p>{usuario.email}</p>

      <h3>Sus anuncios</h3>

      {anuncios.map(a => (
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
              width: "120px",
              height: "120px",
              flexShrink: 0,
              background: "#f3f3f3",
              borderRadius: "10px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
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
          </div>

        </article>
      ))}

    </main>
  );
} 
