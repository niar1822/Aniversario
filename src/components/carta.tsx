import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Props = {
  texto: string;
};

export default function Carta({ texto }: Props) {
  const [textoEscrito, setTextoEscrito] = useState("");

  useEffect(() => {
    setTextoEscrito("");

    let indice = 0;

    const intervalo = setInterval(() => {
      setTextoEscrito(texto.slice(0, indice + 1));
      indice++;

      if (indice >= texto.length) {
        clearInterval(intervalo);
      }
    }, 50);

    return () => clearInterval(intervalo);
  }, [texto]);

  return (
    <div className="container min-vh-100 d-flex justify-content-center align-items-center py-5">
      <div
        className="card border-0 p-3 p-md-4"
        style={{
          width: "100%",
          maxWidth: "650px",
          background: "#150910",
          border: "1.5px solid #ffb54a",
          borderRadius: "32px",
          boxShadow:
            "0 0 10px rgba(255, 181, 74, 0.6), 0 0 45px rgba(255, 90, 30, 0.35)",
        }}
      >
        <div className="card-body">
          {/* Corazón */}
          <div className="text-center mb-3">
            <span
              style={{
                fontSize: "2.5rem",
                filter: "drop-shadow(0 0 8px rgba(255, 181, 74, 0.8))",
              }}
            >
              ❤️
            </span>
          </div>

          {/* Título */}
          <h2
            className="text-center fw-bold mb-4"
            style={{
              fontFamily: "Playfair Display, serif",
              color: "#f2b660",
            }}
          >
            Para ti
          </h2>

          {/* Separador */}
          <div className="d-flex justify-content-center mb-4">
            <div
              style={{
                width: "80px",
                height: "1px",
                background: "#ffb54a",
                boxShadow: "0 0 8px rgba(255, 181, 74, 0.8)",
              }}
            />
          </div>

          {/* Carta */}
          <p
            className="mb-0"
            style={{
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              fontSize: "0.95rem",
              lineHeight: "1.9",
              whiteSpace: "pre-line",
              minHeight: "250px",
            }}
          >
            {textoEscrito}
            <span
              className="ms-1"
              style={{
                color: "#ffb54a",
                animation: "parpadear 0.8s infinite",
              }}
            >
              |
            </span>
          </p>

          {/* Firma */}
          <div className="text-end mt-4">
            <Link
              to={"/home"}
              style={{
                fontFamily: "Playfair Display, serif",
                color: "#b5426e",
                fontSize: "1.1rem",
                fontStyle: "italic",
              }}
            >
              Con todo mi amor ❤️
            </Link>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes parpadear {
            0%, 50% {
              opacity: 1;
            }

            51%, 100% {
              opacity: 0;
            }
          }
        `}
      </style>
    </div>
  );
}
