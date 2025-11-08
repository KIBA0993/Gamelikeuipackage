import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, X, AlertTriangle } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { RECOVERY_CONFIG } from '../types/game';

type RecoveryAction = 'cure' | 'revive' | 'restart';

interface RecoveryModalProps {
  open: boolean;
  onClose: () => void;
  action: RecoveryAction;
  gems: number;
  onConfirm: (action: RecoveryAction) => void;
}

const RECOVERY_INFO = {
  cure: {
    title: 'Vet Cure',
    icon: Heart,
    cost: RECOVERY_CONFIG.cureSickGems,
    description: 'Your friend will immediately return to healthy state',
    effect: '✓ Immediately healthy\n✓ Reset unfed counter\n✓ Buff cap restored to +25%',
    warning: 'This does not grant retroactive growth',
    cooldown: `${RECOVERY_CONFIG.cureCooldownH}h`,
    limit: `Max ${RECOVERY_CONFIG.cureMaxPer30d} per 30 days`,
    color: 'from-green-400 to-emerald-500',
    successMessage: 'All better. Take it easy today.',
  },
  revive: {
    title: 'Revive Friend',
    icon: Sparkles,
    cost: RECOVERY_CONFIG.reviveDeadGems,
    description: 'Bring your friend back from the departed',
    effect: '✓ Immediately healthy\n✓ Reset unfed counter\n⚠ Fragile for 3 days (buff cap +15%)',
    warning: 'This does not grant retroactive growth',
    cooldown: `${RECOVERY_CONFIG.reviveCooldownH}h (7 days)`,
    limit: `Max ${RECOVERY_CONFIG.reviveMaxPer90d} per 90 days`,
    color: 'from-purple-400 to-pink-500',
    successMessage: 'Back with us. Be gentle for a few days.',
  },
  restart: {
    title: 'Start Over',
    icon: RotateCcw,
    cost: RECOVERY_CONFIG.restartGems,
    description: 'Begin again with a new friend',
    effect: '✓ New pet at Stage 0\n✓ Keep cosmetics & items\n✓ Memories preserved',
    warning: 'Your current pet will be remembered but cannot return',
    cooldown: `${RECOVERY_CONFIG.restartCooldownH}h`,
    limit: 'No monthly limit',
    color: 'from-cyan-400 to-blue-500',
    successMessage: 'A fresh start begins now.',
  },
};

export function RecoveryModal({ open, onClose, action, gems, onConfirm }: RecoveryModalProps) {
  const [confirmed, setConfirmed] = useState(false);
  const [showUndo, setShowUndo] = useState(false);
  
  const info = RECOVERY_INFO[action];
  const Icon = info.icon;
  const canAfford = gems >= info.cost;

  const handleConfirm = () => {
    if (action === 'restart' && !confirmed) {
      setConfirmed(true);
      return;
    }
    
    onConfirm(action);
    
    if (action === 'restart') {
      // Show 10-second undo grace period
      setShowUndo(true);
      setTimeout(() => setShowUndo(false), 10000);
    }
    
    onClose();
    setConfirmed(false);
  };

  const handleClose = () => {
    setConfirmed(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className={`border-4 border-black retro-shadow bg-gradient-to-br ${info.color} max-w-md`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Icon className="w-6 h-6" />
            {info.title}
          </DialogTitle>
          <DialogDescription className="text-black">
            {info.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 my-4">
          {/* Cost */}
          <div className="bg-white/90 border-3 border-black rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <span className="font-bold">Cost:</span>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{info.cost}</span>
                <span className="text-xl">💎</span>
              </div>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="opacity-70">Your Gems:</span>
              <span className={`font-bold ${canAfford ? 'text-green-600' : 'text-red-600'}`}>
                {gems} 💎
              </span>
            </div>
          </div>

          {/* Effects */}
          <div className="bg-white/90 border-3 border-black rounded-lg p-4">
            <div className="font-bold mb-2">Effects:</div>
            <div className="text-sm whitespace-pre-line">{info.effect}</div>
          </div>

          {/* Warning */}
          <div className="bg-amber-100 border-3 border-black rounded-lg p-3 flex items-start gap-2">
            <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="text-sm">{info.warning}</div>
          </div>

          {/* Limits */}
          <div className="bg-white/90 border-2 border-black rounded-lg p-3 text-sm space-y-1">
            <div className="flex justify-between">
              <span className="opacity-70">Cooldown:</span>
              <span className="font-bold">{info.cooldown}</span>
            </div>
            <div className="flex justify-between">
              <span className="opacity-70">Limit:</span>
              <span className="font-bold">{info.limit}</span>
            </div>
          </div>

          {/* Restart double confirmation */}
          {action === 'restart' && !confirmed && (
            <div className="bg-red-100 border-3 border-black rounded-lg p-4">
              <p className="font-bold text-center mb-2">⚠️ Are you absolutely sure?</p>
              <p className="text-sm text-center">
                This action cannot be undone after 10 seconds
              </p>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2">
          <Button
            onClick={handleClose}
            variant="outline"
            className="border-2 border-black font-bold"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          
          <Button
            onClick={handleConfirm}
            disabled={!canAfford}
            className={`border-3 border-black retro-shadow font-bold bg-gradient-to-r ${info.color}`}
          >
            {!canAfford && 'Not Enough Gems'}
            {canAfford && action === 'restart' && !confirmed && 'Yes, Start Over'}
            {canAfford && action === 'restart' && confirmed && 'CONFIRM RESTART'}
            {canAfford && action !== 'restart' && `Spend ${info.cost} Gems`}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Undo toast for Restart */}
      <AnimatePresence>
        {showUndo && (
          <motion.div
            className="fixed bottom-4 right-4 bg-black text-white p-4 rounded-lg border-2 border-white z-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            <p className="font-bold">Restart initiated</p>
            <p className="text-sm opacity-80">10 seconds to undo...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </Dialog>
  );
}
