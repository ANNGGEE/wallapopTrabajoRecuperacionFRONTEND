import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../apiFetch";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
        const res = await apiFetch(`${API}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nombre, email, password })
        })      

        if (!res.ok) throw new Error("Error al registrar");

        alert("Usuario creado");
        navigate("/login");

    } catch (err) {
        alert(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Registro</h2>

      <input placeholder="Nombre" onChange={e => setNombre(e.target.value)} />
      <input placeholder="Email" onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />

      <button onClick={handleRegister}>Crear cuenta</button>

      <p>
        ¿Ya tienes cuenta? <Link to="/login">Login</Link>
      </p>
    </div>
  );
} 
