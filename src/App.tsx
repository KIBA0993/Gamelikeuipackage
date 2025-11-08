import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Toaster, toast } from "sonner@2.0.3";
import { Heart, Sparkles, UtensilsCrossed } from "lucide-react";

// Components
import { PixelPet } from "./components/PixelPet";
import { PetBackground } from "./components/PetBackground";
import { CurrencyDisplay } from "./components/CurrencyDisplay";
import { DailyCheckIn } from "./components/DailyCheckIn";
import { FoodShop } from "./components/FoodShop";
import { HealthBanner } from "./components/HealthBanner";
import { RecoveryModal } from "./components/RecoveryModal";
import { ProgressBar } from "./components/ProgressBar";
import { StageIndicator } from "./components/StageIndicator";
import { DebugPanel } from "./components/DebugPanel";
import { PetActions } from "./components/PetActions";
import { Tutorial } from "./components/Tutorial";
import { Settings } from "./components/Settings";
import { StageDetails } from "./components/StageDetails";
import { EvolutionAnimation } from "./components/EvolutionAnimation";
import { PetShowcase } from "./components/PetShowcase";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "./components/ui/sheet";
import { Button } from "./components/ui/button";

// Types & Utils
import {
  GameState,
  FoodItem,
  EVOLUTION_STAGES,
  RECOVERY_CONFIG,
} from "./types/game";
import {
  calculateEnergyAward,
  calculateDailyGrowth,
  isFragile,
  getBuffCap,
} from "./utils/economy";
import {
  getHealthStateFromUnfedDays,
  isActionAllowed,
} from "./utils/health";

// Initial state
const INITIAL_STATE: GameState = {
  species: "cat",
  stage: 0,
  growthProgress: 0,
  healthState: "healthy",
  consecutiveUnfedDays: 0,
  fragileUntil: null,
  deadAt: null,
  fedToday: false,
  todayBuff: 0,
  todayFoodSpend: 0,
  energy: 50, // Starting energy
  gems: 0,
  fullness: 50,
  mood: 3,
  currentUsage: 0,
  currentLimit: 120,
  lastEnergyAward: 0,
  lastCureAt: null,
  cureCount30d: 0,
  lastReviveAt: null,
  reviveCount90d: 0,
  lastRestartAt: null,
  lastResetDate: new Date().toISOString().split("T")[0],
  createdAt: new Date(),
};

export default function App() {
  const [gameState, setGameState] =
    useState<GameState>(INITIAL_STATE);
  const [recoveryModalOpen, setRecoveryModalOpen] =
    useState(false);
  const [recoveryAction, setRecoveryAction] = useState<
    "cure" | "revive" | "restart"
  >("cure");
  const [foodShopOpen, setFoodShopOpen] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState<
    "idle" | "trick" | "pet" | "nap" | "eating"
  >("idle");
  const [trickVariant, setTrickVariant] = useState(0);
  const [showTutorial, setShowTutorial] = useState(false); // Set to true for first-time users
  const [showSettings, setShowSettings] = useState(false);
  const [showStageDetails, setShowStageDetails] =
    useState(false);
  const [feedingAnimation, setFeedingAnimation] = useState<{
    active: boolean;
    foodEmoji: string;
    variant: number;
  }>({ active: false, foodEmoji: "🍖", variant: 0 });
  const [evolutionAnimation, setEvolutionAnimation] = useState<{
    show: boolean;
    fromStage: number;
    toStage: number;
  }>({ show: false, fromStage: 0, toStage: 0 });
  const [previousStage, setPreviousStage] = useState(0);
  const [showShowcase, setShowShowcase] = useState(false);

  // Calculate current stage
  const currentStage = EVOLUTION_STAGES.findIndex(
    (stage, index) => {
      const nextStage = EVOLUTION_STAGES[index + 1];
      return (
        gameState.growthProgress >= stage.threshold &&
        (!nextStage ||
          gameState.growthProgress < nextStage.threshold)
      );
    },
  );

  const nextStageThreshold =
    EVOLUTION_STAGES[currentStage + 1]?.threshold ||
    EVOLUTION_STAGES[EVOLUTION_STAGES.length - 1].threshold;

  // Detect stage evolution
  useEffect(() => {
    if (currentStage > previousStage && previousStage >= 0) {
      // Stage up detected!
      setEvolutionAnimation({
        show: true,
        fromStage: previousStage,
        toStage: currentStage,
      });

      // Play celebration sound effect if available
      toast.success("🎉 Evolution!", {
        description: `Your pet evolved to ${EVOLUTION_STAGES[currentStage]?.name}!`,
        duration: 5000,
      });
    }
    setPreviousStage(currentStage);
  }, [currentStage]);

  // Determine pet mood
  const getPetMood = (): "happy" | "neutral" | "sad" => {
    if (
      gameState.healthState === "dead" ||
      gameState.healthState === "sick"
    )
      return "sad";
    if (gameState.fullness > 70 && gameState.mood >= 4)
      return "happy";
    if (gameState.fullness < 30) return "sad";
    return "neutral";
  };

  // Load game state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("unhookedGameState");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        if (parsed.fragileUntil)
          parsed.fragileUntil = new Date(parsed.fragileUntil);
        if (parsed.deadAt)
          parsed.deadAt = new Date(parsed.deadAt);
        if (parsed.lastCureAt)
          parsed.lastCureAt = new Date(parsed.lastCureAt);
        if (parsed.lastReviveAt)
          parsed.lastReviveAt = new Date(parsed.lastReviveAt);
        if (parsed.lastRestartAt)
          parsed.lastRestartAt = new Date(parsed.lastRestartAt);
        if (parsed.createdAt)
          parsed.createdAt = new Date(parsed.createdAt);

        setGameState(parsed);
        toast.info("👋 Welcome back!", {
          description: "Your friend is waiting!",
        });
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  // Save game state to localStorage
  const saveGameState = (newState: GameState) => {
    setGameState(newState);
    localStorage.setItem(
      "unhookedGameState",
      JSON.stringify(newState),
    );
  };

  // Daily reset check
  useEffect(() => {
    const checkDailyReset = () => {
      const today = new Date().toISOString().split("T")[0];
      if (today !== gameState.lastResetDate) {
        handleDailyReset();
      }
    };

    checkDailyReset();
    const interval = setInterval(checkDailyReset, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [gameState.lastResetDate]);

  // Handle daily reset (00:00 local time)
  const handleDailyReset = () => {
    const newState = { ...gameState };
    const today = new Date().toISOString().split("T")[0];

    // Check if fed yesterday
    if (!newState.fedToday) {
      newState.consecutiveUnfedDays += 1;
    } else {
      newState.consecutiveUnfedDays = 0;
    }

    // Update health state based on consecutive unfed days
    newState.healthState = getHealthStateFromUnfedDays(
      newState.consecutiveUnfedDays,
    );

    // Mark dead timestamp
    if (newState.healthState === "dead" && !newState.deadAt) {
      newState.deadAt = new Date();
    }

    // Apply growth if healthy
    if (newState.healthState === "healthy") {
      const isFrag = isFragile(newState.fragileUntil);
      const growth = calculateDailyGrowth(
        newState.lastEnergyAward,
        newState.todayBuff,
        newState.healthState,
      );
      newState.growthProgress = Math.min(
        200,
        newState.growthProgress + growth,
      );
    }

    // Reset daily flags
    newState.fedToday = false;
    newState.todayBuff = 0;
    newState.todayFoodSpend = 0;
    newState.lastResetDate = today;

    saveGameState(newState);
    toast.info("🌅 New day!", {
      description: "Daily reset complete",
    });
  };

  // Handle daily check-in (usage submission)
  const handleCheckIn = (usage: number, limit: number) => {
    const energyAwarded = calculateEnergyAward(usage, limit);

    // Only update if values actually changed
    if (
      usage === gameState.currentUsage &&
      limit === gameState.currentLimit
    ) {
      return;
    }

    const newState = {
      ...gameState,
      currentUsage: usage,
      currentLimit: limit,
      lastEnergyAward: energyAwarded,
    };

    saveGameState(newState);

    // Only show toast if there's a meaningful update
    const ratio = limit > 0 ? usage / limit : 0;
    if (ratio <= 0.5) {
      toast.success(`📊 Usage updated!`, {
        description: `${usage} / ${limit} min — Great control!`,
      });
    } else if (ratio < 1.0) {
      toast.info(`📊 Usage updated`, {
        description: `${usage} / ${limit} min — ${(ratio * 100).toFixed(0)}% of limit`,
      });
    } else {
      toast.warning("📊 Usage updated", {
        description: `${usage} / ${limit} min — Over limit!`,
      });
    }
  };

  // Handle food purchase
  const handleFoodPurchase = (item: FoodItem) => {
    if (gameState.energy < item.priceEnergy) {
      toast.error("Not enough Energy!");
      return;
    }

    if (gameState.healthState === "dead") {
      toast.error("Cannot feed a departed friend");
      return;
    }

    const newState = { ...gameState };

    // Deduct energy
    newState.energy -= item.priceEnergy;

    // Update fullness and mood
    newState.fullness = Math.min(
      100,
      newState.fullness + item.fullnessDelta,
    );
    newState.mood = Math.min(5, newState.mood + item.moodDelta);

    // Track food spending
    newState.todayFoodSpend += item.priceEnergy;

    // Check if fedToday threshold met
    if (newState.todayFoodSpend >= 100 && !newState.fedToday) {
      newState.fedToday = true;
      toast.success("✨ Fed for today!", {
        description:
          "Your friend is well-fed and health will be maintained",
        duration: 5000,
      });
    }

    // Add to daily buff (with cap)
    const buffCap = getBuffCap(
      newState.healthState,
      isFragile(newState.fragileUntil),
    );
    newState.todayBuff = Math.min(
      buffCap,
      newState.todayBuff + item.buffFrac,
    );

    saveGameState(newState);
    toast.success(`Fed ${item.title}!`, {
      description: `+${item.fullnessDelta}% fullness, +${item.moodDelta} mood`,
    });

    // Trigger feeding animation with random variant
    const variant = Math.floor(Math.random() * 3); // 3 different feeding animations
    setFeedingAnimation({
      active: true,
      foodEmoji: item.emoji,
      variant,
    });
    setCurrentAnimation("eating");

    // Reset animation
    setTimeout(() => {
      setFeedingAnimation({
        active: false,
        foodEmoji: "🍖",
        variant: 0,
      });
      setCurrentAnimation("idle");
    }, 2000);

    // Close food shop after purchase
    setFoodShopOpen(false);
  };

  // Handle mood change from interactions
  const handleMoodChange = (delta: number) => {
    const newState = { ...gameState };
    newState.mood = Math.min(
      5,
      Math.max(0, newState.mood + delta),
    );
    saveGameState(newState);
  };

  // Handle animation trigger
  const handleTriggerAnimation = (
    animation: "trick" | "pet" | "nap",
    variant?: number,
  ) => {
    setCurrentAnimation(animation);

    // Store trick variant if provided
    if (animation === "trick" && variant !== undefined) {
      setTrickVariant(variant);
    }

    // Reset to idle after animation completes
    // Different durations based on animation type and variant
    let duration = 600; // default
    if (animation === "trick") {
      const trickDurations = [800, 1000, 900, 700, 1200]; // matches animation durations
      duration = trickDurations[variant || 0];
    } else if (animation === "nap") {
      duration = 4500;
    }

    setTimeout(() => {
      setCurrentAnimation("idle");
    }, duration);
  };

  // Handle recovery actions
  const handleRecovery = (
    action: "cure" | "revive" | "restart",
  ) => {
    const newState = { ...gameState };

    switch (action) {
      case "cure":
        if (gameState.gems < RECOVERY_CONFIG.cureSickGems) {
          toast.error("Not enough Gems");
          return;
        }
        newState.gems -= RECOVERY_CONFIG.cureSickGems;
        newState.healthState = "healthy";
        newState.consecutiveUnfedDays = 0;
        newState.lastCureAt = new Date();
        newState.cureCount30d += 1;
        toast.success("All better. Take it easy today.");
        break;

      case "revive":
        if (gameState.gems < RECOVERY_CONFIG.reviveDeadGems) {
          toast.error("Not enough Gems");
          return;
        }
        newState.gems -= RECOVERY_CONFIG.reviveDeadGems;
        newState.healthState = "healthy";
        newState.consecutiveUnfedDays = 0;
        newState.deadAt = null;
        newState.lastReviveAt = new Date();
        newState.reviveCount90d += 1;

        // Set fragile period
        const fragileEnd = new Date();
        fragileEnd.setDate(
          fragileEnd.getDate() + RECOVERY_CONFIG.fragileDays,
        );
        newState.fragileUntil = fragileEnd;

        toast.success(
          "Back with us. Be gentle for a few days.",
          {
            description: `Fragile for ${RECOVERY_CONFIG.fragileDays} days`,
            duration: 5000,
          },
        );
        break;

      case "restart":
        if (gameState.gems < RECOVERY_CONFIG.restartGems) {
          toast.error("Not enough Gems");
          return;
        }
        newState.gems -= RECOVERY_CONFIG.restartGems;
        newState.stage = 0;
        newState.growthProgress = 0;
        newState.healthState = "healthy";
        newState.consecutiveUnfedDays = 0;
        newState.deadAt = null;
        newState.fragileUntil = null;
        newState.fullness = 50;
        newState.mood = 3;
        newState.fedToday = false;
        newState.todayBuff = 0;
        newState.todayFoodSpend = 0;
        newState.lastRestartAt = new Date();
        newState.createdAt = new Date();

        toast.success("A fresh start begins now.", {
          description:
            "Your previous friend will be remembered",
          duration: 5000,
        });
        break;
    }

    saveGameState(newState);
  };

  // Open recovery modal
  const openRecoveryModal = (
    action: "cure" | "revive" | "restart",
  ) => {
    setRecoveryAction(action);
    setRecoveryModalOpen(true);
  };

  // Debug functions
  const handleAddGems = (amount: number) => {
    const newState = {
      ...gameState,
      gems: gameState.gems + amount,
    };
    saveGameState(newState);
    toast.success(`Added ${amount} Gems (Debug)`);
  };

  const handleSetUnfedDays = (days: number) => {
    const newState = {
      ...gameState,
      consecutiveUnfedDays: days,
    };
    newState.healthState = getHealthStateFromUnfedDays(days);
    if (newState.healthState === "dead" && !newState.deadAt) {
      newState.deadAt = new Date();
    } else if (newState.healthState !== "dead") {
      newState.deadAt = null;
    }
    saveGameState(newState);
    toast.info(`Set unfed days to ${days} (Debug)`);
  };

  const handleResetGame = () => {
    localStorage.removeItem("unhookedGameState");
    setGameState(INITIAL_STATE);
    toast.success("Game reset!");
  };

  const handleAddGrowth = (amount: number) => {
    const newState = {
      ...gameState,
      growthProgress: gameState.growthProgress + amount,
    };
    saveGameState(newState);
    toast.success(`Added ${amount} growth points (Debug)`);
  };

  // Quick test state setters
  const setTestState = (
    scenario: "healthy" | "sick" | "dead" | "advanced",
  ) => {
    let newState = { ...INITIAL_STATE };

    switch (scenario) {
      case "healthy":
        // Fresh healthy pet with some resources
        newState = {
          ...INITIAL_STATE,
          energy: 100,
          gems: 50,
          fullness: 80,
          mood: 4,
          growthProgress: 20,
        };
        toast.success("Test State: Healthy Pet");
        break;

      case "sick":
        // Sick pet needing attention
        newState = {
          ...INITIAL_STATE,
          healthState: "sick",
          consecutiveUnfedDays: 2,
          energy: 150,
          gems: 100,
          fullness: 20,
          mood: 1,
          growthProgress: 50,
        };
        toast.warning("Test State: Sick Pet");
        break;

      case "dead":
        // Dead pet for testing recovery
        newState = {
          ...INITIAL_STATE,
          healthState: "dead",
          consecutiveUnfedDays: 4,
          deadAt: new Date(),
          energy: 50,
          gems: 200,
          fullness: 0,
          mood: 0,
          growthProgress: 75,
        };
        toast.error("Test State: Dead Pet");
        break;

      case "advanced":
        // Advanced pet with high stats
        newState = {
          ...INITIAL_STATE,
          growthProgress: 350,
          energy: 200,
          gems: 150,
          fullness: 90,
          mood: 5,
          todayBuff: 15,
        };
        toast.success("Test State: Advanced Pet (Stage 3-4)");
        break;
    }

    localStorage.removeItem("unhookedGameState");
    setGameState(newState);
  };

  // If showcase is active, show it instead
  if (showShowcase) {
    return (
      <>
        <PetShowcase />
        <Button
          onClick={() => setShowShowcase(false)}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-white hover:bg-gray-700"
        >
          ← Back to Game
        </Button>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200">
      <Toaster position="top-center" richColors />

      {/* Health Banner - Floating */}
      {gameState.healthState !== "healthy" && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 w-full max-w-2xl px-4">
          <HealthBanner
            healthState={gameState.healthState}
            consecutiveUnfedDays={
              gameState.consecutiveUnfedDays
            }
            onFeed={() => setFoodShopOpen(true)}
            onCure={() => openRecoveryModal("cure")}
            onRevive={() => openRecoveryModal("revive")}
            onRestart={() => openRecoveryModal("restart")}
          />
        </div>
      )}

      {/* Pet Display - Full Screen */}
      <div className="h-screen flex flex-col">
        {/* Time Tracker - Compact at top */}
        <div className="p-4 max-w-2xl mx-auto w-full">
          <DailyCheckIn
            onCheckIn={handleCheckIn}
            currentUsage={gameState.currentUsage}
            currentLimit={gameState.currentLimit}
          />
        </div>

        {/* Pet Display with Background - Takes remaining space */}
        <div className="flex-1 relative overflow-hidden">
          {/* Dynamic Background with integrated stats, actions menu, feed button, and settings */}
          <PetBackground
            stage={currentStage}
            fullness={gameState.fullness}
            mood={gameState.mood}
            onFeedClick={() => setFoodShopOpen(true)}
            onSettingsClick={() => setShowSettings(true)}
            onStageClick={() => setShowStageDetails(true)}
            stageName={EVOLUTION_STAGES[currentStage]?.name}
            speciesEmoji={
              gameState.species === "cat" ? "🐱" : "🐶"
            }
            totalStages={EVOLUTION_STAGES.length}
            feedingAnimation={feedingAnimation}
            petActionsMenu={
              <PetActions
                healthState={gameState.healthState}
                mood={gameState.mood}
                onMoodChange={handleMoodChange}
                onTriggerAnimation={handleTriggerAnimation}
                inBackground={true}
              />
            }
          />

          {/* Pet (rendered above background) - positioned on ground */}
          <div className="absolute inset-0 flex items-end justify-center z-10 pointer-events-none pb-24">
            <PixelPet
              stage={currentStage}
              mood={getPetMood()}
              isActive={gameState.healthState === "healthy"}
              petType={gameState.species}
              healthState={gameState.healthState}
              currentAnimation={currentAnimation}
              trickVariant={trickVariant}
            />
          </div>
        </div>
      </div>

      {/* Food Shop Sheet */}
      <Sheet open={foodShopOpen} onOpenChange={setFoodShopOpen}>
        <SheetContent
          side="right"
          className="w-full sm:max-w-lg overflow-y-auto"
        >
          <SheetHeader>
            <SheetTitle className="text-2xl font-bold flex items-center gap-2">
              <UtensilsCrossed className="w-6 h-6" />
              Food Shop
            </SheetTitle>
            <SheetDescription>
              Purchase food to keep your pet healthy and happy
            </SheetDescription>
          </SheetHeader>
          <div className="mt-6">
            <FoodShop
              species={gameState.species}
              energy={gameState.energy}
              gems={gameState.gems}
              onPurchase={handleFoodPurchase}
              healthState={gameState.healthState}
            />
          </div>
        </SheetContent>
      </Sheet>

      {/* Recovery Modal */}
      <RecoveryModal
        open={recoveryModalOpen}
        onClose={() => setRecoveryModalOpen(false)}
        action={recoveryAction}
        gems={gameState.gems}
        onConfirm={handleRecovery}
      />

      {/* Debug Panel (bottom-left corner) */}
      <DebugPanel
        onAddGems={handleAddGems}
        onSetUnfedDays={handleSetUnfedDays}
        onResetGame={handleResetGame}
        onAddGrowth={handleAddGrowth}
        onSetTestState={setTestState}
        currentGems={gameState.gems}
        currentUnfedDays={gameState.consecutiveUnfedDays}
        currentGrowth={gameState.growthProgress}
      />

      {/* Tutorial Modal */}
      {showTutorial && (
        <Tutorial
          onComplete={() => {
            setShowTutorial(false);
            localStorage.setItem(
              "unhookedTutorialComplete",
              "true",
            );
            toast.success("Welcome to Unhooked! 🎉", {
              description:
                "Let's build healthier phone habits together!",
            });
          }}
          onSkip={() => {
            setShowTutorial(false);
            localStorage.setItem(
              "unhookedTutorialComplete",
              "true",
            );
          }}
        />
      )}

      {/* Settings Modal */}
      {showSettings && (
        <Settings
          energy={gameState.energy}
          gems={gameState.gems}
          onClose={() => setShowSettings(false)}
          onBuyGems={() => {
            setGameState((prev) => ({
              ...prev,
              gems: prev.gems + 500,
            }));
          }}
          onShowTutorial={() => setShowTutorial(true)}
        />
      )}

      {/* Stage Details Modal */}
      {showStageDetails && (
        <StageDetails
          open={showStageDetails}
          onClose={() => setShowStageDetails(false)}
          growthProgress={gameState.growthProgress}
          currentStage={currentStage}
          stageName={EVOLUTION_STAGES[currentStage]?.name}
          nextStageThreshold={nextStageThreshold}
          totalStages={EVOLUTION_STAGES.length}
          speciesEmoji={
            gameState.species === "cat" ? "🐱" : "🐶"
          }
        />
      )}

      {/* Evolution Animation */}
      <EvolutionAnimation
        show={evolutionAnimation.show}
        fromStage={evolutionAnimation.fromStage}
        toStage={evolutionAnimation.toStage}
        stageName={
          EVOLUTION_STAGES[evolutionAnimation.toStage]?.name ||
          ""
        }
        speciesEmoji={gameState.species === "cat" ? "🐱" : "🐶"}
        onComplete={() =>
          setEvolutionAnimation({
            show: false,
            fromStage: 0,
            toStage: 0,
          })
        }
      />

      {/* Debug Panel */}
      <DebugPanel
        onAddGems={(amount) =>
          setGameState((prev) => ({
            ...prev,
            gems: prev.gems + amount,
          }))
        }
        onSetUnfedDays={(days) => {
          setGameState((prev) => ({
            ...prev,
            consecutiveUnfedDays: days,
            healthState: getHealthStateFromUnfedDays(days),
          }));
        }}
        onResetGame={handleResetGame}
        onAddGrowth={(amount) =>
          setGameState((prev) => ({
            ...prev,
            growthProgress: prev.growthProgress + amount,
          }))
        }
        onShowShowcase={() => setShowShowcase(true)}
        currentGems={gameState.gems}
        currentUnfedDays={gameState.consecutiveUnfedDays}
        currentGrowth={gameState.growthProgress}
      />
    </div>
  );
}