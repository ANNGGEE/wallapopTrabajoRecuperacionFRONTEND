import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AnuncioForm from "../components/AnuncioForm.jsx";
import API from "../api";
import { apiFetch } from "../apiFetch";

export default function EditarAnuncio() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anuncio, setAnuncio] = useState(null);

  useEffect(() => {
    apiFetch(`${API}/anuncios/${id}`)
      .then(res => res.json())
      .then(data => setAnuncio(data))
      .catch(console.error);
  }, [id]);

  return (
    <main className="container">
      {anuncio ? (
        <AnuncioForm anuncio={anuncio} onGuardar={() => navigate("/")} />
      ) : (
        <p>Cargando anuncio...</p>
      )}
    </main>
  );
}