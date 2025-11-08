import { motion } from 'motion/react';
import { HealthState } from '../types/game';

interface PixelPetProps {
  stage: number; // 0-4 evolution stages
  mood: 'happy' | 'neutral' | 'sad';
  isActive: boolean;
  petType?: 'cat' | 'dog';
  healthState?: HealthState;
  currentAnimation?: 'idle' | 'trick' | 'pet' | 'nap' | 'eating';
  trickVariant?: number; // 0-4 for different trick animations
}

// Helper component to render pixel grid
function PixelGrid({ pixels, scale = 6 }: { pixels: string[][]; scale?: number }) {
  const colorMap: Record<string, string> = {
    // Transparent
    '.': 'transparent',
    
    // CAT COLORS (Black & White Tuxedo)
    'K': '#000000', // Black
    'W': '#FFFFFF', // White
    'G': '#90EE90', // Light green (eyes)
    'g': '#228B22', // Dark green (eyes)
    'P': '#FFB6C1', // Pink (nose)
    'p': '#FF69B4', // Hot pink (nose detail)
    
    // DOG COLORS (Patched face with pink polka-dot ears)
    'C': '#FFE4C4', // Cream/beige (body)
    'c': '#F5DEB3', // Wheat (body shading)
    'E': '#FFB6D9', // Pink (ears)
    'e': '#FF99CC', // Light pink (ear detail)
    'O': '#FFA500', // Orange (polka dots)
    'o': '#FF8C00', // Dark orange
    'D': '#2F4F4F', // Dark slate (face patches)
    'd': '#556B2F', // Olive (patch shading)
    'N': '#8B4513', // Brown (nose)
    'n': '#654321', // Dark brown
    'T': '#40E0D0', // Turquoise (collar)
    't': '#20B2AA', // Light sea green
    'B': '#8B4513', // Brown (general)
    
    // SHARED COLORS
    'Y': '#FFD700', // Gold (crown, accessories)
    'y': '#FFA500', // Gold shading
    'R': '#FF0000', // Red
    'M': '#9932CC', // Purple (mystical)
    'm': '#8B008B', // Magenta
    'S': '#C0C0C0', // Silver
  };

  return (
    <div 
      className="inline-grid pixel-art"
      style={{
        gridTemplateColumns: `repeat(${pixels[0].length}, ${scale}px)`,
        gap: 0,
      }}
    >
      {pixels.flat().map((pixel, i) => (
        <div
          key={i}
          style={{
            width: `${scale}px`,
            height: `${scale}px`,
            backgroundColor: colorMap[pixel] || 'transparent',
          }}
        />
      ))}
    </div>
  );
}

export function PixelPet({ stage, mood, isActive, petType = 'cat', healthState = 'healthy', currentAnimation = 'idle', trickVariant = 0 }: PixelPetProps) {
  // Apply health state visual effects
  const getHealthFilter = () => {
    if (healthState === 'sick') {
      return 'saturate(0.9) brightness(0.95)'; // 10% desaturation
    } else if (healthState === 'dead') {
      return 'grayscale(1) opacity(0.7)'; // Grayscale ghost effect
    }
    return 'none';
  };

  // Get animation variants based on current animation
  const getAnimationVariants = () => {
    switch (currentAnimation) {
      case 'trick':
        // Multiple trick variations based on trickVariant
        switch (trickVariant) {
          case 0: // Spin
            return {
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              transition: { duration: 0.8, ease: 'easeInOut' }
            };
          case 1: // Jump & Flip
            return {
              y: [0, -60, -50, -60, 0],
              rotate: [0, 0, 180, 360, 360],
              scale: [1, 1.1, 1.15, 1.1, 1],
              transition: { duration: 1, ease: 'easeInOut' }
            };
          case 2: // Bounce
            return {
              y: [0, -20, 0, -15, 0, -10, 0],
              scale: [1, 1.05, 1, 1.05, 1, 1.03, 1],
              transition: { duration: 0.9, ease: 'easeOut' }
            };
          case 3: // Shake/Wiggle
            return {
              rotate: [0, -15, 15, -15, 15, -10, 10, 0],
              x: [0, -5, 5, -5, 5, -3, 3, 0],
              transition: { duration: 0.7, ease: 'easeInOut' }
            };
          case 4: // Wave/Bow
            return {
              rotate: [0, -20, -25, -20, 0],
              y: [0, 5, 10, 5, 0],
              transition: { duration: 1.2, ease: 'easeInOut' }
            };
          default:
            return {
              rotate: [0, 360],
              scale: [1, 1.2, 1],
              transition: { duration: 0.8, ease: 'easeInOut' }
            };
        }
      case 'pet':
        return {
          y: [0, -10, 0, -5, 0],
          scale: [1, 1.05, 1],
          transition: { duration: 0.6, ease: 'easeInOut' }
        };
      case 'nap':
        return {
          rotate: [0, -5, 0],
          opacity: [1, 0.8, 1],
          transition: { duration: 1.5, ease: 'easeInOut', repeat: 2 }
        };
      case 'eating':
        return {
          scale: [1, 1.1, 1, 1.05, 1],
          y: [0, -5, 0, -3, 0],
          rotate: [0, -2, 2, -1, 0],
          transition: { duration: 0.8, ease: 'easeInOut', repeat: 2 }
        };
      default:
        return {};
    }
  };

  // BLACK & WHITE TUXEDO CAT DESIGNS (Based on reference image)
  const getCatDesign = () => {
    switch (stage) {
      case 0: // Egg - Black & white pattern hint
        return [
          ['.', '.', 'K', 'K', 'K', 'K', 'K', 'K', '.', '.'],
          ['.', 'K', 'K', 'W', 'W', 'W', 'W', 'K', 'K', '.'],
          ['K', 'K', 'W', 'W', 'K', 'K', 'W', 'W', 'K', 'K'],
          ['K', 'W', 'W', 'K', 'K', 'K', 'K', 'W', 'W', 'K'],
          ['K', 'W', 'K', 'K', 'K', 'K', 'K', 'K', 'W', 'K'],
          ['K', 'W', 'K', 'K', 'K', 'K', 'K', 'K', 'W', 'K'],
          ['K', 'W', 'W', 'K', 'K', 'K', 'K', 'W', 'W', 'K'],
          ['K', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K'],
          ['.', 'K', 'K', 'W', 'W', 'W', 'W', 'K', 'K', '.'],
          ['.', '.', 'K', 'K', 'K', 'K', 'K', 'K', '.', '.'],
        ];
      
      case 1: // Baby Kitten - Small tuxedo
        return [
          ['K', '.', '.', '.', '.', '.', '.', '.', 'K', '.'],
          ['K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K'],
          ['K', 'K', 'G', 'K', 'K', 'K', 'G', 'K', 'K', 'K'],
          ['K', 'K', 'g', 'K', 'K', 'K', 'g', 'K', 'K', 'K'],
          ['.', 'K', 'K', 'K', 'P', 'P', 'K', 'K', 'K', '.'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'K', '.'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'K', '.'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'K', '.', '.'],
          ['.', 'K', 'W', 'K', '.', '.', 'K', 'W', 'K', '.'],
          ['.', 'K', 'K', '.', '.', '.', '.', 'K', 'K', '.'],
        ];
      
      case 2: // Teen Cat - Sitting position
        return [
          ['K', '.', '.', '.', '.', '.', '.', '.', '.', 'K', '.', '.'],
          ['K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', '.'],
          ['K', 'K', 'G', 'K', 'K', 'K', 'K', 'G', 'K', 'K', 'K', '.'],
          ['K', 'K', 'g', 'G', 'K', 'K', 'g', 'G', 'K', 'K', 'K', '.'],
          ['.', 'K', 'K', 'K', 'K', 'P', 'K', 'K', 'K', 'K', '.', '.'],
          ['.', 'K', 'K', 'K', 'P', 'p', 'P', 'K', 'K', 'K', '.', '.'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', '.', '.'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'K', '.', '.', '.'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K'],
          ['.', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'K', 'K'],
          ['.', 'K', 'K', '.', 'K', 'K', 'K', 'K', '.', 'K', 'K', '.'],
        ];
      
      case 3: // Adult Cat - Laying down like reference
        return [
          ['K', '.', '.', '.', '.', '.', '.', '.', '.', '.', 'K', '.', '.', '.'],
          ['K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', '.', '.'],
          ['K', 'K', 'G', 'g', 'K', 'K', 'K', 'G', 'g', 'K', 'K', 'K', '.', '.'],
          ['K', 'K', 'G', 'G', 'K', 'K', 'K', 'G', 'G', 'K', 'K', 'K', '.', '.'],
          ['.', 'K', 'K', 'K', 'K', 'P', 'P', 'K', 'K', 'K', 'K', '.', '.', '.'],
          ['.', 'K', 'W', 'W', 'W', 'P', 'P', 'W', 'W', 'W', 'K', '.', '.', '.'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K', 'K'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K'],
          ['K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'K'],
          ['K', 'K', '.', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', '.'],
        ];
      
      case 4: // Master Cat - Majestic with crown
        return [
          ['.', '.', '.', 'Y', '.', 'Y', '.', 'Y', '.', '.', '.', '.', '.', '.'],
          ['.', '.', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '.', '.', '.', '.', '.'],
          ['K', '.', '.', 'Y', 'Y', 'Y', 'Y', 'Y', '.', '.', 'K', '.', '.', '.'],
          ['K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', '.', '.'],
          ['K', 'K', 'M', 'G', 'K', 'K', 'K', 'M', 'G', 'K', 'K', 'K', '.', '.'],
          ['K', 'K', 'G', 'G', 'K', 'K', 'K', 'G', 'G', 'K', 'K', 'K', '.', '.'],
          ['.', 'K', 'K', 'K', 'K', 'P', 'P', 'K', 'K', 'K', 'K', '.', '.', '.'],
          ['.', 'K', 'W', 'W', 'W', 'p', 'p', 'W', 'W', 'W', 'K', 'Y', '.', '.'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'K', 'K'],
          ['.', '.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K', 'M'],
          ['.', 'K', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'W', 'K', 'K', 'K'],
          ['K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'W', 'K', 'K'],
          ['K', 'K', '.', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', 'K', '.'],
        ];
      
      default:
        return getCatDesign();
    }
  };

  // PATCHED DOG DESIGNS (Pink polka-dot ears, patched face)
  const getDogDesign = () => {
    switch (stage) {
      case 0: // Egg - Cream with pink/orange spots
        return [
          ['.', '.', 'K', 'K', 'K', 'K', 'K', 'K', '.', '.'],
          ['.', 'K', 'C', 'C', 'E', 'E', 'C', 'C', 'K', '.'],
          ['K', 'C', 'C', 'E', 'O', 'E', 'C', 'C', 'C', 'K'],
          ['K', 'C', 'E', 'E', 'C', 'C', 'E', 'O', 'C', 'K'],
          ['K', 'C', 'C', 'C', 'C', 'C', 'C', 'E', 'C', 'K'],
          ['K', 'C', 'O', 'C', 'C', 'C', 'C', 'C', 'C', 'K'],
          ['K', 'C', 'C', 'C', 'E', 'C', 'C', 'C', 'C', 'K'],
          ['K', 'C', 'C', 'C', 'C', 'C', 'O', 'C', 'C', 'K'],
          ['.', 'K', 'C', 'C', 'C', 'C', 'C', 'C', 'K', '.'],
          ['.', '.', 'K', 'K', 'K', 'K', 'K', 'K', '.', '.'],
        ];
      
      case 1: // Baby Puppy - Small with big ears
        return [
          ['.', 'E', 'E', '.', '.', '.', '.', 'E', 'E', '.'],
          ['E', 'E', 'O', 'E', '.', '.', 'E', 'O', 'E', 'E'],
          ['E', 'E', 'E', 'K', 'K', 'K', 'K', 'E', 'E', 'E'],
          ['.', 'K', 'D', 'D', 'C', 'C', 'D', 'D', 'K', '.'],
          ['.', 'K', 'D', 'C', 'C', 'C', 'C', 'D', 'K', '.'],
          ['.', '.', 'K', 'C', 'K', 'K', 'C', 'K', '.', '.'],
          ['.', '.', 'K', 'N', 'N', 'N', 'N', 'K', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'C', 'K', '.', '.'],
          ['.', 'K', 'C', 'K', '.', '.', 'K', 'C', 'K', '.'],
          ['.', 'K', 'K', '.', '.', '.', '.', 'K', 'K', '.'],
        ];
      
      case 2: // Teen Dog - Sitting with collar
        return [
          ['.', 'E', 'E', '.', '.', '.', '.', '.', 'E', 'E', '.', '.'],
          ['E', 'E', 'O', 'E', '.', '.', '.', 'E', 'O', 'E', 'E', '.'],
          ['E', 'E', 'E', 'E', 'K', 'K', 'K', 'E', 'E', 'E', 'E', '.'],
          ['.', 'K', 'D', 'D', 'D', 'C', 'D', 'D', 'D', 'K', '.', '.'],
          ['.', 'K', 'D', 'D', 'C', 'C', 'C', 'D', 'D', 'K', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'K', 'C', 'C', 'K', '.', '.', '.'],
          ['.', '.', 'K', 'N', 'N', 'N', 'N', 'N', 'K', '.', '.', '.'],
          ['.', '.', 'K', 'T', 'T', 'T', 'T', 'T', 'K', '.', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.'],
          ['.', 'K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', '.', '.'],
          ['.', 'K', 'K', '.', 'K', 'K', 'K', 'K', '.', 'K', 'K', '.'],
        ];
      
      case 3: // Adult Dog - Full body
        return [
          ['.', 'E', 'E', 'E', '.', '.', '.', '.', '.', 'E', 'E', 'E', '.', '.'],
          ['E', 'E', 'O', 'E', 'E', '.', '.', '.', 'E', 'O', 'E', 'E', '.', '.'],
          ['E', 'E', 'E', 'E', 'E', 'K', 'K', 'K', 'E', 'E', 'E', 'E', '.', '.'],
          ['.', 'K', 'D', 'D', 'D', 'D', 'C', 'D', 'D', 'D', 'K', '.', '.', '.'],
          ['.', 'K', 'D', 'D', 'C', 'C', 'C', 'C', 'D', 'D', 'K', '.', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'K', 'C', 'C', 'K', '.', '.', '.', '.'],
          ['.', '.', 'K', 'C', 'N', 'N', 'N', 'N', 'C', 'K', '.', '.', '.', '.'],
          ['.', '.', 'K', 'T', 'T', 'T', 'T', 'T', 'T', 'K', '.', '.', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.', '.'],
          ['.', 'K', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.'],
          ['.', 'K', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.'],
          ['K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', '.'],
          ['K', 'B', 'K', 'K', 'K', 'B', 'K', 'K', 'K', 'B', 'K', 'K', 'K', 'B'],
        ];
      
      case 4: // Master Dog - With crown and cape
        return [
          ['.', '.', 'Y', '.', 'Y', '.', 'Y', '.', 'Y', '.', '.', '.', '.', '.'],
          ['.', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', 'Y', '.', '.', '.', '.'],
          ['.', 'E', 'E', 'Y', 'Y', 'Y', 'Y', 'Y', 'E', 'E', 'E', '.', '.', '.'],
          ['E', 'E', 'O', 'E', 'E', '.', '.', 'E', 'O', 'E', 'E', '.', '.', '.'],
          ['E', 'E', 'E', 'E', 'E', 'K', 'K', 'E', 'E', 'E', 'E', '.', '.', '.'],
          ['.', 'K', 'D', 'D', 'D', 'D', 'D', 'D', 'D', 'K', '.', 'M', '.', '.'],
          ['.', 'K', 'D', 'D', 'C', 'C', 'C', 'D', 'D', 'K', '.', 'M', 'M', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'K', 'C', 'K', '.', 'M', 'M', 'M', '.'],
          ['.', '.', 'K', 'N', 'N', 'N', 'N', 'N', 'K', '.', '.', 'M', 'M', '.'],
          ['.', '.', 'K', 'Y', 'T', 'T', 'T', 'Y', 'K', '.', '.', 'M', '.', '.'],
          ['.', '.', 'K', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.', '.', '.'],
          ['.', 'K', 'C', 'C', 'C', 'C', 'C', 'C', 'C', 'K', '.', '.', '.', '.'],
          ['K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', 'C', 'K', '.', '.', '.'],
          ['K', 'B', 'K', 'K', 'K', 'B', 'K', 'K', 'K', 'B', 'K', 'K', '.', '.'],
        ];
      
      default:
        return getDogDesign();
    }
  };

  const pixels = petType === 'cat' ? getCatDesign() : getDogDesign();

  return (
    <div className="relative">
      <motion.div
        className={`${isActive && currentAnimation === 'idle' ? 'animate-float' : ''} ${healthState === 'dead' ? 'animate-pulse-glow' : ''}`}
        whileHover={{ scale: healthState !== 'dead' ? 1.05 : 1.02 }}
        whileTap={{ scale: healthState !== 'dead' ? 0.95 : 1.0 }}
        style={{ filter: getHealthFilter() }}
        animate={currentAnimation !== 'idle' ? getAnimationVariants() : {}}
        key={`${currentAnimation}-${trickVariant}`} // Force re-animation when animation or variant changes
      >
        <PixelGrid pixels={pixels} scale={6} />
      
        {/* Animation Effects */}
        {currentAnimation === 'trick' && (
          <>
            {/* Sparkle particles for Spin (variant 0) */}
            {trickVariant === 0 && [...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                }}
                initial={{ opacity: 1, scale: 0 }}
                animate={{
                  opacity: 0,
                  scale: 2,
                  x: Math.cos((i / 6) * Math.PI * 2) * 50,
                  y: Math.sin((i / 6) * Math.PI * 2) * 50,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
              />
            ))}
            
            {/* Stars for Jump & Flip (variant 1) */}
            {trickVariant === 1 && [...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${25 + i * 17}%`,
                  top: '10%',
                }}
                initial={{ opacity: 0, scale: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  scale: [0, 1.2, 1, 0.8],
                  rotate: [0, 180]
                }}
                transition={{ duration: 0.8, delay: i * 0.15 }}
              >
                ⭐
              </motion.div>
            ))}
            
            {/* Impact lines for Bounce (variant 2) */}
            {trickVariant === 2 && (
              <>
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute h-1 bg-orange-400 rounded-full"
                    style={{
                      left: '20%',
                      bottom: '0%',
                      width: '60%',
                    }}
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ 
                      scaleX: [0, 1, 0],
                      opacity: [0, 0.8, 0]
                    }}
                    transition={{ 
                      duration: 0.3,
                      delay: 0.3 * i,
                    }}
                  />
                ))}
              </>
            )}
            
            {/* Motion lines for Shake (variant 3) */}
            {trickVariant === 3 && [...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: i % 2 === 0 ? '-15%' : '105%',
                  top: `${20 + i * 12}%`,
                }}
                initial={{ opacity: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 0.7, 0],
                  x: i % 2 === 0 ? [-10, 0] : [10, 0],
                }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                💨
              </motion.div>
            ))}
            
            {/* Bow sparkles for Wave/Bow (variant 4) */}
            {trickVariant === 4 && [...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  left: `${35 + i * 15}%`,
                  bottom: '80%',
                }}
                initial={{ opacity: 0, y: 0, rotate: 0 }}
                animate={{ 
                  opacity: [0, 1, 0],
                  y: -20,
                  rotate: 360
                }}
                transition={{ duration: 1, delay: i * 0.2 }}
              >
                ✨
              </motion.div>
            ))}
          </>
        )}
        
        {currentAnimation === 'pet' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-2xl"
                style={{
                  left: `${30 + i * 20}%`,
                  top: '-20%',
                }}
                initial={{ opacity: 0, y: 0 }}
                animate={{ opacity: [0, 1, 0], y: -30 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
              >
                ❤️
              </motion.div>
            ))}
          </>
        )}
        
        {currentAnimation === 'nap' && (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-xl"
                style={{
                  right: '-20%',
                  top: `${20 + i * 15}%`,
                }}
                initial={{ opacity: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0],
                  x: [0, 10, 20],
                }}
                transition={{ 
                  duration: 1.5,
                  delay: i * 0.5,
                  repeat: 1,
                }}
              >
                💤
              </motion.div>
            ))}
          </>
        )}
      
        {/* Health state overlay indicator */}
        {healthState === 'sick' && (
          <motion.div 
            className="absolute -top-2 -right-2 bg-amber-400 border-2 border-black rounded-full w-6 h-6 flex items-center justify-center"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            <span className="text-xs">🤒</span>
          </motion.div>
        )}
        {healthState === 'dead' && (
          <motion.div 
            className="absolute -top-2 -right-2 bg-gray-700 border-2 border-black rounded-full w-6 h-6 flex items-center justify-center"
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <span className="text-xs">👻</span>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
