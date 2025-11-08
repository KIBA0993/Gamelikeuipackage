# 🎮 Unhooked - Virtual Pet for Better Phone Habits

**Version 2.0** - A gamified virtual pet companion that helps you build healthier phone usage habits.

## 🌟 Overview

Unhooked is a pixel art virtual pet game that encourages intentional phone use. Earn **Energy** by staying under your daily phone usage limit, then spend that Energy caring for your virtual friend through food and interaction.

## 🎯 Core Features

### 💰 Dual Currency System
- **Energy (E)**: Earned daily from healthy phone usage (max 150/day)
- **Gems (💎)**: Premium currency for recovery options

### ❤️ Health System
Your pet has three health states:
- **Healthy** 💚: Normal state, full growth
- **Sick** 🤒: After 3 days unfed (can recover naturally or via Vet)
- **Dead** 👻: After 7 days unfed (requires Gems to revive or restart)

### 🍽️ Food Shop
- Species-specific items (Cat/Dog/Both)
- Prices: 25-150 Energy
- Effects: Fullness, Mood, Daily Buff
- Feed ≥100 E per day to maintain health

### 🔄 Recovery Options
- **Vet Cure** (Sick): 120 Gems → Immediate healthy
- **Revive** (Dead): 400 Gems → Healthy but fragile for 3 days
- **Restart**: 200 Gems → New pet, keep cosmetics

### 📈 Growth & Evolution
- 5 Stages: Egg → Baby → Teen → Adult → Master
- Growth from daily Energy + food buffs
- Pauses when Sick or Dead

## 🎮 How to Play

### Daily Routine
1. **Check Usage**: Enter your daily phone usage vs. your limit
2. **Earn Energy**: Get rewards based on staying under limit
3. **Feed Your Pet**: Spend Energy on food (need ≥100 E/day)
4. **Watch Growth**: Your pet evolves as you maintain healthy habits!

### Energy Calculation
```
Energy = round(150 × max(0, 1 − usage/limit))
```

### Health Maintenance
- Feed your pet daily (≥100 E) to avoid getting sick
- Miss 3 days → **Sick** (can recover free with 2 feedings in 3 days)
- Miss 7 days → **Dead** (requires Gems to revive or restart)

## 🔧 Debug Tools

Click the ⚙️ icon in the bottom-left corner to access debug tools:
- Add Gems (for testing recovery)
- Set unfed days (test Sick/Dead states)
- Quick state changes
- Reset game

**Note**: These are for testing only and won't be in production!

## 📱 Tech Stack

- **React** + **TypeScript**
- **Tailwind CSS** (v4)
- **Motion** (Framer Motion) for animations
- **Lucide React** for icons
- **Sonner** for toast notifications
- **shadcn/ui** components

## 📊 Game Balance

### Energy Earning
- 0-50% of limit: 150-75 E (excellent!)
- 50-100% of limit: 75-0 E (okay)
- Over limit: 0 E (try again tomorrow!)

### Food Buffs
- Healthy: Max +25% buff
- Sick: Max +10% buff
- Fragile (post-revive): Max +15% buff for 3 days

### Recovery Costs
- Vet Cure: 120 Gems (24h cooldown, max 5/month)
- Revive: 400 Gems (7-day cooldown, max 2/90 days)
- Restart: 200 Gems (24h cooldown, unlimited)

## 🎨 Design Principles

- **Cozy pixel art** aesthetic
- **No pay-to-win**: Gems only restore health, never boost growth
- **Fair & transparent**: Clear formulas, no hidden mechanics
- **Accessible**: Screen reader support, high contrast
- **Non-competitive**: Your journey, your pace

## 📂 Project Structure

```
/types/game.ts          - TypeScript type definitions
/data/foodCatalog.ts    - Food items catalog
/utils/
  - economy.ts          - Energy & growth calculations
  - health.ts           - Health state logic
/components/
  - PixelPet.tsx        - Animated pixel art pet
  - CurrencyDisplay.tsx - Energy & Gems display
  - FoodShop.tsx        - Species-aware food shop
  - HealthBanner.tsx    - Sick/Dead state alerts
  - RecoveryModal.tsx   - Cure/Revive/Restart modals
  - DailyCheckIn.tsx    - Usage tracking interface
  - DebugPanel.tsx      - Testing tools
/App.tsx                - Main application
```

## 🚀 Getting Started

The app runs entirely in the browser with localStorage persistence.

1. Choose your pet species (Cat or Dog)
2. Set your daily phone usage limit
3. Track your usage daily
4. Earn Energy and care for your pet
5. Watch them grow as you build better habits!

## 📝 Version History

### Version 2.0 (Current)
- Dual currency system (Energy + Gems)
- Health states (Healthy/Sick/Dead)
- Species-specific food shop
- Recovery options with cooldowns
- Growth tied to feeding buffs
- Debug panel for testing

### Version 1.0 (Archived in /v1)
- Simple multiplier system
- Basic pet evolution
- Free species switching

## 🎯 Future Enhancements

- [ ] Backend integration & server sync
- [ ] Real IAP for Gems
- [ ] Memorial gallery for past pets
- [ ] Seasonal events & limited items
- [ ] Cosmetics shop (dual currency)
- [ ] Sound effects & music
- [ ] More animations

## 📄 License

Built for intentional phone usage and delightful virtual companionship ❤️

---

**Based on PRD v1.8** | **October 15, 2025**
