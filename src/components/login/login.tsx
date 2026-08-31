import { useState } from "react";
import { motion } from "motion/react";
import { FaDeleteLeft } from "react-icons/fa6";
import { FaLock } from "react-icons/fa";
import { VscCircleFilled } from "react-icons/vsc";

import "./login.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const agregarNumero = (numero: number) => {
    if (pin.length < 6) {
      setPin(pin + numero);
    }
  };

  const borrarNumero = () => {
    setPin(pin.slice(0, -1));
  };

  const verificarPin = (nuevoPin: string) => {
    if (nuevoPin === "040725") {
      navigate("/home");
    }
  };

  const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const manejarNumero = (numero: number) => {
    if (pin.length < 6) {
      const nuevoPin = pin + numero;
      setPin(nuevoPin);
      verificarPin(nuevoPin);
    }
  };

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card shadow p-4 text-center pin-card">
        <div className="card-body">
          <div className="lock-icon">
            <FaLock size={40} />
          </div>
          <h4 className="lock-title">Nuestros recuerdos</h4>
          <h4 className="lock-subtitle mb-3">Introduce nuestra fecha</h4>
          {/* PIN */}
          <div className="d-flex justify-content-center gap-3 mb-4">
            {[0, 1, 2, 3, 4, 5].map((index) => (
              <span key={index} className="pin-value">
                {pin[index] ?? <VscCircleFilled color="#ff7fb0" size={10} />}
              </span>
            ))}
          </div>

          {/* NÚMEROS */}
          <div className="row g-3">
            {numeros.map((numero) => (
              <div className="col-4" key={numero}>
                <motion.button
                  type="button"
                  className="btn btn-light rounded-circle pin-button"
                  onClick={() => manejarNumero(numero)}
                  whileHover={{
                    scale: 1.08,
                    y: -3,
                    backgroundColor: "#cb5656",
                    borderBlockColor: "#d42f2f",
                    color: "#ffffff",
                  }}
                  whileTap={{
                    scale: 0.9,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                >
                  <span>{numero}</span>
                </motion.button>
              </div>
            ))}

            {/* Espacio */}
            <div className="col-4"></div>

            {/* 0 */}
            <div className="col-4">
              <motion.button
                type="button"
                className="btn btn-light rounded-circle pin-button"
                onClick={() => agregarNumero(0)}
                whileHover={{
                  scale: 1.08,
                  y: -3,
                  backgroundColor: "#cb5656",
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <span>0</span>
              </motion.button>
            </div>

            {/* Borrar */}
            <div className="col-4">
              <button
                type="button"
                className="btn btn-light rounded-circle pin-button"
                onClick={borrarNumero}
              >
                <span>
                  <FaDeleteLeft />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
