import { motion } from 'motion/react';
import { Zap, Gem } from 'lucide-react';

interface CurrencyDisplayProps {
  energy: number;
  gems: number;
  maxEnergy?: number;
}

export function CurrencyDisplay({ energy, gems, maxEnergy = 150 }: CurrencyDisplayProps) {
  const energyPercent = (energy / maxEnergy) * 100;

  return (
    <div className="flex gap-2">
      {/* Energy - Compact */}
      <motion.div
        className="flex-1 bg-gradient-to-br from-amber-300 to-yellow-400 border-2 border-black rounded-lg px-3 py-2 retro-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center gap-2">
          <Zap className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" />
          <div className="flex-1 min-w-0">
            <div className="h-1 bg-amber-200 rounded-full border border-black overflow-hidden mb-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-600 to-yellow-600"
                initial={{ width: 0 }}
                animate={{ width: `${energyPercent}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="text-[9px] opacity-70 text-center">{energy}/{maxEnergy}</div>
          </div>
        </div>
      </motion.div>

      {/* Gems - Compact */}
      <motion.div
        className="flex-1 bg-gradient-to-br from-purple-400 to-pink-500 border-2 border-black rounded-lg px-3 py-2 retro-shadow"
        whileHover={{ scale: 1.02 }}
      >
        <div className="flex items-center justify-between gap-2">
          <Gem className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" />
          <div className="flex-1 text-center">
            <div className="text-[9px] opacity-70">Gems</div>
          </div>
          <span className="font-bold text-lg flex-shrink-0">{gems}</span>
        </div>
      </motion.div>
    </div>
  );
}
