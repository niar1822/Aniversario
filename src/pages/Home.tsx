import TiempoJuntos from "../components/tiempojuntos/TiempoJuntos";
import AnimatedLoveBackground from "../components/AnimatedLoveBackground";
type Props = {};

export default function Home({}: Props) {
  return (
    <AnimatedLoveBackground>
      <TiempoJuntos />
    </AnimatedLoveBackground>
  );
}
