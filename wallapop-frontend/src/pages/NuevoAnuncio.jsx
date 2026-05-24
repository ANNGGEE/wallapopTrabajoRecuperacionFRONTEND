import { useNavigate } from "react-router-dom";
import AnuncioForm from "../components/AnuncioForm.jsx";

export default function NuevoAnuncio() {
  const navigate = useNavigate();

  return (
    <main className="container">
      <AnuncioForm onGuardar={() => navigate("/")} />
    </main>
  );
}