import Recuerdos from "../components/recuerdos/Recuerdos";
import AnimatedLoveBackground from "../components/AnimatedLoveBackground";

import image from "../assets/img/image.png";
import image1 from "../assets/img/image1.png";
import image2 from "../assets/img/image2.png";
import image3 from "../assets/img/image3.png";
import image4 from "../assets/img/image4.png";

export default function RecuerdosPage() {
  return (
    <AnimatedLoveBackground>
      <Recuerdos
        fotos={[
          {
            src: image,
            caption: "Nuestra primera cita ❤️",
          },
          {
            src: image1,
            caption: "Tu cumpleaños 🎂",
          },
          {
            src: image2,
            caption: "El viaje a la playa 🌊",
          },
          {
            src: image4,
            caption: "Aquella tarde de lluvia 🌧️",
          },
          {
            src: image3,
            caption: "Navidad juntos 🎄",
          },
        ]}
      />
    </AnimatedLoveBackground>
  );
}
