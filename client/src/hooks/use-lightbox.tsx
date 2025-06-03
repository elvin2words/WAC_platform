import { useState, useCallback } from "react";

export interface LightboxItem {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<LightboxItem | null>(null);

  const openLightbox = useCallback((item: LightboxItem) => {
    setCurrentItem(item);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  }, []);

  const closeLightbox = useCallback(() => {
    setIsOpen(false);
    setCurrentItem(null);
    document.body.style.overflow = 'auto';
  }, []);

  return {
    isOpen,
    currentItem,
    openLightbox,
    closeLightbox,
  };
}
