import AnimatedLoveBackground from '../components/AnimatedLoveBackground';
import './Sorpresa.css';

export default function SorpresaPage() {
  return (
    <AnimatedLoveBackground>
      <div className="sorpresa-page">
        <div className="sorpresa-content">
          <div className="sorpresa-icon">🎁</div>
          <h1 className="sorpresa-title">¡Sorpresa!</h1>
          <p className="sorpresa-message">
            Aquí estará tu sorpresa especial...
          </p>
          <div className="sorpresa-placeholder">
            <p>💛 Contenido por definir 💛</p>
          </div>
        </div>
      </div>
    </AnimatedLoveBackground>
  );
}