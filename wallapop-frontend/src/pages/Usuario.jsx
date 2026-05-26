import UsuarioForm from "../components/UsuarioForm.jsx";
import UsuarioList from "../components/UsuarioList.jsx";

export default function Usuario() {
  return (
    <main className="container">
      <h1>Gestión de Usuarios</h1>
      {/* <UsuarioForm /> */}
      <UsuarioList />
    </main>
  );
}