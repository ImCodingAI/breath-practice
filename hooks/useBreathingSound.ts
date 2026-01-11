import { useRef, useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

export type AmbientType = 'none' | 'rain' | 'forest' | 'fire' | 'stream';

/**
 * Hook quản lý âm thanh cho việc hít thở và nhạc nền.
 * Sử dụng Howler.js để đảm bảo hiệu năng cao.
 */
export const useBreathingSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [currentAmbient, setCurrentAmbient] = useState<AmbientType>('none');
  
  const inhaleSoundRef = useRef<Howl | null>(null);
  const exhaleSoundRef = useRef<Howl | null>(null);
  
  // Ref cho âm thanh nền
  const ambientRainRef = useRef<Howl | null>(null);
  const ambientForestRef = useRef<Howl | null>(null);
  const ambientFireRef = useRef<Howl | null>(null);
  const ambientStreamRef = useRef<Howl | null>(null);

  useEffect(() => {
    // 1. Khởi tạo âm thanh dẫn nhịp
    inhaleSoundRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=meditation-bell-sound-sc-11382.mp3'], 
      volume: 0.5,
      html5: true, 
      preload: true,
    });

    exhaleSoundRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2021/08/09/audio_035c363c46.mp3?filename=sea-waves-12349.mp3'],
      volume: 0.3, 
      html5: true,
      preload: true,
    });

    // 2. Khởi tạo âm thanh nền (Ambient)
    ambientRainRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2022/07/04/audio_3d127b409c.mp3?filename=rain-and-thunder-113372.mp3'],
      volume: 0.2,
      html5: true,
      loop: true,
      preload: true,
    });

    ambientForestRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2021/09/06/audio_3622442d50.mp3?filename=forest-with-small-river-birds-and-nature-field-recording-6735.mp3'],
      volume: 0.2,
      html5: true,
      loop: true,
      preload: true,
    });

    ambientFireRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=fireplace-sound-19259.mp3'],
      volume: 0.2,
      html5: true,
      loop: true,
      preload: true,
    });

    ambientStreamRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2021/08/08/audio_c9a4a1d834.mp3?filename=river-stream-11270.mp3'],
      volume: 0.2,
      html5: true,
      loop: true,
      preload: true,
    });

    return () => {
      inhaleSoundRef.current?.unload();
      exhaleSoundRef.current?.unload();
      ambientRainRef.current?.unload();
      ambientForestRef.current?.unload();
      ambientFireRef.current?.unload();
      ambientStreamRef.current?.unload();
    };
  }, []);

  // Xử lý chuyển đổi Ambient Sound
  useEffect(() => {
    // Dừng tất cả trước
    ambientRainRef.current?.stop();
    ambientForestRef.current?.stop();
    ambientFireRef.current?.stop();
    ambientStreamRef.current?.stop();

    if (isMuted) return;

    if (currentAmbient === 'rain') {
      ambientRainRef.current?.play();
      ambientRainRef.current?.fade(0, 0.2, 1000);
    } else if (currentAmbient === 'forest') {
      ambientForestRef.current?.play();
      ambientForestRef.current?.fade(0, 0.2, 1000);
    } else if (currentAmbient === 'fire') {
      ambientFireRef.current?.play();
      ambientFireRef.current?.fade(0, 0.2, 1000);
    } else if (currentAmbient === 'stream') {
      ambientStreamRef.current?.play();
      ambientStreamRef.current?.fade(0, 0.2, 1000);
    }
  }, [currentAmbient, isMuted]);

  const playInhale = useCallback(() => {
    if (isMuted || !inhaleSoundRef.current) return;
    exhaleSoundRef.current?.stop(); 
    inhaleSoundRef.current.stop();
    inhaleSoundRef.current.play();
    inhaleSoundRef.current.fade(0, 0.5, 500); 
  }, [isMuted]);

  const playExhale = useCallback(() => {
    if (isMuted || !exhaleSoundRef.current) return;
    inhaleSoundRef.current?.stop();
    exhaleSoundRef.current.stop();
    exhaleSoundRef.current.play();
    exhaleSoundRef.current.fade(0, 0.3, 1000); 
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => {
      const newState = !prev;
      if (newState) {
        inhaleSoundRef.current?.stop();
        exhaleSoundRef.current?.stop();
        ambientRainRef.current?.stop();
        ambientForestRef.current?.stop();
        ambientFireRef.current?.stop();
        ambientStreamRef.current?.stop();
      } else {
        // Nếu bật tiếng lại, phát lại ambient nếu đang chọn
        if (currentAmbient === 'rain') ambientRainRef.current?.play();
        if (currentAmbient === 'forest') ambientForestRef.current?.play();
        if (currentAmbient === 'fire') ambientFireRef.current?.play();
        if (currentAmbient === 'stream') ambientStreamRef.current?.play();
      }
      return newState;
    });
  }, [currentAmbient]);

  const setAmbient = useCallback((type: AmbientType) => {
    setCurrentAmbient(type);
  }, []);

  return {
    isMuted,
    toggleMute,
    playInhale,
    playExhale,
    currentAmbient,
    setAmbient
  };
};