import "./App.css";

import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import { useAuth } from "./context/AuthContext";

import MisAnuncios from "./pages/MisAnuncios";
import Anuncio from "./pages/Anuncio";
import NuevoAnuncio from "./pages/NuevoAnuncio";
import EditarAnuncio from "./pages/EditarAnuncio";
import Usuario from "./pages/Usuario";
import EditarUsuario from "./pages/EditarUsuario";
import Login from "./pages/Login";
import Register from "./pages/Register";

import PrivateRoute from "./routes/PrivateRoute";
import Navbar from "./components/Navbar";

import MisCompras from "./pages/MisCompras";
import MisVentas from "./pages/MisVentas";
import Categorias from "./pages/Categorias";

import UsuarioPerfil from "./pages/UsuarioPerfil";

function App() {

  const { token } = useAuth();

  return (
    <>
      <Navbar />

      <Routes>

        <Route
          path="/login"
          element={
            token ? <Navigate to="/" /> : <Login />
          }
        />

        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/"
          element={<Anuncio />}
        />

        <Route 
          path="/categorias" 
          element={<Categorias />} 
        />

        <Route
          path="/mis-anuncios"
          element={
            <PrivateRoute>
              <MisAnuncios />
            </PrivateRoute>
          }
        />

        <Route
          path="/mis-compras"
          element={
            <PrivateRoute>
              <MisCompras />
            </PrivateRoute>
          }
        />

        <Route
          path="/mis-ventas"
          element={
            <PrivateRoute>
              <MisVentas />
            </PrivateRoute>
          }
        />

        <Route
          path="/nuevo"
          element={
            <PrivateRoute>
              <NuevoAnuncio />
            </PrivateRoute>
          }
        />

        <Route
          path="/editar/:id"
          element={
            <PrivateRoute>
              <EditarAnuncio />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios"
          element={
            <PrivateRoute>
              <Usuario />
            </PrivateRoute>
          }
        />

        <Route
          path="/usuarios/:id"
          element={
            <UsuarioPerfil />}
        />

        <Route
          path="/usuarios/editar/:id"
          element={
            <PrivateRoute>
              <EditarUsuario />
            </PrivateRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" />}
        />

      </Routes>
    </>
  );
}

export default App; 
