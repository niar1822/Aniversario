import { useEffect, useMemo, useRef, useState } from 'react';
import './BackgroundMusic.css';

interface BackgroundMusicProps { src: string; autoPlay?: boolean; loop?: boolean; volume?: number; }

function getYouTubeVideoId(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === 'youtu.be') return parsed.pathname.slice(1).split('/')[0] || null;
    if (parsed.hostname.endsWith('youtube.com')) {
      if (parsed.pathname === '/watch') return parsed.searchParams.get('v');
      const [, kind, id] = parsed.pathname.split('/');
      return ['embed', 'shorts', 'live'].includes(kind) ? id || null : null;
    }
  } catch { /* Non-URL input falls back to the native audio player. */ }
  return null;
}

function YouTubeMusic({ videoId, autoPlay, loop, volume }: { videoId: string; autoPlay: boolean; loop: boolean; volume: number }) {
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [playerLoaded, setPlayerLoaded] = useState(false);
  const origin = typeof window === 'undefined' ? '' : window.location.origin;
  const playerUrl = useMemo(() => {
    const parameters = new URLSearchParams({ autoplay: autoPlay ? '1' : '0', mute: '1', controls: '0', enablejsapi: '1', playsinline: '1', rel: '0', origin });
    if (loop) { parameters.set('loop', '1'); parameters.set('playlist', videoId); }
    return `https://www.youtube.com/embed/${videoId}?${parameters}`;
  }, [autoPlay, loop, origin, videoId]);
  const command = (func: string, args: unknown[] = []) => frameRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func, args }), 'https://www.youtube.com');
  useEffect(() => {
    if (!playerLoaded || !hasInteracted) return;
    command('unMute'); command('setVolume', [Math.round(volume * 100)]);
    if (isPlaying) command('playVideo'); else command('pauseVideo');
  }, [hasInteracted, isPlaying, playerLoaded, volume]);
  const togglePlayback = () => {
    setHasInteracted(true); setIsPlaying((playing) => !playing);
  };
  return <div className="youtube-music">
    <iframe ref={frameRef} className="youtube-music__frame" src={playerUrl} title="Reproductor de música de YouTube" allow="autoplay; encrypted-media" onLoad={() => setPlayerLoaded(true)} />
    <button className="youtube-music__button" type="button" onClick={togglePlayback} aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}>{isPlaying ? '❚❚ Pausar música' : '▶ Reproducir música'}</button>
  </div>;
}

function AudioMusic({ src, autoPlay, loop, volume }: Required<BackgroundMusicProps>) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  useEffect(() => { const audio = audioRef.current; if (!audio) return; audio.volume = volume; if (autoPlay) audio.play().then(() => setIsPlaying(true)).catch(() => undefined); }, [autoPlay, src, volume]);
  const togglePlayback = () => { const audio = audioRef.current; if (!audio) return; if (isPlaying) { audio.pause(); setIsPlaying(false); } else { audio.play().then(() => setIsPlaying(true)).catch(() => undefined); } };
  return <div className="youtube-music"><audio ref={audioRef} src={src} loop={loop} onEnded={() => setIsPlaying(false)} /><button className="youtube-music__button" type="button" onClick={togglePlayback}>{isPlaying ? '❚❚ Pausar música' : '▶ Reproducir música'}</button></div>;
}

export default function BackgroundMusic({ src, autoPlay = true, loop = true, volume = .35 }: BackgroundMusicProps) {
  const videoId = getYouTubeVideoId(src);
  const props = { src, autoPlay, loop, volume };
  return videoId ? <YouTubeMusic videoId={videoId} autoPlay={autoPlay} loop={loop} volume={volume} /> : <AudioMusic {...props} />;
}
