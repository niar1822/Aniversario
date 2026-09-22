import TiempoJuntos from "../components/tiempojuntos/TiempoJuntos";
import AnimatedLoveBackground from "../components/AnimatedLoveBackground";
import BackgroundMusic from "../components/audio/BackgroundMusic";
type Props = {};

export default function Home({}: Props) {
  return (
    <AnimatedLoveBackground>
      <BackgroundMusic
        src="https://www.youtube.com/watch?v=c_lM7xRSUjc&list=RDc_lM7xRSUjc&start_radio=1"
        autoPlay
        loop
        volume={0.35}
      />
      <TiempoJuntos />
    </AnimatedLoveBackground>
  );
}
