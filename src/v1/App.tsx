import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PixelPet } from './components/PixelPet';
import { GameStats } from './components/GameStats';
import { ProgressBar } from './components/ProgressBar';
import { DailyCheckIn } from './components/DailyCheckIn';
import { StageIndicator } from './components/StageIndicator';
import { MultiplierInfo } from './components/MultiplierInfo';
import { Sparkles, Trophy } from 'lucide-react';
import { Toaster, toast } from 'sonner@2.0.3';

// Evolution stages
const STAGES = [
  { name: 'Egg', threshold: 0 },
  { name: 'Baby', threshold: 10 },
  { name: 'Teen', threshold: 30 },
  { name: 'Adult', threshold: 60 },
  { name: 'Master', threshold: 100 },
];

interface GameState {
  progressDays: number;
  under50Streak: number;
  exceedStreak: number;
  currentUsage: number;
  currentLimit: number;
  ratio: number;
  multiplier: number;
  weeksSinceFirst7: number;
  petType: 'cat' | 'dog';
}

export default function App() {
  const [gameState, setGameState] = useState<GameState>({
    progressDays: 0,
    under50Streak: 0,
    exceedStreak: 0,
    currentUsage: 0,
    currentLimit: 180,
    ratio: 0,
    multiplier: 0,
    weeksSinceFirst7: 0,
    petType: 'cat',
  });

  const [petMood, setPetMood] = useState<'happy' | 'neutral' | 'sad'>('neutral');
  const [showCelebration, setShowCelebration] = useState(false);

  // Calculate current evolution stage
  const currentStage = STAGES.findIndex((stage, index) => {
    const nextStage = STAGES[index + 1];
    return gameState.progressDays >= stage.threshold && 
           (!nextStage || gameState.progressDays < nextStage.threshold);
  });

  // Update pet mood based on game state
  useEffect(() => {
    if (gameState.exceedStreak > 0) {
      setPetMood('sad');
    } else if (gameState.multiplier > 1.0) {
      setPetMood('happy');
    } else {
      setPetMood('neutral');
    }
  }, [gameState.exceedStreak, gameState.multiplier]);

  // Check for stage evolution
  useEffect(() => {
    const nextStage = STAGES[currentStage + 1];
    if (nextStage && gameState.progressDays >= nextStage.threshold) {
      setShowCelebration(true);
      toast.success(`🎉 Evolution! Your pet became a ${nextStage.name}!`, {
        duration: 5000,
      });
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }, [gameState.progressDays, currentStage]);

  const handleCheckIn = (U: number, L: number) => {
    let m = 0.0;
    let newUnder50Streak = gameState.under50Streak;
    let newExceedStreak = gameState.exceedStreak;
    let newWeeksSinceFirst7 = gameState.weeksSinceFirst7;

    const limitMinutes = L;
    
    if (limitMinutes > 180) {
      m = 0.0;
      toast.error('⚠️ Limit too high (>180min). No progress gained!', {
        description: 'Keep your daily limit reasonable.',
      });
    } else {
      if (U <= L) {
        const r = L > 0 ? U / L : 0;
        
        if (r <= 0.15) {
          m = 1.1;
          toast.success('🎯 Excellent! ×1.1 multiplier', {
            description: `You used only ${(r * 100).toFixed(1)}% of your limit!`,
          });
        } else if (r <= 0.25) {
          m = 1.2;
          toast.success('✨ Great work! ×1.2 multiplier', {
            description: `You used ${(r * 100).toFixed(1)}% of your limit!`,
          });
        } else if (r <= 0.50) {
          m = 1.5;
          toast.success('⭐ Good job! ×1.5 multiplier', {
            description: `You used ${(r * 100).toFixed(1)}% of your limit!`,
          });
        } else {
          m = 1.0;
          toast.info('✓ Day completed! ×1.0 multiplier', {
            description: `You used ${(r * 100).toFixed(1)}% of your limit.`,
          });
        }

        newExceedStreak = 0;
        newUnder50Streak = (r <= 0.5) ? newUnder50Streak + 1 : 0;

        // Apply streak bonus
        if (newUnder50Streak >= 7) {
          if (newUnder50Streak === 7) {
            toast.success('🔥 7-Day Streak Bonus Activated!', {
              description: 'Your multiplier is now boosted!',
              duration: 5000,
            });
          }
          const weeks = Math.floor((newUnder50Streak - 7) / 7);
          newWeeksSinceFirst7 = weeks;
          const originalM = m;
          m = 1 + (m - 1) / Math.pow(2, weeks);
          
          if (weeks > 0) {
            toast.info(`📊 Streak bonus adjusted: ×${m.toFixed(2)}`, {
              description: `Week ${weeks + 1} of streak maintenance.`,
            });
          }
        }
      } else {
        m = 0.0;
        newExceedStreak += 1;
        newUnder50Streak = 0;
        toast.error('❌ Limit exceeded! No progress today.', {
          description: `You exceeded your limit by ${(U - L).toFixed(0)} minutes.`,
          duration: 5000,
        });
      }
    }

    const newProgressDays = gameState.progressDays + m;

    setGameState({
      progressDays: newProgressDays,
      under50Streak: newUnder50Streak,
      exceedStreak: newExceedStreak,
      currentUsage: U,
      currentLimit: L,
      ratio: L > 0 ? U / L : 0,
      multiplier: m,
      weeksSinceFirst7: newWeeksSinceFirst7,
      petType: gameState.petType,
    });

    // Save to localStorage
    localStorage.setItem('pixelPetGameState', JSON.stringify({
      progressDays: newProgressDays,
      under50Streak: newUnder50Streak,
      exceedStreak: newExceedStreak,
      currentUsage: U,
      currentLimit: L,
      ratio: L > 0 ? U / L : 0,
      multiplier: m,
      weeksSinceFirst7: newWeeksSinceFirst7,
      petType: gameState.petType,
    }));
  };

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('pixelPetGameState');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setGameState({ ...parsed, petType: parsed.petType || 'cat' });
        toast.info('👋 Welcome back!', {
          description: 'Your progress has been loaded.',
        });
      } catch (e) {
        console.error('Failed to load saved state', e);
      }
    }
  }, []);

  const togglePetType = () => {
    const newPetType = gameState.petType === 'cat' ? 'dog' : 'cat';
    const newState = { ...gameState, petType: newPetType };
    setGameState(newState);
    localStorage.setItem('pixelPetGameState', JSON.stringify(newState));
    toast.success(`Switched to ${newPetType === 'cat' ? '🐱 Cat' : '🐶 Dog'}!`);
  };

  const nextStageThreshold = STAGES[currentStage + 1]?.threshold || STAGES[STAGES.length - 1].threshold;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4 md:p-8">
      <Toaster position="top-center" richColors />
      
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 px-8 py-4 rounded-2xl border-4 border-black retro-shadow mb-4">
            <Sparkles className="w-8 h-8" />
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
              Pixel Progress Pet
            </h1>
            <Trophy className="w-8 h-8" />
          </div>
          <p className="text-lg opacity-80 font-bold">
            Track your daily usage and watch your pet evolve! 🎮
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Pet Display */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pet Display Area */}
            <motion.div 
              className="bg-white rounded-2xl border-4 border-black retro-shadow p-8 relative overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {/* Celebration Effect */}
              {showCelebration && (
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 opacity-50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0] }}
                  transition={{ duration: 1.5 }}
                />
              )}

              {/* Stage Name & Pet Selector */}
              <div className="text-center mb-4 flex flex-col items-center gap-3">
                <div className="inline-block bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-2 rounded-full border-2 border-black">
                  <span className="font-bold uppercase">{STAGES[currentStage]?.name || 'Unknown'} {gameState.petType === 'cat' ? '🐱' : '🐶'}</span>
                </div>
                <motion.button
                  onClick={togglePetType}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-lg border-2 border-black retro-shadow hover:from-cyan-500 hover:to-blue-600"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="font-bold text-sm">
                    Switch to {gameState.petType === 'cat' ? '🐶 Dog' : '🐱 Cat'}
                  </span>
                </motion.button>
              </div>

              {/* Pet */}
              <div className="flex justify-center items-center min-h-[240px] relative">
                <PixelPet 
                  stage={currentStage} 
                  mood={petMood}
                  isActive={gameState.multiplier > 0}
                  petType={gameState.petType}
                />
                
                {/* Mood indicator */}
                <motion.div 
                  className="absolute top-4 right-4 text-4xl"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  {petMood === 'happy' && '😊'}
                  {petMood === 'neutral' && '😐'}
                  {petMood === 'sad' && '😢'}
                </motion.div>
              </div>

              {/* Stage Indicator */}
              <div className="mt-8 relative">
                <StageIndicator currentStage={currentStage} stages={STAGES} />
              </div>

              {/* Progress to Next Stage */}
              <div className="mt-6">
                <ProgressBar
                  current={gameState.progressDays}
                  max={nextStageThreshold}
                  label="Progress to Next Stage"
                  color="purple"
                />
              </div>
            </motion.div>

            {/* Stats Grid */}
            <GameStats
              progressDays={gameState.progressDays}
              multiplier={gameState.multiplier}
              under50Streak={gameState.under50Streak}
              exceedStreak={gameState.exceedStreak}
              ratio={gameState.ratio}
            />
          </div>

          {/* Right Column - Controls */}
          <div className="space-y-6">
            {/* Info Button */}
            <div className="flex justify-end">
              <MultiplierInfo />
            </div>

            {/* Daily Check-in */}
            <DailyCheckIn
              onCheckIn={handleCheckIn}
              currentUsage={gameState.currentUsage}
              currentLimit={gameState.currentLimit}
            />

            {/* Current Stats Display */}
            <motion.div 
              className="bg-gradient-to-br from-slate-700 to-slate-900 text-white p-6 rounded-xl border-4 border-black retro-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-bold uppercase mb-4 text-lg border-b-2 border-white/30 pb-2">
                Current Session
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Usage (U):</span>
                  <span className="font-bold text-xl">{gameState.currentUsage} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Limit (L):</span>
                  <span className="font-bold text-xl">{gameState.currentLimit} min</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="opacity-80">Ratio:</span>
                  <span className="font-bold text-xl">{(gameState.ratio * 100).toFixed(1)}%</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t-2 border-white/30">
                  <span className="opacity-80">Last Multiplier:</span>
                  <span className={`font-bold text-2xl ${
                    gameState.multiplier > 1 ? 'text-yellow-300' : 
                    gameState.multiplier === 1 ? 'text-green-300' : 
                    'text-red-300'
                  }`}>
                    ×{gameState.multiplier.toFixed(2)}
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Tips */}
            <motion.div 
              className="bg-gradient-to-br from-amber-100 to-yellow-200 p-6 rounded-xl border-4 border-black retro-shadow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-bold uppercase mb-3 text-lg">💡 Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span>🎯</span>
                  <span>Keep usage under 50% for streak bonuses!</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⚡</span>
                  <span>Lower usage = higher multipliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>🔥</span>
                  <span>7+ day streaks unlock special bonuses</span>
                </li>
                <li className="flex items-start gap-2">
                  <span>⚠️</span>
                  <span>Keep limits under 180 minutes</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
