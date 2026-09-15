import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./TiempoJuntos.css";

type Props = {};

export default function TiempoJuntos({}: Props) {
  const fechaInicio = new Date("2025-02-04T20:00:00");

  const [tiempo, setTiempo] = useState({
    años: 0,
    meses: 0,
    días: 0,
    horas: 0,
    minutos: 0,
    segundos: 0,
  });

  useEffect(() => {
    const actualizarTiempo = () => {
      const ahora = new Date();

      let años = ahora.getFullYear() - fechaInicio.getFullYear();
      let meses = ahora.getMonth() - fechaInicio.getMonth();
      let días = ahora.getDate() - fechaInicio.getDate();
      let horas = ahora.getHours() - fechaInicio.getHours();
      let minutos = ahora.getMinutes() - fechaInicio.getMinutes();
      let segundos = ahora.getSeconds() - fechaInicio.getSeconds();

      if (segundos < 0) {
        segundos += 60;
        minutos--;
      }

      if (minutos < 0) {
        minutos += 60;
        horas--;
      }

      if (horas < 0) {
        horas += 24;
        días--;
      }

      if (días < 0) {
        const ultimoDíaMesAnterior = new Date(
          ahora.getFullYear(),
          ahora.getMonth(),
          0,
        ).getDate();

        días += ultimoDíaMesAnterior;
        meses--;
      }

      if (meses < 0) {
        meses += 12;
        años--;
      }

      setTiempo({
        años,
        meses,
        días,
        horas,
        minutos,
        segundos,
      });
    };

    actualizarTiempo();

    const intervalo = setInterval(actualizarTiempo, 1000);

    return () => clearInterval(intervalo);
  }, []);

  const unidades = [
    { valor: tiempo.años, etiqueta: "Años" },
    { valor: tiempo.meses, etiqueta: "Meses" },
    { valor: tiempo.días, etiqueta: "Días" },
    { valor: tiempo.horas, etiqueta: "Horas" },
    { valor: tiempo.minutos, etiqueta: "Minutos" },
    { valor: tiempo.segundos, etiqueta: "Segundos" },
  ];

  return (
    <div className="tiempo-page d-flex flex-column justify-content-center align-items-center min-vh-100">
      <div className="container text-center">
        <h4 className="tiempo-titulo mb-5">Nuestro Tiempo Juntos ❤️</h4>

        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap">
          {unidades.map(({ valor, etiqueta }) => (
            <div className="tiempo-card text-center p-3" key={etiqueta}>
              <h2 className="mb-0">{valor}</h2>
              <span>{etiqueta}</span>
            </div>
          ))}
        </div>

        <div className="d-flex justify-content-center align-items-center gap-3 flex-wrap mt-5">
          <Link className="btn tiempo-btn rounded-4" to={"/recuerdos"}>
            Ver recuerdos
          </Link>
          <Link className="btn tiempo-btn rounded-4" to={"/carta"}>
            Crear recuerdos
          </Link>
          <Link className="btn tiempo-btn rounded-4" to={"/carta"}>
            Leer carta
          </Link>
        </div>
      </div>
    </div>
  );
}
