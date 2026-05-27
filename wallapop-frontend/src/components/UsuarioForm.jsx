import { useState, useEffect } from "react";
import API from "../api";
import { apiFetch } from "../apiFetch";

export default function UsuarioForm({ usuario, onGuardar }) {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imagen, setImagen] = useState("");

  // Rellena los campos cuando llega el usuario, en el modo edición 
  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || "");
      setEmail(usuario.email || "");
      setImagen(usuario.imagen || "");
      setPassword(""); // nunca mostrar la contraseña
    }
  }, [usuario]);

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagen(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = usuario
      ? `${API}/usuarios/${usuario.id}`
      : `${API}/usuarios`;

    const method = usuario ? "PUT" : "POST";

    const payload = {
      nombre,
      email,
      imagen,
      password
    };

    apiFetch(url, {
      method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(data => {
        if (onGuardar) onGuardar(data);

        // limpiar solo si estamos creando
        if (!usuario) {
          setNombre("");
          setEmail("");
          setPassword("");
          setImagen("");
        }
      })
      .catch(err => alert(err.message));
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <label>
        Nombre
        <input
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
      </label>

      <label>
        Email
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </label>

      <label>
        Contraseña {usuario && "(dejar en blanco para no cambiar)"}
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </label>

      <label>
        Foto de perfil
        <input
          type="file"
          accept="image/*"
          onChange={handleImagenChange}
        />
      </label>

      {/* Vista previa si hay imagen */}
      {imagen && (
        <img
          src={imagen}
          alt="Preview"
          style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            objectFit: "cover",
            marginTop: "10px"
          }}
        />
      )}

      <button type="submit">
        {usuario ? "Actualizar Usuario" : "Crear Usuario"}
      </button>
    </form>
  );
}
