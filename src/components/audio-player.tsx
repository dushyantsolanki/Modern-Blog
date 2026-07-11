'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import '@videojs/react/audio/skin.css';
import { createPlayer, audioFeatures } from '@videojs/react';
import { AudioSkin, Audio } from '@videojs/react/audio';
import { X } from 'lucide-react';

const Player = createPlayer({ features: audioFeatures });

interface AudioPlayerProps {
  src: string;
  onClose?: () => void;
}

export const AudioPlayer = ({ src, onClose }: AudioPlayerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [controlsTarget, setControlsTarget] = useState<Element | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      // Find the last button group in the controls (which contains the volume/settings)
      const target = containerRef.current.querySelector('.media-controls .media-button-group:last-child');
      if (target) {
        setControlsTarget(target);
      }
    }
  }, []);

  return (
    <div ref={containerRef}>
      <Player.Provider>
        <AudioSkin>
          <Audio src={src} />
        </AudioSkin>

        {controlsTarget && onClose && createPortal(
          <button
            onClick={onClose}
            className="media-button media-button--subtle media-button--icon"
            aria-label="Close audio player"
            style={{ marginLeft: '4px' }}
          >
            <X className="media-icon" size={18} strokeWidth={2.5} />
          </button>,
          controlsTarget
        )}
      </Player.Provider>
    </div>
  );
};
