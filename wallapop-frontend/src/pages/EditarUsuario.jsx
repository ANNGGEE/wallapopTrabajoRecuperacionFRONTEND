import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api";
import UsuarioForm from "../components/UsuarioForm.jsx";
import { apiFetch } from "../apiFetch";

export default function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario individual desde la API
  useEffect(() => {
    apiFetch(`${API}/usuarios/${id}`)
      .then(res => res.json())
      .then(data => setUsuario(data))
      .catch(err => console.error("Error al cargar usuario:", err));
  }, [id]);

  // Función que se ejecuta cuando se guarda el usuario en UsuarioForm
  const handleGuardar = (usuarioActualizado) => {
    // Redirige a la lista de usuarios después de guardar
    navigate("/usuarios");
  };

  return (
    <main className="container">
      <h2>Editar Usuario</h2>

      {/* Solo mostrar el formulario cuando ya se cargó el usuario */}
      {usuario ? (
        <UsuarioForm usuario={usuario} onGuardar={handleGuardar} />
      ) : (
        <p>Cargando usuario...</p>
      )}
    </main>
  );
}

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import API from "../api";

// export default function EditarUsuario() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [nombre, setNombre] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   useEffect(() => {
//     fetch(`${API}/usuarios`)
//       .then(res => res.json())
//       .then(data => {
//         const usuario = data.find(u => u.id === parseInt(id));
//         if (usuario) {
//           setNombre(usuario.nombre);
//           setEmail(usuario.email);
//           setPassword(usuario.password);
//         }
//       });
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     fetch(`${API}/usuarios/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ nombre, email, password }),
//     }).then(() => navigate("/usuarios"));
//   };

//   return (
//     <main className="container">
//       <h2>Editar Usuario</h2>

//       <form onSubmit={handleSubmit}>
//         <input
//           value={nombre}
//           onChange={e => setNombre(e.target.value)}
//           placeholder="Nombre"
//         />
//         <input
//           value={email}
//           onChange={e => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           value={password}
//           onChange={e => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Actualizar</button>
//       </form>
//     </main>
//   );
// }
