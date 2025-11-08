import { motion } from 'motion/react';
import { Info } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from './ui/hover-card';

export function MultiplierInfo() {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.button
          className="p-2 bg-blue-500 rounded-full border-2 border-black retro-shadow hover:bg-blue-600"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Info className="w-5 h-5 text-white" />
        </motion.button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 border-4 border-black retro-shadow bg-gradient-to-br from-purple-100 to-blue-100">
        <div className="space-y-3">
          <h3 className="font-bold uppercase text-lg border-b-2 border-black pb-2">
            How It Works
          </h3>
          
          <div className="space-y-2 text-sm">
            <div className="p-2 bg-white rounded border-2 border-black">
              <div className="font-bold text-green-600">✓ When U ≤ L (Under Limit)</div>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• U/L ≤ 15%: <span className="font-bold text-purple-600">×1.1 multiplier</span></li>
                <li>• U/L ≤ 25%: <span className="font-bold text-purple-600">×1.2 multiplier</span></li>
                <li>• U/L ≤ 50%: <span className="font-bold text-purple-600">×1.5 multiplier</span></li>
                <li>• U/L &gt; 50%: <span className="font-bold">×1.0 multiplier</span></li>
              </ul>
            </div>

            <div className="p-2 bg-white rounded border-2 border-black">
              <div className="font-bold text-red-600">✗ When U &gt; L (Exceeded)</div>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• No progress gained (×0.0)</li>
                <li>• Exceed streak increases</li>
                <li>• Good streak resets</li>
              </ul>
            </div>

            <div className="p-2 bg-white rounded border-2 border-black">
              <div className="font-bold text-orange-600">⚠ Special: Limit &gt; 180 min</div>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• No progress gained</li>
                <li>• Prevents gaming the system</li>
              </ul>
            </div>

            <div className="p-2 bg-yellow-100 rounded border-2 border-black">
              <div className="font-bold text-amber-700">🔥 Streak Bonus</div>
              <ul className="mt-1 space-y-1 ml-4">
                <li>• Keep U/L ≤ 50% for 7+ days</li>
                <li>• Multiplier bonus reduces over time</li>
                <li>• Formula: 1 + (m - 1) / 2^weeks</li>
              </ul>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
