import { motion } from 'motion/react';
import { Sparkles, Info } from 'lucide-react';
import { FoodItem, PetSpecies } from '../types/game';
import { getFoodForSpecies, isFoodAvailable } from '../data/foodCatalog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

interface FoodShopProps {
  species: PetSpecies;
  energy: number;
  gems: number;
  onPurchase: (item: FoodItem) => void;
  healthState: 'healthy' | 'sick' | 'dead';
}

export function FoodShop({ species, energy, gems, onPurchase, healthState }: FoodShopProps) {
  const availableFood = getFoodForSpecies(species).filter(isFoodAvailable);
  const canFeed = healthState !== 'dead';

  return (
    <div className="space-y-4">
      {/* Currency Display */}
      <div className="flex gap-3 justify-center">
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-400 border-3 border-black px-4 py-2 rounded-xl retro-shadow flex items-center gap-2">
          <span className="text-xl">⚡</span>
          <div>
            <div className="text-xs opacity-70 uppercase leading-tight">Energy</div>
            <div className="font-bold leading-tight">{energy}</div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-cyan-300 to-cyan-400 border-3 border-black px-4 py-2 rounded-xl retro-shadow flex items-center gap-2">
          <span className="text-xl">💎</span>
          <div>
            <div className="text-xs opacity-70 uppercase leading-tight">Gems</div>
            <div className="font-bold leading-tight">{gems}</div>
          </div>
        </div>
      </div>

      {/* Header Alert */}
      {healthState === 'sick' && (
        <Badge className="w-full justify-center bg-amber-400 text-black border-2 border-black py-2">
          ⚠️ Feed to Recover!
        </Badge>
      )}

      {!canFeed && (
        <div className="bg-red-300 border-2 border-black rounded-lg p-3">
          <p className="text-sm font-bold text-center">
            Food is not available for departed friends
          </p>
        </div>
      )}

      {/* Food Items */}
      <TooltipProvider>
        <div className="space-y-3">
          {availableFood.map((item) => {
            const canAfford = energy >= item.priceEnergy;
            const isDisabled = !canFeed || !canAfford;

            return (
              <motion.div
                key={item.id}
                className={`bg-white/90 rounded-lg border-3 border-black p-4 ${
                  isDisabled ? 'opacity-50' : ''
                }`}
                whileHover={!isDisabled ? { scale: 1.02 } : {}}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-2xl">{item.emoji}</span>
                      <h3 className="font-bold">{item.title}</h3>
                      {item.seasonal && (
                        <Sparkles className="w-4 h-4 text-amber-500" />
                      )}
                      
                      {/* Info Tooltip */}
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button className="ml-1 hover:bg-black/10 rounded-full p-1 transition-colors">
                            <Info className="w-4 h-4 text-gray-600" />
                          </button>
                        </TooltipTrigger>
                        <TooltipContent 
                          side="right" 
                          className="bg-white border-2 border-black p-3 max-w-xs"
                        >
                          <div className="space-y-2">
                            <div className="font-bold text-sm border-b border-gray-300 pb-1">
                              Food Effects
                            </div>
                            <div className="grid grid-cols-3 gap-2 text-xs">
                              <div className="bg-blue-100 rounded px-2 py-1 border border-black">
                                <div className="opacity-70 text-[10px]">Fullness</div>
                                <div className="font-bold">+{item.fullnessDelta}%</div>
                              </div>
                              <div className="bg-pink-100 rounded px-2 py-1 border border-black">
                                <div className="opacity-70 text-[10px]">Mood</div>
                                <div className="font-bold">+{item.moodDelta}</div>
                              </div>
                              <div className="bg-purple-100 rounded px-2 py-1 border border-black">
                                <div className="opacity-70 text-[10px]">Buff</div>
                                <div className="font-bold">+{(item.buffFrac * 100).toFixed(0)}%</div>
                              </div>
                            </div>
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-amber-300 border-2 border-black rounded-lg px-3 py-1">
                      <div className="font-bold text-lg">{item.priceEnergy} E</div>
                    </div>
                    
                    <Button
                      onClick={() => onPurchase(item)}
                      disabled={isDisabled}
                      size="sm"
                      className="border-2 border-black retro-shadow bg-gradient-to-r from-green-400 to-emerald-500 hover:from-green-500 hover:to-emerald-600 text-black font-bold"
                    >
                      {canAfford ? 'Feed' : 'Not Enough E'}
                    </Button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </TooltipProvider>

      {/* Energy Balance */}
      <div className="p-4 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-lg border-3 border-black retro-shadow">
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold">Your Energy:</span>
          <span className="text-2xl font-bold">{energy} E</span>
        </div>
        <p className="text-xs opacity-80">
          💡 Spend ≥100 E on food today to mark as "fed" and maintain health
        </p>
      </div>
    </div>
  );
}
