import { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Zap, Edit3 } from 'lucide-react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { calculateEnergyAward } from '../utils/economy';

interface DailyCheckInProps {
  onCheckIn: (usage: number, limit: number) => void;
  currentUsage?: number;
  currentLimit?: number;
  disabled?: boolean;
}

export function DailyCheckIn({ onCheckIn, currentUsage = 0, currentLimit = 180, disabled = false }: DailyCheckInProps) {
  const [usage, setUsage] = useState(currentUsage.toString());
  const [limit, setLimit] = useState(currentLimit.toString());
  const [showInputs, setShowInputs] = useState(false);

  // Handle value updates without triggering notifications
  const handleUsageChange = (newUsage: string) => {
    setUsage(newUsage);
  };

  const handleLimitChange = (newLimit: string) => {
    setLimit(newLimit);
  };

  const usageNum = parseFloat(usage) || 0;
  const limitNum = parseFloat(limit) || 180;
  const ratio = limitNum > 0 ? usageNum / limitNum : 0;
  const energyAward = calculateEnergyAward(usageNum, limitNum);

  // Get color gradient based on ratio
  const getColorGradient = () => {
    if (ratio <= 0.5) return 'from-green-400 to-emerald-500';
    if (ratio <= 0.8) return 'from-blue-400 to-cyan-500';
    if (ratio <= 1.0) return 'from-yellow-400 to-orange-500';
    return 'from-orange-400 to-red-500';
  };

  return (
    <div>
      {/* Ultra-Compact Single Line Display */}
      <div className="bg-gradient-to-br from-orange-100 to-yellow-50 p-2 rounded-lg border-2 border-black">
        <div className="flex items-center gap-2">
          {/* Clock Icon */}
          <Clock className="w-4 h-4 flex-shrink-0" />
          
          {/* Progress Bar with Text */}
          <div className="flex-1 bg-white rounded-full h-6 border-2 border-black overflow-hidden relative">
            <motion.div 
              className={`absolute inset-0 bg-gradient-to-r ${getColorGradient()}`}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(ratio * 100, 100)}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold relative z-10 mix-blend-difference text-white">
                {usageNum}/{limitNum} min
              </span>
            </div>
          </div>
          
          {/* Energy Badge */}
          <div className="flex items-center gap-1 bg-purple-100 border-2 border-black rounded px-2 py-0.5 flex-shrink-0">
            <Zap className="w-3 h-3" fill="currentColor" />
            <span className="text-xs font-bold">{energyAward}</span>
          </div>

          {/* Edit Button */}
          <button
            onClick={() => setShowInputs(!showInputs)}
            className="bg-white/60 hover:bg-white border-2 border-black rounded p-1 transition-colors flex-shrink-0"
          >
            <Edit3 className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Collapsible Input Controls */}
      {showInputs && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="mt-2 space-y-2 bg-orange-50 p-3 rounded-lg border-2 border-black"
        >
          <div>
            <Label htmlFor="usage" className="mb-1 block text-xs">
              <span className="font-bold">Usage (minutes)</span>
            </Label>
            <Input
              id="usage"
              type="number"
              value={usage}
              onChange={(e) => handleUsageChange(e.target.value)}
              onBlur={() => {
                const U = parseFloat(usage) || 0;
                const L = parseFloat(limit) || 180;
                onCheckIn(U, L);
              }}
              className="border-2 border-black text-center font-bold bg-white h-8"
              placeholder="Minutes used today"
            />
          </div>

          <div>
            <Label htmlFor="limit" className="mb-1 block text-xs">
              <span className="font-bold">Daily Limit (minutes)</span>
            </Label>
            <Input
              id="limit"
              type="number"
              value={limit}
              onChange={(e) => handleLimitChange(e.target.value)}
              onBlur={() => {
                const U = parseFloat(usage) || 0;
                const L = parseFloat(limit) || 180;
                onCheckIn(U, L);
              }}
              className="border-2 border-black text-center font-bold bg-white h-8"
              placeholder="Daily limit"
            />
          </div>
          
          <div className="text-xs opacity-70 text-center pt-1">
            💡 Energy awarded at daily reset
          </div>
        </motion.div>
      )}
    </div>
  );
}
