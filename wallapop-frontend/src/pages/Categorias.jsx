import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";

export default function Categorias() {

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {

    apiFetch(`${API}/anuncios/categorias`)
      .then(res => res.json())
      .then(data => setCategorias(data));

  }, []);

  return (
    <main className="container">
      <h2>Categorías</h2>

      {categorias.map((c, i) => (
        <p key={i}>
          <Link to={`/?categoria=${c[0]}`}>
            {c[0]} ({c[1]})
          </Link>
        </p>
      ))}

    </main>
  );
}
