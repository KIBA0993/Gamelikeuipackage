import { motion } from 'motion/react';
import { AlertCircle, Heart, Sparkles, RotateCcw } from 'lucide-react';
import { Button } from './ui/button';
import { HealthState } from '../types/game';

interface HealthBannerProps {
  healthState: HealthState;
  consecutiveUnfedDays: number;
  onFeed: () => void;
  onCure: () => void;
  onRevive: () => void;
  onRestart: () => void;
}

export function HealthBanner({
  healthState,
  consecutiveUnfedDays,
  onFeed,
  onCure,
  onRevive,
  onRestart,
}: HealthBannerProps) {
  if (healthState === 'healthy') return null;

  if (healthState === 'sick') {
    return (
      <motion.div
        role="alert"
        className="bg-gradient-to-r from-amber-400 to-orange-500 border-4 border-black rounded-xl p-6 retro-shadow mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <AlertCircle className="w-12 h-12" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
              🤒 Your Friend is Sick
            </h2>
            <p className="text-lg mb-4">
              {consecutiveUnfedDays} days without proper feeding.
            </p>
            
            <div className="bg-white/80 border-2 border-black rounded-lg p-4 mb-4">
              <p className="font-bold mb-2">Natural Recovery:</p>
              <p className="text-sm">
                Feed your friend (≥100 Energy) on <strong>any 2 days</strong> within the next 3 days to restore health naturally.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={onFeed}
                size="lg"
                className="border-3 border-black retro-shadow font-bold bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Feed Now (Free Recovery)
              </Button>
              
              <Button
                onClick={onCure}
                size="lg"
                variant="outline"
                className="border-3 border-black retro-shadow font-bold bg-white hover:bg-gray-100"
              >
                <Heart className="w-5 h-5 mr-2" />
                Vet Cure (120 💎)
              </Button>
            </div>

            <p className="text-xs mt-3 opacity-80">
              ⚠️ If not fed for {7 - consecutiveUnfedDays} more days, your friend will pass away.
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  if (healthState === 'dead') {
    return (
      <motion.div
        role="alert"
        className="bg-gradient-to-r from-gray-700 to-gray-900 text-white border-4 border-black rounded-xl p-6 retro-shadow mb-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="text-6xl">👻</div>
          </div>
          
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-2">
              Your Friend Has Passed Away
            </h2>
            <p className="text-lg mb-4 opacity-90">
              After {consecutiveUnfedDays} days without care, your companion has departed...
            </p>
            
            <div className="bg-white/10 border-2 border-white/30 rounded-lg p-4 mb-4">
              <p className="text-sm opacity-90">
                There is no natural recovery from this state. You can choose to revive your friend or start fresh with a new companion.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button
                onClick={onRevive}
                size="lg"
                className="border-3 border-black retro-shadow font-bold bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-black"
              >
                <Sparkles className="w-5 h-5 mr-2" />
                Revive (400 💎)
              </Button>
              
              <Button
                onClick={onRestart}
                size="lg"
                variant="outline"
                className="border-3 border-white retro-shadow font-bold bg-white/10 hover:bg-white/20 text-white hover:text-white"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Start Over (200 💎)
              </Button>
            </div>

            <p className="text-xs mt-3 opacity-70">
              💭 Your friend will be remembered in your Memories
            </p>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
