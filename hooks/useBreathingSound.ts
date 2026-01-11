/**
 * Tính năng âm thanh đã bị loại bỏ khỏi dự án.
 * File này được giữ lại (trống) để tránh lỗi import cũ nếu có, 
 * nhưng không còn chứa logic xử lý âm thanh.
 */

export const useBreathingSound = () => {
  return {
    isMuted: true,
    toggleMute: () => {},
    playInhale: () => {},
    playExhale: () => {},
    currentAmbient: 'none',
    setAmbient: () => {}
  };
};