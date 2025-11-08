import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Heart, Moon, Hand } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface PetActionsProps {
  healthState: 'healthy' | 'sick' | 'dead';
  mood: number;
  onMoodChange?: (delta: number) => void;
  onTriggerAnimation?: (animation: 'trick' | 'pet' | 'nap', variant?: number) => void;
  inBackground?: boolean; // New prop to render as part of background
}

export function PetActions({ healthState, mood, onMoodChange, onTriggerAnimation, inBackground = false }: PetActionsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleTrick = () => {
    if (healthState !== 'healthy') return;
    
    // Close menu if in background mode
    if (inBackground) setIsExpanded(false);
    
    // Pick a random trick variant (0-4)
    const trickVariant = Math.floor(Math.random() * 5);
    
    // Trigger animation with variant
    if (onTriggerAnimation) {
      onTriggerAnimation('trick', trickVariant);
    }
    
    // Different messages for different tricks
    const trickMessages = [
      // Variant 0: Spin
      { emoji: '🎪', message: 'Your friend did a spin!', desc: 'Perfect 360° rotation!' },
      // Variant 1: Jump & Flip
      { emoji: '🤸', message: 'Amazing backflip!', desc: 'Stuck the landing!' },
      // Variant 2: Bounce
      { emoji: '🦘', message: 'Bouncy bouncy!', desc: 'So much energy!' },
      // Variant 3: Shake
      { emoji: '💨', message: 'Wiggle wiggle wiggle!', desc: 'Dancing like nobody\'s watching!' },
      // Variant 4: Bow
      { emoji: '🎭', message: 'Takes a graceful bow!', desc: 'What a performer!' },
    ];
    
    const trick = trickMessages[trickVariant];
    toast.success(`${trick.emoji} ${trick.message}`, {
      description: trick.desc,
    });
    
    // Small mood boost
    if (onMoodChange && mood < 5) {
      onMoodChange(0.5);
    }
  };

  const handlePet = () => {
    // Close menu if in background mode
    if (inBackground) setIsExpanded(false);
    
    // Trigger animation
    if (onTriggerAnimation) {
      onTriggerAnimation('pet');
    }
    
    if (healthState === 'healthy') {
      const messages = [
        '💕 Purring contentedly...',
        '😊 Your friend nuzzles your hand',
        '✨ So happy to see you!',
        '❤️ Tail wagging with joy!',
        '🥰 Best friends forever!',
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      toast.success(randomMsg, {
        description: '+1 Mood',
      });
      
      if (onMoodChange && mood < 5) {
        onMoodChange(1);
      }
    } else if (healthState === 'sick') {
      toast.info('🤧 Your friend appreciates the gentle care', {
        description: 'A soft pat makes them feel a bit better',
      });
      
      if (onMoodChange && mood < 5) {
        onMoodChange(0.5);
      }
    } else if (healthState === 'dead') {
      toast('🕊️ A memorial pat...', {
        description: 'You remember the good times together',
      });
    }
  };

  const handleNap = () => {
    if (healthState === 'dead') return;
    
    // Close menu if in background mode
    if (inBackground) setIsExpanded(false);
    
    // Trigger animation
    if (onTriggerAnimation) {
      onTriggerAnimation('nap');
    }
    
    if (healthState === 'healthy') {
      const napMessages = [
        '😴 Settling down for a cozy nap...',
        '💤 Sweet dreams ahead!',
        '🌙 Curled up and drifting off...',
        '☁️ Peaceful slumber time!',
        '✨ Dreaming of adventures...',
      ];
      const randomNap = napMessages[Math.floor(Math.random() * napMessages.length)];
      toast.success(randomNap, {
        description: 'Your friend will rest well',
      });
    } else if (healthState === 'sick') {
      toast.info('🤒 Resting to recover...', {
        description: 'Sleep helps with healing',
      });
    }
  };

  // Determine button states
  const trickEnabled = healthState === 'healthy';
  const petEnabled = true; // Always enabled, different effects per state
  const napEnabled = healthState !== 'dead';

  // If in background mode, render as expandable menu
  if (inBackground) {
    return (
      <div className="relative">
        {/* Main Menu Button - Hand Icon for Pet Interaction */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 border-3 border-black rounded-full flex items-center justify-center retro-shadow cursor-pointer hover:from-purple-500 hover:to-purple-700 relative"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.85 }}
                animate={isExpanded ? { 
                  rotate: [0, -10, 10, -10, 10, 0],
                  transition: { duration: 0.5 }
                } : { 
                  rotate: 0,
                  scale: [1, 1.05, 1],
                }}
                transition={!isExpanded ? {
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                } : {}}
              >
                <Hand className="w-8 h-8 text-white" />
                {/* Pulse ring effect */}
                {!isExpanded && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-3 border-purple-400"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.8, 0, 0.8],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                )}
              </motion.button>
            </TooltipTrigger>
            <TooltipContent className="bg-white border-2 border-black">
              <p>🐾 Play with your friend!</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Expanded Action Buttons */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col gap-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Trick Button */}
              {trickEnabled && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        onClick={handleTrick}
                        className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 border-3 border-black rounded-full flex items-center justify-center retro-shadow hover:from-yellow-500 hover:to-orange-600"
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ delay: 0.05 }}
                      >
                        <Sparkles className="w-6 h-6 text-white" />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white border-2 border-black">
                      <p>✨ Perform a trick!</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}

              {/* Pet Button */}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={handlePet}
                      className={`w-14 h-14 border-3 border-black rounded-full flex items-center justify-center retro-shadow ${
                        healthState === 'healthy'
                          ? 'bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600'
                          : healthState === 'sick'
                          ? 'bg-gradient-to-br from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500'
                          : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
                      }`}
                      whileHover={{ scale: 1.15 }}
                      whileTap={{ scale: 0.85 }}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Heart className="w-6 h-6 text-white" fill={healthState === 'healthy' ? 'currentColor' : 'none'} />
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="bg-white border-2 border-black">
                    {healthState === 'healthy' && <p>❤️ Show some love!</p>}
                    {healthState === 'sick' && <p>💜 Gentle care</p>}
                    {healthState === 'dead' && <p>🕊️ Remember together</p>}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {/* Nap Button */}
              {napEnabled && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <motion.button
                        onClick={handleNap}
                        className={`w-14 h-14 border-3 border-black rounded-full flex items-center justify-center retro-shadow ${
                          healthState === 'healthy'
                            ? 'bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'
                            : 'bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600'
                        }`}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.85 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ delay: 0.15 }}
                      >
                        <Moon className="w-6 h-6 text-white" />
                      </motion.button>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="bg-white border-2 border-black">
                      {healthState === 'healthy' && <p>💤 Rest peacefully</p>}
                      {healthState === 'sick' && <p>😴 Sleep to heal</p>}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Original horizontal layout when not in background
  return (
    <div className="grid grid-cols-3 gap-2">
      {/* Trick Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={handleTrick}
              disabled={!trickEnabled}
              className={`relative border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center retro-shadow transition-all ${
                trickEnabled
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 cursor-pointer'
                  : 'bg-gray-300 cursor-not-allowed opacity-50'
              }`}
              whileHover={trickEnabled ? { scale: 1.05 } : {}}
              whileTap={trickEnabled ? { scale: 0.95 } : {}}
            >
              <Sparkles className={`w-5 h-5 mb-1 ${!trickEnabled && 'opacity-50'}`} />
              <div className={`text-xs font-bold uppercase ${!trickEnabled && 'opacity-50'}`}>
                Trick
              </div>
              {!trickEnabled && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-2xl">🚫</div>
                </div>
              )}
            </motion.button>
          </TooltipTrigger>
          <TooltipContent className="bg-white border-2 border-black">
            {trickEnabled ? (
              <p>Watch your friend perform a trick!</p>
            ) : (
              <p className="text-red-600">Disabled while {healthState}</p>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Pet/Groom Button */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <motion.button
              onClick={handlePet}
              className={`relative border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center retro-shadow transition-all ${
                healthState === 'healthy'
                  ? 'bg-gradient-to-br from-pink-400 to-rose-500 hover:from-pink-500 hover:to-rose-600'
                  : healthState === 'sick'
                  ? 'bg-gradient-to-br from-purple-300 to-purple-400 hover:from-purple-400 hover:to-purple-500'
                  : 'bg-gradient-to-br from-gray-400 to-gray-500 hover:from-gray-500 hover:to-gray-600'
              } cursor-pointer`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Heart className="w-5 h-5 mb-1" fill={healthState === 'healthy' ? 'currentColor' : 'none'} />
              <div className="text-xs font-bold uppercase">
                {healthState === 'dead' ? 'Remember' : 'Pet'}
              </div>
            </motion.button>
          </TooltipTrigger>
          <TooltipContent className="bg-white border-2 border-black">
            {healthState === 'healthy' && <p>Show some love! +1 Mood</p>}
            {healthState === 'sick' && <p>Gentle care and comfort</p>}
            {healthState === 'dead' && <p>A memorial pat to remember</p>}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* Nap Button */}
      {napEnabled && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.button
                onClick={handleNap}
                className={`border-2 border-black rounded-lg p-3 flex flex-col items-center justify-center retro-shadow cursor-pointer ${
                  healthState === 'healthy'
                    ? 'bg-gradient-to-br from-blue-400 to-indigo-500 hover:from-blue-500 hover:to-indigo-600'
                    : 'bg-gradient-to-br from-slate-400 to-slate-500 hover:from-slate-500 hover:to-slate-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Moon className="w-5 h-5 mb-1" />
                <div className="text-xs font-bold uppercase">Nap</div>
              </motion.button>
            </TooltipTrigger>
            <TooltipContent className="bg-white border-2 border-black">
              {healthState === 'healthy' && <p>Let your friend rest peacefully</p>}
              {healthState === 'sick' && <p>Rest to help recovery</p>}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}

      {/* Empty space when nap is hidden (dead state) */}
      {!napEnabled && (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-3 bg-gray-100 opacity-30" />
      )}
    </div>
  );
}
