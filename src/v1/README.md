# Version 1 - Pixel Progress Pet

This folder contains the original version 1 of the Pixel Progress Pet application.

## Features
- Daily usage tracking with multiplier system
- Pet evolution through 5 stages (Egg → Baby → Teen → Adult → Master)
- Choice between Cat or Dog pixel art pets
- Streak bonuses for consistent good performance
- LocalStorage persistence
- Retro 8-bit pixel art aesthetic

## Algorithm
The core algorithm tracks:
- Usage (U) vs Limit (L) ratio
- Multipliers based on performance tiers (15%, 25%, 50%)
- Streak tracking for bonus rewards
- Evolution progress based on accumulated days

## Components
- `App.tsx` - Main application
- `components/PixelPet.tsx` - Pixel art pet renderer
- `components/GameStats.tsx` - Statistics display
- `components/ProgressBar.tsx` - Progress visualization
- `components/DailyCheckIn.tsx` - Daily input form
- `components/StageIndicator.tsx` - Evolution stage display
- `components/MultiplierInfo.tsx` - Help/info tooltip
- `styles/globals.css` - Pixel art styling

Created: 2025
