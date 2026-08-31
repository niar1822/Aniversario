import { useEffect, useState } from "react";
import "./Recuerdos.css";
import { Link } from "react-router-dom";
type Foto = { src: string; caption?: string };
type Props = { fotos: Foto[] };
export default function Recuerdos({ fotos }: Props) {
  const [rotacion, setRotacion] = useState(0);
  useEffect(() => {
    const intervalo = setInterval(() => {
      setRotacion((actual) => actual + 73);
    }, 2000);
    return () => clearInterval(intervalo);
  }, []);
  return (
    <div className="recuerdos-page">
      {" "}
      <h4 className="recuerdos-titulo"> Nuestros Recuerdos ❤️ </h4>{" "}
      <div className="recuerdos-escena">
        {" "}
        <div
          className="recuerdos-rueda"
          style={{ transform: `rotateY(${rotacion}deg)` }}
        >
          {" "}
          {fotos.map((foto, index) => {
            const angulo = index * (360 / fotos.length);
            return (
              <div
                key={index}
                className="recuerdo-item"
                style={{ transform: `rotateY(${angulo}deg) translateZ(260px)` }}
              >
                {" "}
                <img src={foto.src} alt={`Recuerdo ${index + 1}`} />{" "}
                {foto.caption && (
                  <div className="recuerdo-caption"> {foto.caption} </div>
                )}{" "}
              </div>
            );
          })}
        </div>
      </div>
      <Link to={"/home"} className="btn rounded-4 Atras-btn mt-4">
        Atras
      </Link>
    </div>
  );
}
