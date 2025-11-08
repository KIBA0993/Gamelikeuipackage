import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Settings, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface DebugPanelProps {
  onAddGems: (amount: number) => void;
  onSetUnfedDays: (days: number) => void;
  onResetGame: () => void;
  onAddGrowth?: (amount: number) => void;
  onSetTestState?: (scenario: 'healthy' | 'sick' | 'dead' | 'advanced') => void;
  onShowShowcase?: () => void;
  currentGems: number;
  currentUnfedDays: number;
  currentGrowth?: number;
}

export function DebugPanel({
  onAddGems,
  onSetUnfedDays,
  onResetGame,
  onAddGrowth,
  onSetTestState,
  onShowShowcase,
  currentGems,
  currentUnfedDays,
  currentGrowth = 0,
}: DebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [gemAmount, setGemAmount] = useState('100');
  const [unfedDays, setUnfedDays] = useState('0');
  const [growthAmount, setGrowthAmount] = useState('25');

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 left-4 bg-gray-800 text-white p-3 rounded-full border-2 border-white shadow-lg z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Settings className="w-6 h-6" />
      </motion.button>

      {/* Debug Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-20 left-4 bg-gray-900 text-white p-6 rounded-xl border-4 border-white shadow-2xl z-50 w-80"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">🔧 Debug Panel</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 rounded p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {/* Add Gems */}
              <div>
                <Label htmlFor="gem-amount" className="text-white mb-2 block">
                  Add Gems (Current: {currentGems})
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="gem-amount"
                    type="number"
                    value={gemAmount}
                    onChange={(e) => setGemAmount(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                  />
                  <Button
                    onClick={() => {
                      const amount = parseInt(gemAmount) || 0;
                      onAddGems(amount);
                      setGemAmount('100');
                    }}
                    size="sm"
                    className="bg-purple-500 hover:bg-purple-600"
                  >
                    Add
                  </Button>
                </div>
              </div>

              {/* Set Unfed Days */}
              <div>
                <Label htmlFor="unfed-days" className="text-white mb-2 block">
                  Set Unfed Days (Current: {currentUnfedDays})
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="unfed-days"
                    type="number"
                    value={unfedDays}
                    onChange={(e) => setUnfedDays(e.target.value)}
                    className="bg-gray-800 border-gray-600 text-white"
                    min="0"
                    max="10"
                  />
                  <Button
                    onClick={() => {
                      const days = parseInt(unfedDays) || 0;
                      onSetUnfedDays(days);
                    }}
                    size="sm"
                    className="bg-amber-500 hover:bg-amber-600"
                  >
                    Set
                  </Button>
                </div>
                <div className="text-xs mt-1 opacity-70">
                  3 = Sick, 7+ = Dead
                </div>
              </div>

              {/* Add Growth */}
              {onAddGrowth && (
                <div>
                  <Label htmlFor="growth-amount" className="text-white mb-2 block">
                    Add Growth (Current: {currentGrowth})
                  </Label>
                  <div className="flex gap-2">
                    <Input
                      id="growth-amount"
                      type="number"
                      value={growthAmount}
                      onChange={(e) => setGrowthAmount(e.target.value)}
                      className="bg-gray-800 border-gray-600 text-white"
                    />
                    <Button
                      onClick={() => {
                        const amount = parseInt(growthAmount) || 0;
                        onAddGrowth(amount);
                        setGrowthAmount('25');
                      }}
                      size="sm"
                      className="bg-blue-500 hover:bg-blue-600"
                    >
                      Add
                    </Button>
                  </div>
                  <div className="text-xs mt-1 opacity-70">
                    25/50/100/150/200 for stages
                  </div>
                </div>
              )}

              {/* Test Scenarios */}
              {onSetTestState && (
                <div className="border-t border-gray-700 pt-4">
                  <div className="text-xs mb-2 opacity-70">Test Scenarios:</div>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      onClick={() => onSetTestState('healthy')}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs"
                    >
                      🌟 Healthy
                    </Button>
                    <Button
                      onClick={() => onSetTestState('sick')}
                      size="sm"
                      className="bg-amber-600 hover:bg-amber-700 text-xs"
                    >
                      🤒 Sick
                    </Button>
                    <Button
                      onClick={() => onSetTestState('dead')}
                      size="sm"
                      className="bg-red-600 hover:bg-red-700 text-xs"
                    >
                      💀 Dead
                    </Button>
                    <Button
                      onClick={() => onSetTestState('advanced')}
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700 text-xs"
                    >
                      🚀 Advanced
                    </Button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="border-t border-gray-700 pt-4">
                <div className="text-xs mb-2 opacity-70">Quick Actions:</div>
                <div className="space-y-2">
                  {onShowShowcase && (
                    <Button
                      onClick={() => {
                        onShowShowcase();
                        setIsOpen(false);
                      }}
                      size="sm"
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xs"
                    >
                      🐾 View All Pet Stages
                    </Button>
                  )}
                  <Button
                    onClick={() => onSetUnfedDays(3)}
                    size="sm"
                    className="w-full bg-amber-600 hover:bg-amber-700 text-xs"
                  >
                    Make Sick (3 days)
                  </Button>
                  <Button
                    onClick={() => onSetUnfedDays(7)}
                    size="sm"
                    className="w-full bg-red-600 hover:bg-red-700 text-xs"
                  >
                    Make Dead (7 days)
                  </Button>
                  <Button
                    onClick={() => onSetUnfedDays(0)}
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-xs"
                  >
                    Make Healthy (0 days)
                  </Button>
                </div>
              </div>

              {/* Reset */}
              <div className="border-t border-gray-700 pt-4">
                <Button
                  onClick={() => {
                    if (confirm('Reset entire game? This cannot be undone.')) {
                      onResetGame();
                      setIsOpen(false);
                    }
                  }}
                  size="sm"
                  variant="destructive"
                  className="w-full"
                >
                  Reset Entire Game
                </Button>
              </div>

              <div className="text-xs opacity-50 text-center">
                Debug tools for testing only
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
