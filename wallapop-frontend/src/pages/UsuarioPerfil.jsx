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
            borderRadius: "50%"
          }}
        />
      )}

      <p>{usuario.email}</p>

      <h3>Sus anuncios</h3>

      {anuncios.map(a => (
        <article key={a.id}>
          <strong>{a.titulo}</strong>
          <p>{a.precio} €</p>
        </article>
      ))}

    </main>
  );
} 
