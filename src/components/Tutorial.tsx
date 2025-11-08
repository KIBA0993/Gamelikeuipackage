import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Zap, Heart, Sparkles, TrendingUp, AlertTriangle, X } from 'lucide-react';
import { Button } from './ui/button';
import { PixelPet } from './PixelPet';

interface TutorialProps {
  onComplete: () => void;
  onSkip: () => void;
}

const tutorialSteps = [
  {
    title: "Welcome to Unhooked! 🎮",
    description: "Build healthier phone habits while caring for your virtual friend",
    icon: <Sparkles className="w-12 h-12 text-yellow-500" />,
    color: "from-purple-400 to-pink-500"
  },
  {
    title: "Earn Energy ⚡",
    description: "Stay under your daily screen time limit to earn Energy. The less time you spend on your phone, the more Energy you'll collect!",
    icon: <Zap className="w-12 h-12 text-yellow-500" />,
    color: "from-yellow-400 to-orange-500",
    showPet: true
  },
  {
    title: "Feed Your Friend 🍖",
    description: "Spend Energy on food to keep your pet happy and healthy. Different foods have different effects!",
    icon: <Heart className="w-12 h-12 text-pink-500" />,
    color: "from-green-400 to-emerald-500",
    showPet: true
  },
  {
    title: "Watch Them Grow 📈",
    description: "Feed your pet daily to help them grow through 5 evolution stages. Consistent care leads to growth!",
    icon: <TrendingUp className="w-12 h-12 text-green-500" />,
    color: "from-blue-400 to-cyan-500",
    showPet: true
  },
  {
    title: "Keep Them Healthy ❤️",
    description: "Missing meals can make your pet sick. Feed them daily to keep them happy and avoid the recovery cost!",
    icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
    color: "from-red-400 to-rose-500",
    showHealthStates: true
  },
  {
    title: "Ready to Start! 🎉",
    description: "Your new friend is waiting! Check in daily, earn Energy, and watch them thrive.",
    icon: <Sparkles className="w-12 h-12 text-purple-500" />,
    color: "from-purple-400 to-pink-500",
    showPet: true
  }
];

export function Tutorial({ onComplete, onSkip }: TutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const step = tutorialSteps[currentStep];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl border-4 border-black retro-shadow max-w-lg w-full overflow-hidden"
      >
        {/* Skip Button */}
        <div className="flex justify-end p-4 pb-0">
          <button
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8 pt-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Icon/Visual */}
              <div className={`bg-gradient-to-br ${step.color} rounded-2xl border-3 border-black p-8 mb-6 flex flex-col items-center justify-center min-h-[240px]`}>
                {step.showPet && (
                  <PixelPet 
                    stage={currentStep === 3 ? 2 : 0} 
                    mood="happy"
                    isActive={true}
                    petType="cat"
                    healthState="healthy"
                  />
                )}
                {step.showHealthStates && (
                  <div className="flex gap-4 items-center">
                    <div className="text-center">
                      <PixelPet stage={0} mood="happy" isActive={true} petType="cat" healthState="healthy" />
                      <div className="mt-2 text-sm font-bold">Healthy</div>
                    </div>
                    <div className="text-3xl">→</div>
                    <div className="text-center">
                      <PixelPet stage={0} mood="sad" isActive={true} petType="cat" healthState="sick" />
                      <div className="mt-2 text-sm font-bold text-yellow-600">Sick</div>
                    </div>
                    <div className="text-3xl">→</div>
                    <div className="text-center opacity-50">
                      <PixelPet stage={0} mood="sad" isActive={false} petType="cat" healthState="dead" />
                      <div className="mt-2 text-sm font-bold text-gray-500">Dead</div>
                    </div>
                  </div>
                )}
                {!step.showPet && !step.showHealthStates && (
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {step.icon}
                  </motion.div>
                )}
              </div>

              {/* Text */}
              <h2 className="text-3xl font-bold mb-3 text-center">{step.title}</h2>
              <p className="text-gray-600 text-center leading-relaxed mb-6">
                {step.description}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Progress Dots */}
          <div className="flex justify-center gap-2 mb-6">
            {tutorialSteps.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentStep 
                    ? 'w-8 bg-purple-500' 
                    : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-3">
            {currentStep > 0 && (
              <Button
                onClick={handlePrevious}
                variant="outline"
                className="flex-1 border-2 border-black"
              >
                <ChevronLeft className="w-5 h-5 mr-1" />
                Back
              </Button>
            )}
            <Button
              onClick={handleNext}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-2 border-black"
            >
              {currentStep === tutorialSteps.length - 1 ? "Let's Go!" : "Next"}
              {currentStep < tutorialSteps.length - 1 && <ChevronRight className="w-5 h-5 ml-1" />}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
