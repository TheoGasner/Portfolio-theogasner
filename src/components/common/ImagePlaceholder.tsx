interface ImagePlaceholderProps {
  alt: string;
  width?: number;
  height?: number;
  src?: string;
  className?: string;
}

export function ImagePlaceholder({
  alt,
  width = 800,
  height = 600,
  src,
  className = '',
}: ImagePlaceholderProps) {
  const defaultImages = [
    'photo-1507003211169-0a1dd7228f2d',
    'photo-1494790108377-be9c29b29330',
    'photo-1519389950473-47ba0277781c',
    'photo-1486312338219-ce68d2c6f44d',
    'photo-1535720783033-5c40f9f99910',
    'photo-1461749280684-ddefd3b3e3f7',
    'photo-1539571696357-5a69c006ae23',
    'photo-1517849845537-1d51a20414de',
  ];
  const randomIndex = Math.floor(Math.random() * defaultImages.length);
  const photoId = defaultImages[randomIndex];
  const imgSrc = src || `https://images.unsplash.com/${photoId}?w=${width}&h=${height}&fit=crop`;

  return (
    <div className={`relative overflow-hidden rounded-xl ${className}`}>
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className="w-full h-full object-cover filter brightness-75 contrast-110 saturate-90"
        loading="lazy"
      />
      {/* Halo/glow effect behind */}
      <div className="absolute inset-0 bg-gradient-to-br from-electric-500/20 via-transparent to-neon-600/20 pointer-events-none" />
    </div>
  );
}
