import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Star, Zap, Heart } from 'lucide-react';

interface EvolutionAnimationProps {
  show: boolean;
  fromStage: number;
  toStage: number;
  stageName: string;
  speciesEmoji: string;
  onComplete: () => void;
}

// Stage names
const STAGE_NAMES = ['Egg', 'Baby', 'Teen', 'Adult', 'Master'];

// Different particle colors and effects for each evolution
const STAGE_EFFECTS = {
  0: { // Egg → Baby
    color: 'from-yellow-400 to-orange-400',
    particles: '🥚',
    secondaryParticles: '✨',
    bgGradient: 'from-yellow-200/30 via-orange-200/30 to-pink-200/30',
  },
  1: { // Baby → Teen
    color: 'from-blue-400 to-cyan-400',
    particles: '💙',
    secondaryParticles: '⭐',
    bgGradient: 'from-blue-200/30 via-cyan-200/30 to-purple-200/30',
  },
  2: { // Teen → Adult
    color: 'from-purple-400 to-pink-400',
    particles: '💜',
    secondaryParticles: '🌟',
    bgGradient: 'from-purple-200/30 via-pink-200/30 to-red-200/30',
  },
  3: { // Adult → Master
    color: 'from-amber-400 to-yellow-400',
    particles: '👑',
    secondaryParticles: '✨',
    bgGradient: 'from-amber-200/30 via-yellow-200/30 to-orange-200/30',
  },
};

export function EvolutionAnimation({
  show,
  fromStage,
  toStage,
  stageName,
  speciesEmoji,
  onComplete,
}: EvolutionAnimationProps) {
  if (!show) return null;

  const effect = STAGE_EFFECTS[toStage as keyof typeof STAGE_EFFECTS] || STAGE_EFFECTS[0];

  // Different particle patterns for each evolution
  const particleCount = toStage === 3 ? 30 : 20; // More particles for Master evolution

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
        onAnimationComplete={() => {
          setTimeout(onComplete, 2500);
        }}
      >
        {/* Background gradient flash */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${effect.bgGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2 }}
        />

        {/* Particle burst - Main particles */}
        {[...Array(particleCount)].map((_, i) => {
          const angle = (i / particleCount) * Math.PI * 2;
          const distance = 150 + Math.random() * 100;
          const endX = Math.cos(angle) * distance;
          const endY = Math.sin(angle) * distance;
          
          return (
            <motion.div
              key={`particle-${i}`}
              className="absolute text-4xl"
              style={{
                left: '50%',
                top: '50%',
                marginLeft: '-20px',
                marginTop: '-20px',
              }}
              initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
              animate={{
                x: endX,
                y: endY,
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
                rotate: [0, 360],
              }}
              transition={{
                duration: 1.5,
                delay: i * 0.02,
                ease: 'easeOut',
              }}
            >
              {i % 2 === 0 ? effect.particles : effect.secondaryParticles}
            </motion.div>
          );
        })}

        {/* Center card with evolution info */}
        <motion.div
          initial={{ scale: 0, rotate: -180, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          exit={{ scale: 0, rotate: 180, opacity: 0 }}
          transition={{ 
            type: 'spring', 
            damping: 15, 
            stiffness: 200,
            delay: 0.3,
          }}
          className="relative z-10 pointer-events-auto"
        >
          <div className={`bg-gradient-to-br ${effect.color} p-8 rounded-3xl border-4 border-black retro-shadow`}>
            {/* Sparkle effects around card */}
            <motion.div
              className="absolute -top-4 -right-4 text-4xl"
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
              }}
            >
              ✨
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -left-4 text-4xl"
              animate={{ 
                rotate: [360, 0],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: 0.5,
              }}
            >
              ⭐
            </motion.div>

            <div className="text-center">
              {/* Species emoji with pulse */}
              <motion.div
                className="text-8xl mb-4"
                animate={{ 
                  scale: [1, 1.2, 1],
                }}
                transition={{ 
                  duration: 1,
                  repeat: 2,
                }}
              >
                {speciesEmoji}
              </motion.div>

              {/* Evolution text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="text-white/90 font-bold text-lg mb-2">
                  Evolution Complete!
                </div>
                <div className="text-white text-4xl font-bold mb-2 drop-shadow-lg">
                  {stageName}
                </div>
                <div className="text-white/90 font-semibold">
                  {STAGE_NAMES[fromStage]} → {STAGE_NAMES[toStage]}
                </div>
              </motion.div>

              {/* Stage-specific message */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-4 text-white/90 text-sm font-semibold"
              >
                {toStage === 0 && "Your egg is hatching! 🐣"}
                {toStage === 1 && "Growing up so fast! 🌱"}
                {toStage === 2 && "Becoming independent! 💪"}
                {toStage === 3 && "Reaching full potential! 👑"}
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Ring expansion effect */}
        <motion.div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-gradient-to-br ${effect.color}`}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 400, 
            height: 400, 
            opacity: 0,
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />

        {/* Secondary ring */}
        <motion.div
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 bg-gradient-to-br ${effect.color}`}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ 
            width: 600, 
            height: 600, 
            opacity: 0,
          }}
          transition={{ duration: 2, ease: 'easeOut', delay: 0.2 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
