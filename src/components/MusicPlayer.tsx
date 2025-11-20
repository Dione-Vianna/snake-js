import { useEffect, useRef, useState } from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';

interface MusicPlayerProps {
  src: string;
  initialVolume?: number;
}

export const MusicPlayer = ({ src, initialVolume = 0.3, gameOver, isPaused }: MusicPlayerProps & { gameOver: boolean; isPaused: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = initialVolume;
    audio.loop = true;

    const playAudio = async () => {
      try {
        if (!gameOver && !isPaused) {
          await audio.play();
        }
      } catch (err) {
        console.log('Autoplay prevented:', err);
      }
    };

    playAudio();

    // Add interaction listener to start playing if autoplay was blocked
    const handleInteraction = () => {
      if (audio.paused && !gameOver && !isPaused) {
        playAudio();
      }
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('keydown', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('keydown', handleInteraction);
      audio.pause();
    };
  }, [src, initialVolume, gameOver, isPaused]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (gameOver || isPaused) {
      audio.pause();
    } else {
      // Attempt to resume if not game over and not paused
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Playback prevented:", error);
        });
      }
    }
  }, [gameOver, isPaused]);

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <button
        onClick={toggleMute}
        className="bg-gray-800 p-3 rounded-full text-white hover:bg-gray-700 transition-colors shadow-lg border-2 border-gray-600"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {isMuted ? <FaVolumeMute size={20} /> : <FaVolumeUp size={20} />}
      </button>
      <audio ref={audioRef} src={src} />
    </div>
  );
};
