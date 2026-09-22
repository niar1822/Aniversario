import AnimatedLoveBackground from "../components/AnimatedLoveBackground";
import BackgroundMusic from "../components/audio/BackgroundMusic";
import FlowerBouquet from "../components/flower-bouquet/FlowerBouquet";

export default function GirasolesPage() {
  return (
    <AnimatedLoveBackground>
      <BackgroundMusic
        src="https://www.youtube.com/watch?v=c_lM7xRSUjc&list=RDc_lM7xRSUjc&start_radio=1"
        autoPlay
        loop
        volume={0.35}
      />
      <FlowerBouquet
        kind="sunflower"
        label="Ramo de siete girasoles amarillos"
      />
    </AnimatedLoveBackground>
  );
}
