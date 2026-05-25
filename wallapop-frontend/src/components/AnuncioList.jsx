import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api";
import AnuncioCard from "../components/AnuncioCard";
import { apiFetch } from "../apiFetch";
import { useAuth } from "../context/AuthContext";
import { useSearchParams } from "react-router-dom";

export default function AnuncioList() {
  const [anuncios, setAnuncios] = useState([]);

  const { usuario } = useAuth();

  const [searchParams] = useSearchParams();

  const categoriaSeleccionada =
    searchParams.get("categoria") || "";

  const categorias = [
    "Tecnología",
    "Hogar",
    "Gaming",
    "Deporte",
    "Motor"
  ];

  // Cargar anuncios
  const cargarAnuncios = () => {
    apiFetch(`${API}/anuncios`)
      .then(res => {
        if (!res.ok) throw new Error("Error al cargar anuncios");
        return res.json();
      })
      .then(data => setAnuncios(data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    cargarAnuncios();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que quieres borrar este anuncio?")) return;

    apiFetch(`${API}/anuncios/${id}`, { method: "DELETE" })
      .then(() => cargarAnuncios())
      .catch(err => console.error(err));
  };

  const handleComprar = (anuncioId) => {
    if (!usuario) {
      alert("Debes iniciar sesión");
      return;
    }

    apiFetch(`${API}/anuncios/${anuncioId}/comprar`, {
      method: "PUT"
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al comprar");
        return res.json();
      })
      .then(() => cargarAnuncios())
      .catch(err => alert(err.message));
  };

  const anunciosFiltrados = categoriaSeleccionada
  ? anuncios.filter(a =>
      a.categorias?.some(
        c => c === categoriaSeleccionada
      )
    )
  : anuncios;

  return (
    <div className="container">

      <h2>Listado de Anuncios</h2>

      <Link to="/nuevo">
        <button className="contrast">Nuevo Anuncio</button>
      </Link>

      {/* FILTRO */}
      <div style={{ margin: "15px 0" }}>

        <strong>Categorías:</strong>

        <Link to="/">
          <button style={{ margin: "5px" }}>
            Todas
          </button>
        </Link>

        {categorias.map(c => (

          <Link
            key={c}
            to={`/?categoria=${c}`}
          >
            <button style={{ margin: "5px" }}>
              {c}
            </button>
          </Link>

        ))}

      </div>

      {/* LISTA */}
      {anunciosFiltrados.length === 0 ? (
        <p>No hay anuncios en esta categoría</p>
      ) : (
        anunciosFiltrados.map(a => (
          <AnuncioCard
            key={a.id}
            a={a}
            usuario={usuario}
            onDelete={handleDelete}
            onComprar={handleComprar}
          />
        ))
      )}
    </div>
  );
} 
