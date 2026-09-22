import { useNavigate } from 'react-router-dom';
import AnimatedLoveBackground from '../components/AnimatedLoveBackground';
import BackgroundMusic from '../components/audio/BackgroundMusic';
import FlowerBouquet from '../components/flower-bouquet/FlowerBouquet';
import './Rosas.css';

export default function RosasPage() {
  const navigate = useNavigate();
  return <AnimatedLoveBackground>
    <main className="flowers-page">
      <BackgroundMusic src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" autoPlay loop volume={.35} />
      <FlowerBouquet kind="rose" label="Ramo de siete rosas rosadas" />
      <button className="flowers-page__button" onClick={() => navigate('/sorpresa')}>Ver sorpresa ✨</button>
    </main>
  </AnimatedLoveBackground>;
}
