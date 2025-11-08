import { motion } from 'motion/react';
import { Zap, Target, TrendingUp, Flame } from 'lucide-react';

interface GameStatsProps {
  progressDays: number;
  multiplier: number;
  under50Streak: number;
  exceedStreak: number;
  ratio: number;
}

export function GameStats({ 
  progressDays, 
  multiplier, 
  under50Streak, 
  exceedStreak,
  ratio 
}: GameStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Progress Days */}
      <motion.div 
        className="bg-gradient-to-br from-yellow-400 to-orange-500 p-4 rounded-lg border-4 border-black retro-shadow"
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5" />
          <div className="text-xs font-bold">PROGRESS</div>
        </div>
        <div className="text-3xl font-bold">{progressDays.toFixed(1)}</div>
        <div className="text-xs opacity-80">days</div>
      </motion.div>

      {/* Multiplier */}
      <motion.div 
        className={`bg-gradient-to-br p-4 rounded-lg border-4 border-black retro-shadow ${
          multiplier > 1 ? 'from-purple-400 to-pink-500 animate-pulse-glow' : 'from-gray-300 to-gray-400'
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5" />
          <div className="text-xs font-bold">MULTIPLIER</div>
        </div>
        <div className="text-3xl font-bold">×{multiplier.toFixed(1)}</div>
        <div className="text-xs opacity-80">
          {multiplier > 1 ? 'ACTIVE!' : 'inactive'}
        </div>
      </motion.div>

      {/* Good Streak */}
      <motion.div 
        className={`bg-gradient-to-br p-4 rounded-lg border-4 border-black retro-shadow ${
          under50Streak > 0 ? 'from-green-400 to-emerald-500' : 'from-gray-300 to-gray-400'
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5" />
          <div className="text-xs font-bold">GOOD STREAK</div>
        </div>
        <div className="text-3xl font-bold">{under50Streak}</div>
        <div className="text-xs opacity-80">days</div>
        {under50Streak >= 7 && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-yellow-300 rounded-full animate-bounce-small"></div>
        )}
      </motion.div>

      {/* Exceed Streak Warning */}
      <motion.div 
        className={`bg-gradient-to-br p-4 rounded-lg border-4 border-black retro-shadow ${
          exceedStreak > 0 ? 'from-red-400 to-red-600 animate-shake' : 'from-gray-300 to-gray-400'
        }`}
        whileHover={{ scale: 1.05 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Flame className="w-5 h-5" />
          <div className="text-xs font-bold">EXCEED DAYS</div>
        </div>
        <div className="text-3xl font-bold">{exceedStreak}</div>
        <div className="text-xs opacity-80">
          {exceedStreak > 0 ? 'WARNING!' : 'safe'}
        </div>
      </motion.div>
    </div>
  );
}
