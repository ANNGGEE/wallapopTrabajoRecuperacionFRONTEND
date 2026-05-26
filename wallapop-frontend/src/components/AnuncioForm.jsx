import { useState, useEffect } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";
// import { useAuth } from "../context/AuthContext";

export default function AnuncioForm({ anuncio, onGuardar }) {
  const [titulo, setTitulo] = useState(anuncio?.titulo || "");
  const [descripcion, setDescripcion] = useState(anuncio?.descripcion || "");
  const [categorias, setCategorias] = useState(anuncio?.categorias || []);
  const [precio, setPrecio] = useState(anuncio?.precio || "");
  const [imagen, setImagen] = useState(anuncio?.imagen || ""); // Imagen base64

  // Cargar lista de usuarios
  // useEffect(() => {
  //   apiFetch(`${API}/usuarios`)
  //     .then(res => res.json())
  //     .then(data => setUsuarios(data))
  //     .catch(console.error);
  // }, []);

  // Manejar cambio de imagen y convertir a Base64
  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result); // guardamos Base64
      reader.readAsDataURL(file);
    }
  };

    useEffect(() => {
    if (anuncio) {
      setTitulo(anuncio.titulo || "");
      setDescripcion(anuncio.descripcion || "");

      setCategorias(
        anuncio.categorias?.map(c =>
          typeof c === "string" ? c : c.nombre
        ) || []
      );

      setPrecio(anuncio.precio || "");
      setImagen(anuncio.imagen || "");
    }
  }, [anuncio]);

    const handleSubmit = (e) => {
  e.preventDefault();

  // Validaciones solo para crear
  if (!anuncio) {

    if (!titulo.trim()) {
      alert("El título es obligatorio");
      return;
    }

    if (!descripcion.trim()) {
      alert("La descripción es obligatoria");
      return;
    }

    if (!precio || Number(precio) <= 0) {
      alert("El precio debe ser mayor que 0");
      return;
    }

    if (categorias.length === 0) {
      alert("Selecciona al menos una categoría");
      return;
    }
  }

  const url = anuncio
    ? `${API}/anuncios/${anuncio.id}`
    : `${API}/anuncios`;

  const method = anuncio ? "PUT" : "POST";

  // ENVIAR SIEMPRE TODO
  const payload = {
    titulo,
    descripcion,
    precio: parseFloat(precio),
    imagen,
    categorias: categorias.map(c =>
      typeof c === "string" ? c : c.nombre
    )
  };

  apiFetch(url, {
    method,
    body: JSON.stringify(payload),
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar el anuncio");
      return res.json();
    })
    .then(data => {

      alert(anuncio
        ? "Anuncio actualizado"
        : "Anuncio creado"
      );

      // if (!anuncio) {
      //   setTitulo("");
      //   setDescripcion("");
      //   setCategorias([]);
      //   setPrecio("");
      //   setImagen("");
      // }

      if (onGuardar) onGuardar(data);

    })
    .catch(err => alert(err.message));
};

  return (
    <form onSubmit={handleSubmit} className="container">
      <h2>{anuncio ? "Editar Anuncio" : "Crear Anuncio"}</h2>

      <label>
        Título
        <input
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
        />
      </label>

      <label>
        Descripción
        <textarea
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </label>

       <strong>Categorías</strong>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "5px",
            marginTop: "10px"
          }}
        >
          {[
            "Tecnología",
            "Gaming",
            "Hogar",
            "Motor",
            "Deporte"
          ].map(cat => (

            <label
              key={cat}
              style={{
                display: "inline-block",
                margin: "6px",
                padding: "10px 14px",
                borderRadius: "20px",
                cursor: "pointer",
                background: categorias.includes(cat)
                ? "#b78aff"
                : "#eee",

              color: categorias.includes(cat)
                ? "white"
                : "#444",

              fontWeight: "bold",

              transition: "all 0.2s ease",

              boxShadow: categorias.includes(cat)
                ? "0 2px 8px rgba(183,138,255,0.5)"
                : "none",

              transform: categorias.includes(cat)
                ? "scale(1.05)"
                : "scale(1)"
              }}
            >

              <input
                type="checkbox"
                style={{ display: "none" }}
                checked={categorias.includes(cat)}
                onChange={(e) => {
                  setCategorias(prev =>
                    e.target.checked
                      ? prev.includes(cat)
                        ? prev
                        : [...prev, cat]
                      : prev.filter(c => c !== cat)
                  );
                }}
              />

              {cat}

            </label>

          ))}
        </div>

      <label>
        Precio (€)
        <input
          type="number"
          min="0"
          step="0.01"
          value={precio}
          onChange={e => setPrecio(e.target.value)}
        />      
      </label>

      <label>
        Imagen
        <input type="file" accept="image/*" onChange={handleImagenChange} />
      </label>

      {imagen && (
        <img
          src={imagen}
          alt="Preview"
          style={{
            maxWidth: "200px",
            maxHeight: "200px",
            display: "block",
            marginTop: "10px",
            borderRadius: "8px",
            objectFit: "cover"
          }}
        />
      )}

      <button type="submit">{anuncio ? "Actualizar" : "Crear"}</button>
    </form>
  );
}
