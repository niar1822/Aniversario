import React, { useMemo } from "react";

interface Star {
  id: number;
  top: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
}

interface Heart {
  id: number;
  left: number;
  size: number;
  delay: number;
  duration: number;
  opacity: number;
}

const STAR_COUNT = 60;
const HEART_COUNT = 14;

function seededRandom(seed: number) {
  // Generador simple para que las posiciones sean estables entre renders
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

export default function AnimatedLoveBackground({
  children,
}: {
  children?: React.ReactNode;
}) {
  const stars: Star[] = useMemo(
    () =>
      Array.from({ length: STAR_COUNT }).map((_, i) => ({
        id: i,
        top: seededRandom(i * 1.1) * 100,
        left: seededRandom(i * 2.3) * 100,
        size: 1 + seededRandom(i * 3.7) * 2,
        delay: seededRandom(i * 4.9) * 5,
        duration: 2 + seededRandom(i * 5.3) * 3,
      })),
    [],
  );

  const hearts: Heart[] = useMemo(
    () =>
      Array.from({ length: HEART_COUNT }).map((_, i) => ({
        id: i,
        left: seededRandom(i * 7.1) * 100,
        size: 12 + seededRandom(i * 8.3) * 20,
        delay: seededRandom(i * 9.7) * 10,
        duration: 10 + seededRandom(i * 11.3) * 10,
        opacity: 0.15 + seededRandom(i * 13.1) * 0.35,
      })),
    [],
  );

  return (
    <div className="alb-root">
      {/* Estrellas */}
      <div className="alb-stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="alb-star"
            style={{
              top: `${s.top}%`,
              left: `${s.left}%`,
              width: s.size,
              height: s.size,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Corazones flotantes */}
      <div className="alb-hearts">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="alb-heart"
            style={{
              left: `${h.left}%`,
              fontSize: h.size,
              animationDelay: `${h.delay}s`,
              animationDuration: `${h.duration}s`,
              opacity: h.opacity,
            }}
          >
            ♥
          </span>
        ))}
      </div>

      {/* Contenido encima del fondo */}
      <div className="alb-content">{children}</div>

      <style>{`
        .alb-root {
          position: relative;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background:
            radial-gradient(ellipse at top, rgba(255, 0, 130, 0.35), transparent 60%),
            #0a0510;
        }

        .alb-stars,
        .alb-hearts {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .alb-star {
          position: absolute;
          border-radius: 50%;
          background: #fff;
          animation-name: alb-twinkle;
          animation-iteration-count: infinite;
          animation-timing-function: ease-in-out;
        }

        @keyframes alb-twinkle {
          0%, 100% { opacity: 0.15; transform: scale(0.8); }
          50%      { opacity: 1;    transform: scale(1.3); }
        }

        .alb-heart {
          position: absolute;
          bottom: -10%;
          color: #ff2d78;
          filter: drop-shadow(0 0 6px rgba(255, 45, 120, 0.8));
          animation-name: alb-float;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
        }

        @keyframes alb-float {
          0% {
            transform: translateY(0) translateX(0) rotate(0deg);
          }
          50% {
            transform: translateY(-55vh) translateX(15px) rotate(8deg);
          }
          100% {
            transform: translateY(-110vh) translateX(-10px) rotate(-6deg);
          }
        }

        .alb-content {
          position: relative;
          z-index: 1;
        }

        @media (prefers-reduced-motion: reduce) {
          .alb-star, .alb-heart {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}
