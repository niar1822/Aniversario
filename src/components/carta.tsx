import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";

type Props = {
  texto: string;
};

const REACCIONES = [
  { emoji: "😊", label: "Mi amor está feliz hoy" },
  { emoji: "😢", label: "Mi amor no se siente bien hoy" },
  { emoji: "😐", label: "Mi amor está regular hoy" },
];

export default function Carta({ texto }: Props) {
  const [textoEscrito, setTextoEscrito] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [reaccionEnviada, setReaccionEnviada] = useState<string | null>(null);
  const [errorNotificar, setErrorNotificar] = useState<string | null>(null);

  const notificar = async (reaccion: (typeof REACCIONES)[number]) => {
    if (enviando || reaccionEnviada) return;

    setEnviando(true);
    setErrorNotificar(null);
    try {
      const res = await fetch("/api/notificar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          emoji: reaccion.emoji,
          label: reaccion.label,
        }),
      });

      if (res.ok) {
        setReaccionEnviada(reaccion.emoji);
      } else {
        const data = await res.json().catch(() => null);
        setErrorNotificar(
          `Error ${res.status}: ${data?.error ? JSON.stringify(data.error) : res.statusText}`,
        );
      }
    } catch (e) {
      setErrorNotificar(`Error de red: ${String(e)}`);
    } finally {
      setEnviando(false);
    }
  };

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
          <div className="text-end d-flex justify-content-between mt-4">
            <div className="d-flex flex-column justify-content-end m-0">
              <span className="fw-bold" style={{ color: "#ba0098" }}>
                como estas hoy?
              </span>
              <div className="d-flex justify-content-center align-items-center gap-3 mt-2">
                {REACCIONES.map((r) => (
                  <motion.div
                    key={r.emoji}
                    whileHover={{ scale: 1.2, color: "#ffb54a" }}
                    whileTap={{ scale: 0.8, color: "#ffb54a" }}
                    onClick={() => notificar(r)}
                    style={{
                      cursor: "pointer",
                      opacity:
                        reaccionEnviada && reaccionEnviada !== r.emoji
                          ? 0.4
                          : 1,
                    }}
                    title={r.label}
                  >
                    <span>{r.emoji}</span>
                  </motion.div>
                ))}
              </div>
              {reaccionEnviada && (
                <span
                  className="mt-2"
                  style={{ color: "#ffb54a", fontSize: "0.8rem" }}
                >
                  ¡Le avisaré a Nasser! ❤️
                </span>
              )}
              {errorNotificar && !reaccionEnviada && (
                <span
                  className="mt-2"
                  style={{
                    color: "#ff6b6b",
                    fontSize: "0.75rem",
                    wordBreak: "break-word",
                  }}
                >
                  {errorNotificar}
                </span>
              )}
            </div>

            <div className="d-flex justify-content-start ms-3 gap-2">
              <Link
                to={"/home"}
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#b5426e",
                  fontSize: "1.1rem",
                  fontStyle: "italic",
                }}
              >
                Con amor tu novio ❤️
              </Link>
            </div>
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
