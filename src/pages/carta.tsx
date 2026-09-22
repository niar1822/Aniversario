import AnimatedLoveBackground from "../components/AnimatedLoveBackground.tsx";
import BackgroundMusic from "../components/audio/BackgroundMusic.tsx";
import Carta from "../components/carta.tsx";

export default function CartaPage() {
  return (
    <AnimatedLoveBackground>
      <BackgroundMusic
        src="https://www.youtube.com/watch?v=c_lM7xRSUjc&list=RDc_lM7xRSUjc&start_radio=1"
        autoPlay
        loop
        volume={0.35}
      />
      <Carta
        texto={`Rosangel mi amor,
          Te escribo esta carta mas que para expresarte mi amor, es para pedirte perdon por estar lejos de ti por no darte lo que te mereces,
          y sobretodo por no poder estar a tu lado en estos momentos, pero quiero que sepas que te amo con todo mi corazon y que siempre estare pensando en ti.
          perdon por no poderte dar algo material, por no poder darte tus flores amarillas, por ser tan pesimo, de verdad no tengo nada que pueda darte solo mi alma,
          se que no es suficiente pero es lo unico que puedo darte ahora, te prometo que estoy trabajando en algo que hara que estar conmigo de verdad valga la pena.
          Te amo`}
      />
    </AnimatedLoveBackground>
  );
}
