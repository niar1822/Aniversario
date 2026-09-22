import { useEffect, useMemo, useRef, useState } from "react";
import "./BackgroundMusic.css";

interface BackgroundMusicProps {
  src: string;
  autoPlay?: boolean;
  loop?: boolean;
  volume?: number;
}

// Obtener el ID de un video de YouTube
function getYouTubeVideoId(url: string): string | null {
  try {
    const parsed = new URL(url);

    if (parsed.hostname === "youtu.be") {
      return parsed.pathname.slice(1).split("/")[0] || null;
    }

    if (parsed.hostname.endsWith("youtube.com")) {
      if (parsed.pathname === "/watch") {
        return parsed.searchParams.get("v");
      }

      const [, kind, id] = parsed.pathname.split("/");

      return ["embed", "shorts", "live"].includes(kind) ? id || null : null;
    }
  } catch {
    // Si no es una URL válida, se utilizará el reproductor de audio normal
  }

  return null;
}

interface YouTubeMusicProps {
  videoId: string;
  autoPlay: boolean;
  loop: boolean;
  volume: number;
}

function YouTubeMusic({ videoId, autoPlay, loop, volume }: YouTubeMusicProps) {
  const frameRef = useRef<HTMLIFrameElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);

  const origin = typeof window === "undefined" ? "" : window.location.origin;

  // URL del reproductor de YouTube
  const playerUrl = useMemo(() => {
    const parameters = new URLSearchParams({
      autoplay: autoPlay ? "1" : "0",

      // YouTube normalmente necesita estar muteado
      // para permitir autoplay.
      mute: "1",

      controls: "0",
      enablejsapi: "1",
      playsinline: "1",
      rel: "0",
      origin,
    });

    if (loop) {
      parameters.set("loop", "1");
      parameters.set("playlist", videoId);
    }

    return `https://www.youtube.com/embed/${videoId}?${parameters.toString()}`;
  }, [autoPlay, loop, origin, videoId]);

  // Enviar comandos al reproductor de YouTube
  const command = (func: string, args: unknown[] = []) => {
    frameRef.current?.contentWindow?.postMessage(
      JSON.stringify({
        event: "command",
        func,
        args,
      }),
      "https://www.youtube.com",
    );
  };

  /*
   * Cuando el reproductor carga:
   * - Intenta reproducir automáticamente.
   * - Si el navegador permite autoplay con sonido,
   *   se reproduce normalmente.
   * - Si lo bloquea, queda preparado para activarse
   *   cuando el usuario interactúe con la página.
   */
  useEffect(() => {
    if (!playerLoaded || !autoPlay) return;

    command("playVideo");
  }, [playerLoaded, autoPlay]);

  /*
   * Primer click/touch de la página.
   *
   * Los navegadores normalmente bloquean autoplay
   * con sonido. Una interacción del usuario permite
   * quitar el mute y comenzar la reproducción.
   */
  useEffect(() => {
    if (!playerLoaded || !autoPlay) return;

    const handleFirstInteraction = () => {
      command("unMute");
      command("setVolume", [
        Math.round(Math.max(0, Math.min(1, volume)) * 100),
      ]);
      command("playVideo");

      setIsPlaying(true);

      document.removeEventListener("click", handleFirstInteraction);

      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);

      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [playerLoaded, autoPlay, volume]);

  // Aplicar volumen
  useEffect(() => {
    if (!playerLoaded) return;

    const safeVolume = Math.round(Math.max(0, Math.min(1, volume)) * 100);

    command("setVolume", [safeVolume]);
  }, [playerLoaded, volume]);

  // Botón manual de reproducción / pausa
  const togglePlayback = () => {
    if (isPlaying) {
      command("pauseVideo");
      setIsPlaying(false);
    } else {
      command("unMute");

      command("setVolume", [
        Math.round(Math.max(0, Math.min(1, volume)) * 100),
      ]);

      command("playVideo");

      setIsPlaying(true);
    }
  };

  return (
    <div className="youtube-music">
      <iframe
        ref={frameRef}
        className="youtube-music__frame"
        src={playerUrl}
        title="Reproductor de música de YouTube"
        allow="autoplay; encrypted-media"
        onLoad={() => setPlayerLoaded(true)}
      />

      <button
        className="youtube-music__button"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? "❚❚ Pausar música" : "▶ Reproducir música"}
      </button>
    </div>
  );
}

// Reproductor para archivos MP3, WAV, OGG, etc.
function AudioMusic({
  src,
  autoPlay,
  loop,
  volume,
}: Required<BackgroundMusicProps>) {
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  // Configuración inicial
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = Math.max(0, Math.min(1, volume));

    audio.loop = loop;

    if (autoPlay) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // El navegador bloqueó el autoplay.
          // Se intentará reproducir después
          // de una interacción.
        });
    }
  }, [autoPlay, loop, src, volume]);

  /*
   * Intentar reproducir el audio después
   * del primer click/touch del usuario.
   */
  useEffect(() => {
    if (!autoPlay) return;

    const handleFirstInteraction = () => {
      const audio = audioRef.current;

      if (!audio) return;

      audio.volume = Math.max(0, Math.min(1, volume));

      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => undefined);

      document.removeEventListener("click", handleFirstInteraction);

      document.removeEventListener("touchstart", handleFirstInteraction);
    };

    document.addEventListener("click", handleFirstInteraction);

    document.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      document.removeEventListener("click", handleFirstInteraction);

      document.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [autoPlay, volume]);

  // Cambiar volumen cuando cambie la prop
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = Math.max(0, Math.min(1, volume));
  }, [volume]);

  // Reproducir / pausar
  const togglePlayback = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => undefined);
    }
  };

  return (
    <div className="youtube-music">
      <audio
        ref={audioRef}
        src={src}
        loop={loop}
        onEnded={() => setIsPlaying(false)}
      />

      <button
        className="youtube-music__button"
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isPlaying ? "❚❚ Pausar música" : "▶ Reproducir música"}
      </button>
    </div>
  );
}

export default function BackgroundMusic({
  src,
  autoPlay = true,
  loop = true,
  volume = 0.35,
}: BackgroundMusicProps) {
  const videoId = getYouTubeVideoId(src);

  if (videoId) {
    return (
      <YouTubeMusic
        videoId={videoId}
        autoPlay={autoPlay}
        loop={loop}
        volume={volume}
      />
    );
  }

  return (
    <AudioMusic src={src} autoPlay={autoPlay} loop={loop} volume={volume} />
  );
}
