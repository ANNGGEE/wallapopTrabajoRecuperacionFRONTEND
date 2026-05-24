import { Link } from "react-router-dom"; 

export default function AnuncioCard({ a, usuario, onDelete, onComprar }) {
  return (
    <article style={{
      display: "flex",
      alignItems: "flex-start",
      gap: "20px",
      marginBottom: "20px",
      border: "1px solid #f0e1ff",
      paddingBottom: "10px",
      background: "white",
      borderRadius: "12px",
      padding: "16px",
      boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      transition: "0.2s ease"
    }}>

      {/* Imagen */}
      <div style={{
        width: "150px",
        height: "150px",
        background: "#f3f3f3",
        borderRadius: "8px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>
        {a.imagen ? (
          <img
            src={a.imagen}
            alt={a.titulo}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <span style={{ color: "#888" }}>Sin imagen</span>
        )}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <strong>{a.titulo}</strong> - {a.precio} €
        <p>{a.descripcion}</p>

        {/* Usuario */}
        <p>
          <strong>Vendedor:</strong> {a.usuario?.nombre}
        </p>

        {/* Categoría */}
        <div style={{ marginTop: "10px" }}>
          <strong>Categorías:</strong>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "8px",
              marginTop: "8px"
            }}
          >
            {a.categorias?.map((c, i) => {

              const nombre =
                typeof c === "string"
                  ? c
                  : c.nombre;

              return (
                <span
                  key={i}
                  style={{
                    background: "#efe4ff",
                    color: "#6b39c5",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontSize: "0.9rem",
                    fontWeight: "bold"
                  }}
                >
                  {nombre}
                </span>
              );
            })}
          </div>
        </div>

        {/* Comprar */}
        {!a.comprador ? (
          a.usuario?.id !== usuario?.id ? (
          <button
            onClick={() => onComprar(a.id)}
            style={{ marginTop: "10px" }}
          >
            Comprar
          </button>         
           ) : (
            <button
              disabled
              style={{ marginTop: "10px" }}
            >
              Tu anuncio
            </button>
          )
        ) : (
        <button
          disabled
          className="secondary"
          style={{ marginTop: "10px" }}
        >            
            {a.comprador?.id === usuario?.id
              ? "Lo compraste tú"
              : `Comprado por ${a.comprador?.nombre}`
            }
          </button>
        )}

        {/* Acciones */}
        {Number(a.usuario?.id) === Number(usuario?.id) && (
        <>
          <Link to={`/editar/${a.id}`}>
            <button>Editar</button>
          </Link>

          <button
            onClick={() => onDelete(a.id)}
            style={{ marginLeft: "10px", marginTop: "10px" }}
          >
            Borrar
          </button>
        </>
      )}
      </div>
    </article>
  );
} 
