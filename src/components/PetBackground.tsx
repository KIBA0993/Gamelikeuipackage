import { motion } from 'motion/react';
import { useMemo } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface PetBackgroundProps {
  stage: number; // 0-4 evolution stages
  petActionsMenu?: React.ReactNode; // Optional actions menu to render in background
  fullness?: number; // Pet's fullness level
  mood?: number; // Pet's mood level
  onFeedClick?: () => void; // Callback for feed button
  onSettingsClick?: () => void; // Callback for settings button
  onStageClick?: () => void; // Callback for stage icon click
  stageName?: string; // Name of current evolution stage
  speciesEmoji?: string; // Species emoji (🐱 or 🐶)
  totalStages?: number; // Total number of stages
  feedingAnimation?: { active: boolean; foodEmoji: string; variant: number }; // Feeding animation state
}

type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

export function PetBackground({ stage, petActionsMenu, fullness, mood, onFeedClick, onSettingsClick, onStageClick, stageName, speciesEmoji, totalStages = 5, feedingAnimation }: PetBackgroundProps) {
  // Get current time of day
  const timeOfDay = useMemo((): TimeOfDay => {
    const hour = new Date().getHours();
    
    if (hour >= 6 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 18) return 'afternoon';
    if (hour >= 18 && hour < 21) return 'evening';
    return 'night';
  }, []);

  // Get background colors based on time of day
  const getBackgroundColors = () => {
    switch (timeOfDay) {
      case 'morning':
        return {
          sky: 'from-sky-300 via-sky-200 to-orange-100',
          ground: 'from-green-400 to-green-500',
          accent: '#FFD700', // Gold
        };
      case 'afternoon':
        return {
          sky: 'from-blue-400 via-sky-300 to-cyan-200',
          ground: 'from-green-500 to-green-600',
          accent: '#FFA500', // Orange
        };
      case 'evening':
        return {
          sky: 'from-purple-400 via-pink-300 to-orange-200',
          ground: 'from-green-600 to-green-700',
          accent: '#FF69B4', // Hot pink
        };
      case 'night':
        return {
          sky: 'from-indigo-900 via-purple-900 to-indigo-800',
          ground: 'from-green-800 to-green-900',
          accent: '#E6E6FA', // Lavender
        };
    }
  };

  const colors = getBackgroundColors();

  // Render stage-specific decorations
  const renderDecorations = () => {
    switch (stage) {
      case 0: // Egg stage - minimal decoration
        return (
          <>
            {/* Simple grass tufts */}
            <div className="absolute bottom-32 left-8 w-2 h-3 bg-green-600 rounded-t-full" />
            <div className="absolute bottom-32 right-12 w-2 h-3 bg-green-600 rounded-t-full" />
          </>
        );
      
      case 1: // Baby - small flowers
        return (
          <>
            {/* Grass tufts */}
            <div className="absolute bottom-32 left-6 w-2 h-4 bg-green-600 rounded-t-full" />
            <div className="absolute bottom-32 left-12 w-2 h-3 bg-green-700 rounded-t-full" />
            <div className="absolute bottom-32 right-16 w-2 h-4 bg-green-600 rounded-t-full" />
            <div className="absolute bottom-32 right-8 w-2 h-3 bg-green-700 rounded-t-full" />
            
            {/* Small flowers */}
            <div className="absolute bottom-34 left-20 flex flex-col items-center">
              <div className="w-3 h-3 bg-pink-400 rounded-full border border-pink-600" />
              <div className="w-0.5 h-3 bg-green-600" />
            </div>
            <div className="absolute bottom-34 right-24 flex flex-col items-center">
              <div className="w-3 h-3 bg-yellow-400 rounded-full border border-yellow-600" />
              <div className="w-0.5 h-3 bg-green-600" />
            </div>
          </>
        );
      
      case 2: // Teen - more flowers and small tree
        return (
          <>
            {/* Small tree on left */}
            <div className="absolute bottom-36 left-4 flex flex-col items-center">
              <div className="w-8 h-8 bg-green-600 rounded-full border-2 border-green-800" />
              <div className="w-2 h-6 bg-amber-700 border border-amber-900" />
            </div>
            
            {/* Multiple flowers */}
            <div className="absolute bottom-34 left-16 flex flex-col items-center">
              <div className="w-4 h-4 bg-red-400 rounded-full border border-red-600" />
              <div className="w-0.5 h-4 bg-green-600" />
            </div>
            <div className="absolute bottom-36 left-28 flex flex-col items-center">
              <div className="w-3 h-3 bg-blue-400 rounded-full border border-blue-600" />
              <div className="w-0.5 h-3 bg-green-600" />
            </div>
            <div className="absolute bottom-34 right-20 flex flex-col items-center">
              <div className="w-4 h-4 bg-purple-400 rounded-full border border-purple-600" />
              <div className="w-0.5 h-4 bg-green-600" />
            </div>
            <div className="absolute bottom-35 right-8 flex flex-col items-center">
              <div className="w-3 h-3 bg-pink-400 rounded-full border border-pink-600" />
              <div className="w-0.5 h-3 bg-green-600" />
            </div>
            
            {/* Grass */}
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-32 w-2 h-3 bg-green-700 rounded-t-full"
                style={{ left: `${15 + i * 12}%` }}
              />
            ))}
          </>
        );
      
      case 3: // Adult - full garden
        return (
          <>
            {/* Trees on both sides */}
            <div className="absolute bottom-36 left-2 flex flex-col items-center">
              <div className="w-10 h-10 bg-green-600 rounded-full border-2 border-green-800" />
              <div className="w-3 h-8 bg-amber-700 border-2 border-amber-900" />
            </div>
            <div className="absolute bottom-40 right-2 flex flex-col items-center">
              <div className="w-12 h-12 bg-green-700 rounded-full border-2 border-green-900" />
              <div className="w-3 h-10 bg-amber-800 border-2 border-amber-900" />
            </div>
            
            {/* Bush in corner */}
            <div className="absolute bottom-32 left-16">
              <div className="w-8 h-6 bg-green-500 rounded-t-full border-2 border-green-700" />
            </div>
            
            {/* Flowers */}
            {[
              { bottom: '10', left: '25', color: 'rose' },
              { bottom: '12', left: '35', color: 'yellow' },
              { bottom: '10', left: '45', color: 'purple' },
              { bottom: '11', right: '30', color: 'blue' },
              { bottom: '10', right: '18', color: 'pink' },
            ].map((flower, i) => (
              <div
                key={i}
                className="absolute flex flex-col items-center"
                style={{
                  bottom: flower.bottom + '%',
                  left: flower.left ? flower.left + '%' : undefined,
                  right: flower.right ? flower.right + '%' : undefined,
                }}
              >
                <div className={`w-4 h-4 bg-${flower.color}-400 rounded-full border-2 border-${flower.color}-600`} />
                <div className="w-1 h-4 bg-green-600" />
              </div>
            ))}
            
            {/* Grass patches */}
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-32 w-2 h-4 bg-green-700 rounded-t-full"
                style={{ left: `${10 + i * 10}%` }}
              />
            ))}
          </>
        );
      
      case 4: // Master - magical garden with sparkles
        return (
          <>
            {/* Magical trees with glow */}
            <motion.div 
              className="absolute bottom-36 left-1 flex flex-col items-center"
              animate={{ 
                filter: ['drop-shadow(0 0 8px rgba(147, 51, 234, 0.5))', 'drop-shadow(0 0 12px rgba(147, 51, 234, 0.8))', 'drop-shadow(0 0 8px rgba(147, 51, 234, 0.5))']
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full border-2 border-purple-900" />
              <div className="w-3 h-10 bg-gradient-to-b from-amber-700 to-amber-900 border-2 border-amber-950" />
            </motion.div>
            <motion.div 
              className="absolute bottom-40 right-1 flex flex-col items-center"
              animate={{ 
                filter: ['drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))', 'drop-shadow(0 0 12px rgba(236, 72, 153, 0.8))', 'drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))']
              }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            >
              <div className="w-14 h-14 bg-gradient-to-br from-pink-500 to-pink-700 rounded-full border-2 border-pink-900" />
              <div className="w-3 h-12 bg-gradient-to-b from-amber-800 to-amber-950 border-2 border-black" />
            </motion.div>
            
            {/* Golden bushes */}
            <div className="absolute bottom-32 left-20">
              <div className="w-10 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-full border-2 border-yellow-700" />
            </div>
            <div className="absolute bottom-32 right-24">
              <div className="w-8 h-6 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-t-full border-2 border-yellow-700" />
            </div>
            
            {/* Magical flowers with glow */}
            {[
              { bottom: '12', left: '28', color: 'from-rose-400 to-rose-600', delay: 0 },
              { bottom: '14', left: '38', color: 'from-amber-400 to-amber-600', delay: 0.3 },
              { bottom: '12', left: '48', color: 'from-purple-400 to-purple-600', delay: 0.6 },
              { bottom: '13', right: '32', color: 'from-cyan-400 to-cyan-600', delay: 0.9 },
              { bottom: '11', right: '22', color: 'from-pink-400 to-pink-600', delay: 1.2 },
            ].map((flower, i) => (
              <motion.div
                key={i}
                className="absolute flex flex-col items-center"
                style={{
                  bottom: flower.bottom + '%',
                  left: flower.left ? flower.left + '%' : undefined,
                  right: flower.right ? flower.right + '%' : undefined,
                }}
                animate={{ 
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 2, repeat: Infinity, delay: flower.delay }}
              >
                <div className={`w-5 h-5 bg-gradient-to-br ${flower.color} rounded-full border-2 border-yellow-400 shadow-lg`} />
                <div className="w-1 h-5 bg-green-600 border border-green-800" />
              </motion.div>
            ))}
            
            {/* Floating sparkles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${15 + (i % 3) * 15}%`,
                }}
                animate={{
                  y: [-5, 5, -5],
                  opacity: [0.4, 1, 0.4],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  delay: i * 0.4,
                }}
              >
                ✨
              </motion.div>
            ))}
            
            {/* Grass with magical tint */}
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute bottom-32 w-2 h-4 bg-gradient-to-t from-green-700 to-emerald-500 rounded-t-full border-l border-r border-green-900"
                style={{ left: `${8 + i * 8}%` }}
              />
            ))}
          </>
        );
      
      default:
        return null;
    }
  };

  // Render time-specific elements with pixel art style
  const renderTimeElements = () => {
    if (timeOfDay === 'night') {
      // Stars for night time - pixel style scattered across sky
      return (
        <>
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${15 + (i * 6) % 70}%`,
                top: `${8 + (i * 4) % 40}%`,
                imageRendering: 'pixelated',
              }}
              animate={{
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 2 + i * 0.2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            >
              {/* Four-pointed star shape */}
              <div className="relative w-3 h-3">
                <div className="absolute top-0 left-1 w-1 h-1 bg-white" />
                <div className="absolute top-1 left-0 w-3 h-1 bg-white" />
                <div className="absolute top-2 left-1 w-1 h-1 bg-white" />
              </div>
            </motion.div>
          ))}
          {/* Enhanced Pixel Moon - Crescent shape, more recognizable */}
          <motion.div
            className="absolute top-12 right-1/4 w-20 h-20"
            style={{ imageRendering: 'pixelated' }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Moon with glow */}
            <div className="absolute inset-0 bg-yellow-200/20 blur-xl rounded-full" />
            
            {/* Moon body - crescent shape */}
            <div className="relative w-full h-full">
              {/* Main circle */}
              <div className="absolute inset-1 bg-yellow-100 border-3 border-yellow-200 rounded-sm" style={{ imageRendering: 'pixelated' }} />
              
              {/* Crescent shadow on right */}
              <div className="absolute top-2 right-1 w-10 h-16 bg-yellow-200/60" style={{ borderRadius: '0 100% 100% 0' }} />
              
              {/* Craters - distinct pixel blocks */}
              <div className="absolute top-3 left-3 w-3 h-3 bg-gray-300/40 border border-gray-400/30" />
              <div className="absolute top-8 left-5 w-4 h-4 bg-gray-300/40 border border-gray-400/30" />
              <div className="absolute top-12 left-2 w-2 h-2 bg-gray-300/40 border border-gray-400/30" />
              <div className="absolute top-6 right-6 w-2 h-2 bg-yellow-50" />
            </div>
          </motion.div>
        </>
      );
    } else if (timeOfDay === 'morning' || timeOfDay === 'afternoon') {
      // Enhanced Pixel Sun - Brighter and more distinctive
      return (
        <motion.div
          className="absolute top-12 right-1/4 w-20 h-20"
          style={{ imageRendering: 'pixelated' }}
          animate={{
            y: [0, -6, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Sun glow */}
          <div className="absolute inset-0 bg-yellow-300/30 blur-2xl rounded-full" />
          
          {/* Sun body */}
          <div className="relative w-full h-full">
            {/* Core - bright yellow with gradient effect */}
            <div className="absolute inset-3 bg-yellow-400 border-3 border-yellow-500" />
            <div className="absolute inset-5 bg-yellow-300" />
            
            {/* Pixel rays - 8 directions, more prominent */}
            {/* North */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-2 h-3 bg-yellow-400 border border-yellow-500" />
            {/* South */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-2 h-3 bg-yellow-400 border border-yellow-500" />
            {/* East */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-3 h-2 bg-yellow-400 border border-yellow-500" />
            {/* West */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-2 bg-yellow-400 border border-yellow-500" />
            
            {/* Diagonal rays */}
            {/* NE */}
            <div className="absolute top-2 right-2 translate-x-2 -translate-y-2 w-2 h-2 bg-yellow-400 border border-yellow-500" />
            {/* NW */}
            <div className="absolute top-2 left-2 -translate-x-2 -translate-y-2 w-2 h-2 bg-yellow-400 border border-yellow-500" />
            {/* SE */}
            <div className="absolute bottom-2 right-2 translate-x-2 translate-y-2 w-2 h-2 bg-yellow-400 border border-yellow-500" />
            {/* SW */}
            <div className="absolute bottom-2 left-2 -translate-x-2 translate-y-2 w-2 h-2 bg-yellow-400 border border-yellow-500" />
            
            {/* Animated shimmer effect */}
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white"
                style={{
                  top: `${30 + i * 10}%`,
                  left: `${30 + i * 10}%`,
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </motion.div>
      );
    } else if (timeOfDay === 'evening') {
      // Sunset - Orange sun setting
      return (
        <>
          {/* Setting pixel sun - orange tones */}
          <motion.div
            className="absolute top-12 right-1/4 w-20 h-20 opacity-90"
            style={{ imageRendering: 'pixelated' }}
            animate={{
              y: [0, -6, 0],
            }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Sunset glow */}
            <div className="absolute inset-0 bg-orange-400/30 blur-2xl rounded-full" />
            
            {/* Sun body - orange/red tones */}
            <div className="relative w-full h-full">
              <div className="absolute inset-3 bg-orange-500 border-3 border-red-500" />
              <div className="absolute inset-5 bg-orange-400" />
              
              {/* Shorter rays for setting sun */}
              <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1 w-2 h-2 bg-orange-400 border border-orange-500" />
              <div className="absolute top-2 right-2 translate-x-1 -translate-y-1 w-2 h-2 bg-orange-400 border border-orange-500" />
              <div className="absolute top-2 left-2 -translate-x-1 -translate-y-1 w-2 h-2 bg-orange-400 border border-orange-500" />
            </div>
          </motion.div>
          
          {/* Early stars appearing */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${20 + i * 12}%`,
                top: `${10 + (i % 3) * 8}%`,
                imageRendering: 'pixelated',
              }}
              animate={{
                opacity: [0, 0.6, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            >
              <div className="relative w-3 h-3">
                <div className="absolute top-0 left-1 w-1 h-1 bg-white" />
                <div className="absolute top-1 left-0 w-3 h-1 bg-white" />
                <div className="absolute top-2 left-1 w-1 h-1 bg-white" />
              </div>
            </motion.div>
          ))}
        </>
      );
    }
    return null;
  };

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Sky gradient */}
      <div className={`absolute inset-0 bg-gradient-to-b ${colors.sky}`} />
      
      {/* Time-specific elements (sun, moon, stars) */}
      {renderTimeElements()}
      
      {/* Ground - Extended height for better grounding */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b ${colors.ground} border-t-3 border-green-800`} />
      
      {/* Stage-specific decorations */}
      {renderDecorations()}
      
      {/* Pixel Clouds (except at night) */}
      {timeOfDay !== 'night' && (
        <>
          {/* Cloud on left side */}
          <motion.div
            className="absolute top-16 left-12"
            animate={{ x: [0, -8, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            style={{ imageRendering: 'pixelated' }}
          >
            {/* Pixel cloud pattern */}
            <div className="relative w-16 h-8">
              <div className="absolute top-2 left-2 w-3 h-3 bg-white/90 border border-gray-300" />
              <div className="absolute top-1 left-4 w-4 h-4 bg-white/90 border border-gray-300" />
              <div className="absolute top-0 left-7 w-3 h-5 bg-white/90 border border-gray-300" />
              <div className="absolute top-2 left-10 w-3 h-3 bg-white/90 border border-gray-300" />
              <div className="absolute top-3 left-1 w-12 h-3 bg-white/90 border border-gray-300" />
            </div>
          </motion.div>
          
          {/* Cloud on right side, above sun */}
          <motion.div
            className="absolute top-6 right-12"
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 8, repeat: Infinity, delay: 2 }}
            style={{ imageRendering: 'pixelated' }}
          >
            {/* Smaller pixel cloud */}
            <div className="relative w-14 h-7">
              <div className="absolute top-1 left-1 w-3 h-3 bg-white/85 border border-gray-300" />
              <div className="absolute top-0 left-3 w-4 h-4 bg-white/85 border border-gray-300" />
              <div className="absolute top-2 left-6 w-3 h-3 bg-white/85 border border-gray-300" />
              <div className="absolute top-2 left-0 w-10 h-2 bg-white/85 border border-gray-300" />
            </div>
          </motion.div>
          
          {/* Small cloud in center */}
          <motion.div
            className="absolute top-28 left-1/2 -translate-x-1/2"
            animate={{ x: [0, 6, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 4 }}
            style={{ imageRendering: 'pixelated' }}
          >
            <div className="relative w-10 h-5">
              <div className="absolute top-1 left-1 w-2 h-2 bg-white/80 border border-gray-300" />
              <div className="absolute top-0 left-2 w-3 h-3 bg-white/80 border border-gray-300" />
              <div className="absolute top-1 left-5 w-2 h-2 bg-white/80 border border-gray-300" />
              <div className="absolute top-2 left-0 w-8 h-2 bg-white/80 border border-gray-300" />
            </div>
          </motion.div>
        </>
      )}
      
      {/* Stats Display - Top Left Corner - COMPACT with Transparent Background */}
      {(fullness !== undefined || mood !== undefined) && (
        <motion.div 
          className="absolute top-4 left-4 bg-black/40 border-2 border-white/50 rounded-lg px-3 py-1.5 backdrop-blur-md z-20"
          style={{ 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          }}
          whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.6)' }}
        >
          <div className="flex items-center gap-3">
            {/* Fullness Stat */}
            {fullness !== undefined && (
              <div className="flex items-center gap-1.5">
                <div className="text-base drop-shadow-lg">🍖</div>
                <div className="font-bold text-sm text-white drop-shadow-lg">{fullness}%</div>
              </div>
            )}
            
            {/* Divider */}
            {fullness !== undefined && mood !== undefined && (
              <div className="w-px h-4 bg-white/40" />
            )}
            
            {/* Mood Stat */}
            {mood !== undefined && (
              <div className="flex items-center gap-1.5">
                <div className="text-base drop-shadow-lg">
                  {mood >= 4 ? '😊' : mood >= 2 ? '😐' : '😢'}
                </div>
                <div className="font-bold text-sm text-white drop-shadow-lg">{mood}/5</div>
              </div>
            )}
          </div>
        </motion.div>
      )}
      
      {/* Settings & Stage Info - Top Right Corner */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
        {/* Settings Button */}
        {onSettingsClick && (
          <motion.button
            onClick={onSettingsClick}
            className="bg-white/90 border-2 border-black rounded-lg p-2 retro-shadow backdrop-blur-sm hover:bg-gray-100"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title="Settings"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </motion.button>
        )}
        
        {/* Stage Icon - Clickable to show stage details */}
        {stageName && onStageClick && (
          <motion.button
            onClick={onStageClick}
            className="bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-black rounded-lg p-2 retro-shadow backdrop-blur-sm hover:from-purple-500 hover:to-pink-500"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            title={`${stageName} ${speciesEmoji || ''} - Stage ${stage + 1}/${totalStages} - Click for details`}
          >
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </motion.button>
        )}
      </div>
      
      {/* Feed Button - Bottom Left Corner */}
      {onFeedClick && (
        <div className="absolute bottom-6 left-6 z-20">
          <motion.button
            onClick={onFeedClick}
            className="bg-gradient-to-br from-green-400 to-emerald-500 border-3 border-black rounded-full w-14 h-14 flex items-center justify-center retro-shadow hover:from-green-500 hover:to-emerald-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <UtensilsCrossed className="w-7 h-7 text-white" />
          </motion.button>
        </div>
      )}
      
      {/* Pet Actions Menu - positioned in bottom-right corner */}
      {petActionsMenu && (
        <div className="absolute bottom-6 right-6 z-20">
          {petActionsMenu}
        </div>
      )}
      
      {/* Feeding Animation - Pixel Style */}
      {feedingAnimation?.active && (
        <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center">
          {/* Variant 0: Food falls from top */}
          {feedingAnimation.variant === 0 && (
            <>
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-4xl"
                  style={{ 
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))',
                  }}
                  initial={{ 
                    top: '-10%', 
                    left: `${30 + i * 10}%`,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{ 
                    top: '60%', 
                    opacity: [0, 1, 1, 0],
                    scale: [0, 1.2, 1, 0.8],
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 1.5,
                    delay: i * 0.15,
                    ease: 'easeIn',
                  }}
                >
                  {feedingAnimation.foodEmoji}
                </motion.div>
              ))}
            </>
          )}
          
          {/* Variant 1: Food appears with burst effect */}
          {feedingAnimation.variant === 1 && (
            <motion.div
              className="relative"
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.5, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 2 }}
            >
              <div className="text-6xl" style={{ filter: 'drop-shadow(3px 3px 0px rgba(0,0,0,0.3))' }}>
                {feedingAnimation.foodEmoji}
              </div>
              
              {/* Pixel sparkle burst */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-3 h-3 bg-yellow-400 border-2 border-yellow-600"
                  style={{
                    top: '50%',
                    left: '50%',
                    imageRendering: 'pixelated',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos((i * Math.PI) / 4) * 60,
                    y: Math.sin((i * Math.PI) / 4) * 60,
                    opacity: 0,
                  }}
                  transition={{ duration: 1, delay: 0.3 }}
                />
              ))}
            </motion.div>
          )}
          
          {/* Variant 2: Food floats and circles */}
          {feedingAnimation.variant === 2 && (
            <>
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute text-3xl"
                  style={{ 
                    imageRendering: 'pixelated',
                    filter: 'drop-shadow(2px 2px 0px rgba(0,0,0,0.3))',
                  }}
                  initial={{ 
                    x: 0,
                    y: 0,
                    opacity: 0,
                  }}
                  animate={{ 
                    x: [0, Math.cos((i * Math.PI) / 3) * 80, 0],
                    y: [0, Math.sin((i * Math.PI) / 3) * 80, 0],
                    opacity: [0, 1, 1, 0],
                    scale: [0.5, 1, 0.5],
                    rotate: [0, 360],
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    ease: 'easeInOut',
                  }}
                >
                  {feedingAnimation.foodEmoji}
                </motion.div>
              ))}
              
              {/* Center glow effect */}
              <motion.div
                className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-green-300 to-emerald-300 blur-xl"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 2, 0],
                  opacity: [0, 0.6, 0],
                }}
                transition={{ duration: 2 }}
              />
            </>
          )}
          
          {/* Pixel "Yum!" text that appears */}
          <motion.div
            className="absolute bottom-1/3 text-3xl font-bold text-white px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-500 border-4 border-black retro-shadow"
            style={{ imageRendering: 'pixelated' }}
            initial={{ scale: 0, y: 20, opacity: 0 }}
            animate={{ 
              scale: [0, 1.2, 1],
              y: [20, -10, 0],
              opacity: [0, 1, 1, 0],
            }}
            transition={{ 
              duration: 1.8,
              delay: 0.5,
            }}
          >
            YUM! ✨
          </motion.div>
        </div>
      )}
    </div>
  );
}
