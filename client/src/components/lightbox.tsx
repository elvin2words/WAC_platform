import { X } from "lucide-react";
import { LightboxItem } from "@/hooks/use-lightbox";

interface LightboxProps {
  isOpen: boolean;
  item: LightboxItem | null;
  onClose: () => void;
}

export function Lightbox({ isOpen, item, onClose }: LightboxProps) {
  if (!isOpen || !item) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="relative max-w-4xl w-full">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl hover:text-neon-blue transition-colors duration-300 z-10"
        >
          <X size={24} />
        </button>
        <img
          src={item.imageUrl}
          alt={item.title}
          className="w-full h-auto rounded-lg max-h-[80vh] object-contain"
        />
        <div className="absolute bottom-4 left-4 right-4 text-center">
          <h3 className="font-semibold text-lg mb-2 text-white">{item.title}</h3>
          <p className="text-gray-300">{item.description}</p>
        </div>
      </div>
    </div>
  );
}
