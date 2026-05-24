import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  // Cargar desde localStorage al iniciar la app
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("usuario");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

  const login = (data) => {
    setToken(data.token);
    setUsuario(data.usuario);

    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
  };

  const logout = () => {
    setToken(null);
    setUsuario(null);

    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 
