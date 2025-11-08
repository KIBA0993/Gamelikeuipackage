import { motion } from 'motion/react';

interface ProgressBarProps {
  current: number;
  max: number;
  label: string;
  color?: 'blue' | 'green' | 'purple' | 'yellow';
  showPercentage?: boolean;
}

export function ProgressBar({ 
  current, 
  max, 
  label, 
  color = 'blue',
  showPercentage = true 
}: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100);
  
  const colorClasses = {
    blue: 'from-blue-400 to-blue-600',
    green: 'from-green-400 to-green-600',
    purple: 'from-purple-400 to-purple-600',
    yellow: 'from-yellow-400 to-yellow-600',
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm font-bold uppercase">{label}</div>
        {showPercentage && (
          <div className="text-sm font-bold">{percentage.toFixed(0)}%</div>
        )}
      </div>
      <div className="relative h-8 bg-gray-300 rounded-lg border-4 border-black overflow-hidden retro-shadow">
        <motion.div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} relative`}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Pixel shine effect */}
          <div className="absolute inset-0 bg-white opacity-20">
            <div className="h-2 bg-white opacity-40"></div>
          </div>
        </motion.div>
        {/* Grid overlay for pixel effect */}
        <div className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.1) 3px, rgba(0,0,0,0.1) 4px)',
          }}
        ></div>
      </div>
      <div className="text-xs text-center opacity-70">
        {current.toFixed(1)} / {max}
      </div>
    </div>
  );
}
