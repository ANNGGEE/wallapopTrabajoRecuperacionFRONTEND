import { useEffect, useState } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";
import { useAuth } from "../context/AuthContext";

export default function MisCompras() {

  const [anuncios, setAnuncios] = useState([]);
  const { usuario } = useAuth();

  useEffect(() => {

    if (!usuario) return;

    apiFetch(`${API}/anuncios/todos`)
      .then(res => res.json())
      .then(data => {

        const compras = data.filter(
          a => Number(a.comprador?.id) === Number(usuario.id)
        );

        setAnuncios(compras);
      });

  }, [usuario]);

  return (
    <main className="container">

      <h2>Mis compras</h2>

      {anuncios.length === 0 ? (
        <p>No tienes compras aún</p>
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
    </div>
  </article>
        ))
      )}

    </main>
  );
}
