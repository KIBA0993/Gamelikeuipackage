import { motion } from 'motion/react';
import { useState } from 'react';
import { 
  ChevronRight, 
  Smartphone, 
  Cloud, 
  Zap, 
  Gem, 
  ShoppingCart,
  LayoutGrid,
  BarChart3,
  X,
  CheckCircle2,
  Info,
  Activity
} from 'lucide-react';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from './ui/sheet';
import { toast } from 'sonner@2.0.3';

interface SettingsProps {
  energy: number;
  gems: number;
  onClose: () => void;
  onBuyGems?: () => void;
  onShowTutorial?: () => void;
}

export function Settings({ energy, gems, onClose, onBuyGems, onShowTutorial }: SettingsProps) {
  const [screenTimeAuthorized, setScreenTimeAuthorized] = useState(false);
  const [widgetEnabled, setWidgetEnabled] = useState(true);
  const [detailedStatsEnabled, setDetailedStatsEnabled] = useState(true);
  const [dynamicIslandEnabled, setDynamicIslandEnabled] = useState(true);
  const [buyGemsOpen, setBuyGemsOpen] = useState(false);

  const handleAuthorizeScreenTime = () => {
    // Mock authorization for web
    toast.success('Screen Time Access Granted! 📱', {
      description: 'You can now earn Energy by tracking your usage'
    });
    setScreenTimeAuthorized(true);
  };

  const handleBuyGems = (amount: number, price: string) => {
    toast.success(`Purchased ${amount} Gems! 💎`, {
      description: `Transaction complete: ${price}`
    });
    setBuyGemsOpen(false);
    onBuyGems?.();
  };

  const gemPackages = [
    { amount: 100, price: '$0.99', bonus: '' },
    { amount: 500, price: '$3.99', bonus: '+50 Bonus', popular: true },
    { amount: 1200, price: '$7.99', bonus: '+200 Bonus' },
    { amount: 2500, price: '$14.99', bonus: '+500 Bonus', bestValue: true },
  ];

  return (
    <>
      {/* Settings Modal */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          className="bg-gray-50 w-full max-w-md h-[90vh] max-h-[800px] rounded-3xl overflow-hidden flex flex-col"
        >
          {/* Header */}
          <div className="bg-white p-6 pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold">Settings</h1>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {/* Usage Tracking Section */}
            <section className="p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Usage Tracking
              </h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Smartphone className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold">Screen Time Access</span>
                  </div>
                  {screenTimeAuthorized ? (
                    <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                      <CheckCircle2 className="w-4 h-4" />
                      Active
                    </span>
                  ) : (
                    <button
                      onClick={handleAuthorizeScreenTime}
                      className="text-blue-500 font-semibold text-sm hover:text-blue-600"
                    >
                      Authorize
                    </button>
                  )}
                </div>
                <p className="text-sm text-gray-500 ml-[52px]">
                  Grant Screen Time access to track your usage and earn Energy
                </p>
              </div>
            </section>

            <Separator className="bg-gray-200" />

            {/* Cloud Sync Section */}
            <section className="p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Cloud Sync
              </h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center">
                      <Cloud className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="font-semibold">iCloud Sync</span>
                  </div>
                  <span className="text-gray-400 text-sm">Not Available</span>
                </div>
                <p className="text-sm text-gray-500 ml-[52px]">
                  Sign in to iCloud in Settings to sync your progress across devices
                </p>
              </div>
            </section>

            <Separator className="bg-gray-200" />

            {/* Account Section */}
            <section className="p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Account
              </h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                {/* Energy Balance */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="font-semibold">Energy Balance</span>
                  </div>
                  <span className="font-bold text-lg flex items-center gap-1">
                    ⚡ {energy}
                  </span>
                </div>

                {/* Gems Balance */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-cyan-100 rounded-xl flex items-center justify-center">
                      <Gem className="w-5 h-5 text-cyan-600" />
                    </div>
                    <span className="font-semibold">Gems Balance</span>
                  </div>
                  <span className="font-bold text-lg flex items-center gap-1">
                    💎 {gems}
                  </span>
                </div>

                {/* Buy Gems */}
                <button
                  onClick={() => setBuyGemsOpen(true)}
                  className="p-4 flex items-center justify-between w-full hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <ShoppingCart className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold">Buy Gems</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </section>

            <Separator className="bg-gray-200" />

            {/* Help & Tutorial Section */}
            <section className="p-6">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Help & Tutorial
              </h2>
              
              <div className="bg-white rounded-2xl border border-gray-200">
                {/* Show Tutorial */}
                <button
                  onClick={() => {
                    onShowTutorial?.();
                    onClose();
                  }}
                  className="p-4 flex items-center justify-between w-full hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                      <Info className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="font-semibold">Show Tutorial</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>
            </section>

            <Separator className="bg-gray-200" />

            {/* Widgets & Live Activity Section */}
            <section className="p-6 pb-8">
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                Widgets & Live Activity
              </h2>
              
              <div className="bg-white rounded-2xl border border-gray-200 divide-y divide-gray-100">
                {/* Home Screen Widget */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <LayoutGrid className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="font-semibold">Home Screen Widget</span>
                  </div>
                  <Switch 
                    checked={widgetEnabled}
                    onCheckedChange={setWidgetEnabled}
                  />
                </div>

                {/* Dynamic Island Activity */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Activity className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="font-semibold">Dynamic Island Activity</span>
                  </div>
                  <Switch 
                    checked={dynamicIslandEnabled}
                    onCheckedChange={setDynamicIslandEnabled}
                  />
                </div>

                {/* Show Detailed Stats */}
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="font-semibold">Show Detailed Stats</span>
                  </div>
                  <Switch 
                    checked={detailedStatsEnabled}
                    onCheckedChange={setDetailedStatsEnabled}
                  />
                </div>
              </div>
            </section>

            {/* App Info */}
            <div className="px-6 pb-8 text-center text-sm text-gray-400">
              <p>Unhooked v2.0</p>
              <p className="mt-1">Build healthier phone habits 🌱</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Buy Gems Sheet */}
      <Sheet open={buyGemsOpen} onOpenChange={setBuyGemsOpen}>
        <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold flex items-center gap-2">
              <Gem className="w-6 h-6 text-cyan-500" />
              Buy Gems
            </SheetTitle>
            <SheetDescription>
              Use Gems to revive your pet or purchase special items
            </SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-3">
            {gemPackages.map((pkg, index) => (
              <motion.button
                key={index}
                onClick={() => handleBuyGems(pkg.amount, pkg.price)}
                className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${
                  pkg.popular 
                    ? 'border-purple-500 bg-purple-50 hover:bg-purple-100' 
                    : pkg.bestValue
                    ? 'border-green-500 bg-green-50 hover:bg-green-100'
                    : 'border-gray-200 bg-white hover:bg-gray-50'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-xl flex items-center gap-2">
                      💎 {pkg.amount}
                      {pkg.bonus && (
                        <span className="text-sm text-green-600 font-semibold">
                          {pkg.bonus}
                        </span>
                      )}
                    </div>
                    {pkg.popular && (
                      <div className="text-xs text-purple-600 font-semibold uppercase mt-1">
                        Most Popular
                      </div>
                    )}
                    {pkg.bestValue && (
                      <div className="text-xs text-green-600 font-semibold uppercase mt-1">
                        Best Value
                      </div>
                    )}
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-xl">{pkg.price}</div>
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Info */}
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-4 flex gap-3">
            <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-blue-900">
              Gems can be used to revive your pet if they become inactive. This is a one-time purchase and never expires.
            </p>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
