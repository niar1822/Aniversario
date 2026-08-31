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
            caption: "Foto por la que te conoci❤️",
          },
          {
            src: image1,
            caption: "Foto juntos del 31",
          },
          {
            src: image2,
            caption: "Primer beso del año",
          },
          {
            src: image4,
            caption: "Como sera nuestra familia",
          },
          {
            src: image3,
            caption: "31 antes de salir",
          },
        ]}
      />
    </AnimatedLoveBackground>
  );
}
