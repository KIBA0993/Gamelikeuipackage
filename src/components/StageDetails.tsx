import { motion } from 'motion/react';
import { X, Sparkles, Star, TrendingUp } from 'lucide-react';

interface StageDetailsProps {
  open: boolean;
  onClose: () => void;
  growthProgress: number;
  currentStage: number;
  stageName: string;
  nextStageThreshold?: number;
  totalStages: number;
  speciesEmoji: string;
}

export function StageDetails({
  open,
  onClose,
  growthProgress,
  currentStage,
  stageName,
  nextStageThreshold,
  totalStages,
  speciesEmoji,
}: StageDetailsProps) {
  if (!open) return null;

  const progressToNext = nextStageThreshold 
    ? Math.min((growthProgress / nextStageThreshold) * 100, 100)
    : 100;

  const isMaxStage = currentStage === totalStages - 1;

  // Stage names based on EVOLUTION_STAGES
  const stageNames = ['Egg', 'Baby', 'Teen', 'Adult', 'Master'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-black/20 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: -20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="bg-white rounded-2xl border-3 border-black retro-shadow w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-br from-purple-400 via-pink-400 to-purple-500 p-4 border-b-3 border-black relative">
          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full flex items-center justify-center border-2 border-white/50 transition-colors"
          >
            <X className="w-4 h-4 text-white" />
          </button>
          
          <div className="flex items-center gap-3 pr-8">
            <div className="text-4xl">{speciesEmoji}</div>
            <div>
              <h2 className="text-xl font-bold text-white drop-shadow-lg">
                {stageName}
              </h2>
              <div className="text-white/90 text-sm font-semibold drop-shadow">
                Stage {currentStage + 1} of {totalStages}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          {/* Current Progress */}
          <div className="bg-gray-50 rounded-xl p-3 border-2 border-gray-200">
            {!isMaxStage && nextStageThreshold && (
              <>
                <div className="flex justify-between text-xs mb-2">
                  <span className="text-gray-600">Progress:</span>
                  <span className="font-bold">{growthProgress} / {nextStageThreshold}</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 border-2 border-black overflow-hidden mb-2">
                  <motion.div 
                    className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 h-full relative"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressToNext}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                  >
                    {progressToNext > 15 && (
                      <div className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
                        {progressToNext.toFixed(0)}%
                      </div>
                    )}
                  </motion.div>
                </div>
                
                <div className="flex items-center gap-1 text-xs text-purple-600">
                  <TrendingUp className="w-3 h-3" />
                  <span className="font-bold">{nextStageThreshold - growthProgress} points to {stageNames[currentStage + 1]}</span>
                </div>
              </>
            )}

            {isMaxStage && (
              <div className="text-center py-2">
                <div className="text-3xl mb-1">🎉</div>
                <div className="font-bold text-purple-600">Max Stage!</div>
              </div>
            )}
          </div>

          {/* Quick Timeline */}
          <div className="flex justify-center gap-2">
            {stageNames.map((name, index) => {
              const isComplete = index < currentStage;
              const isCurrent = index === currentStage;

              return (
                <div key={index} className="text-center">
                  <div
                    className={`w-10 h-10 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold retro-shadow ${
                      isCurrent
                        ? 'bg-gradient-to-br from-purple-400 to-pink-400 text-white'
                        : isComplete
                        ? 'bg-gradient-to-br from-green-400 to-emerald-500 text-white'
                        : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isComplete ? '✓' : index + 1}
                  </div>
                  <div className={`text-xs mt-1 font-semibold ${
                    isCurrent ? 'text-purple-600' : isComplete ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {name}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Growth Tip */}
          {!isMaxStage && (
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-3">
              <div className="flex items-start gap-2">
                <div className="text-lg">💡</div>
                <div className="text-xs text-blue-900">
                  <span className="font-bold">Tip:</span> Feed daily & stay under screen time to grow faster!
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
