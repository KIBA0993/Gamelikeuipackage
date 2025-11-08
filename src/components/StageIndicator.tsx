import { motion } from 'motion/react';

interface StageIndicatorProps {
  currentStage: number;
  stages: { name: string; threshold: number }[];
}

export function StageIndicator({ currentStage, stages }: StageIndicatorProps) {
  return (
    <div className="space-y-3">
      <div className="text-center font-bold uppercase text-sm">Evolution Stage</div>
      <div className="flex justify-between items-center gap-2">
        {stages.map((stage, index) => (
          <div key={index} className="flex flex-col items-center flex-1">
            <motion.div
              className={`w-12 h-12 rounded-full border-4 border-black flex items-center justify-center font-bold retro-shadow ${
                index <= currentStage
                  ? 'bg-gradient-to-br from-yellow-400 to-orange-500'
                  : 'bg-gray-300'
              }`}
              animate={index === currentStage ? { scale: [1, 1.1, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {index + 1}
            </motion.div>
            <div className={`text-xs mt-1 text-center font-bold ${
              index <= currentStage ? 'text-black' : 'text-gray-400'
            }`}>
              {stage.name}
            </div>
            {index < stages.length - 1 && (
              <div className="hidden sm:block absolute left-[calc(50%+24px)] w-[calc(100%/5-48px)] h-1 bg-black top-6"
                style={{ 
                  background: index < currentStage ? '#000' : '#ccc',
                  left: `calc(${(index + 1) * 20}% - 24px)`,
                  width: `calc(20% - 8px)`
                }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
