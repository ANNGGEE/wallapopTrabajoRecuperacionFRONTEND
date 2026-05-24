import { useState } from "react";
import API from "../api";
import { Link, useNavigate } from "react-router-dom";
import { apiFetch } from "../apiFetch";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    apiFetch(`${API}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (!res.ok) throw new Error("Login incorrecto");
        return res.json();
      })
     .then(data => {
        login(data);
        navigate("/");
      })
      .catch(err => alert(err.message)); 
    }    
   
  return (
    <div className="container">
      <h2>Login</h2>

      <Link
        to="/register"
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#bfa2ff",
          padding: "10px",
          borderRadius: "10px",
          color: "white"
        }}
      >
        Registrarme
      </Link>

      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={e => setPassword(e.target.value)}
      />

      <p style={{ marginTop: "10px" }}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>

      <button onClick={handleLogin}>
        Entrar
      </button>
    </div>
  );
} 
