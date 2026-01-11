import { useRef, useState, useEffect, useCallback } from 'react';
import { Howl } from 'howler';

/**
 * Hook quản lý âm thanh cho việc hít thở.
 * Sử dụng Howler.js để đảm bảo hiệu năng cao và độ trễ thấp.
 */
export const useBreathingSound = () => {
  const [isMuted, setIsMuted] = useState(false);
  
  // Sử dụng useRef để giữ instance của Howl không bị khởi tạo lại mỗi lần render
  const inhaleSoundRef = useRef<Howl | null>(null);
  const exhaleSoundRef = useRef<Howl | null>(null);

  useEffect(() => {
    // Khởi tạo âm thanh
    // Sử dụng URL placeholder từ nguồn mở
    
    // Âm thanh Hít vào: Tiếng chuông ngân nhẹ (Singing Bowl / Soft Bell)
    inhaleSoundRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73467.mp3?filename=meditation-bell-sound-sc-11382.mp3'], 
      volume: 0.5,
      html5: true, 
      preload: true,
    });

    // Âm thanh Thở ra: Tiếng sóng rút hoặc gió nhẹ (Soft Wind / Ocean)
    exhaleSoundRef.current = new Howl({
      src: ['https://cdn.pixabay.com/download/audio/2021/08/09/audio_035c363c46.mp3?filename=sea-waves-12349.mp3'],
      volume: 0.3, 
      html5: true,
      preload: true,
    });

    return () => {
      // Cleanup khi unmount
      inhaleSoundRef.current?.unload();
      exhaleSoundRef.current?.unload();
    };
  }, []);

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
      }
      return newState;
    });
  }, []);

  return {
    isMuted,
    toggleMute,
    playInhale,
    playExhale
  };
};