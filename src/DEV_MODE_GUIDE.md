# Dev Mode Guide - Unhooked Debug Panel

## How to Access Dev Mode

Dev mode is accessible through the **Debug Panel** that appears in the bottom-left corner of the app.

### Opening the Debug Panel

1. **Look for the gear icon** (⚙️) in the bottom-left corner of the screen
2. **Click the gear button** to open the debug panel
3. The panel will slide up with all debugging tools

### Closing the Debug Panel

- Click the **X** button in the top-right corner of the panel
- Or click the gear button again to toggle it closed

---

## Debug Panel Features

### 💎 Add Gems
- **What it does**: Adds premium currency (Gems) to your account
- **Default amount**: 100 gems
- **How to use**:
  1. Enter the amount you want to add (or use default 100)
  2. Click "Add" button
  3. Gems are instantly added to your balance

### 📅 Set Unfed Days
- **What it does**: Changes how many consecutive days your pet has gone unfed
- **Current value displayed**: Shows your current unfed days count
- **How to use**:
  1. Enter a number (0-10)
  2. Click "Set" button
  3. Pet health state will update accordingly

**Health States by Unfed Days:**
- **0-2 days**: Healthy ✅
- **3 days**: Sick 🤒
- **7+ days**: Dead 💀

### 📈 Add Growth
- **What it does**: Adds growth points to progress your pet through evolution stages
- **Current value displayed**: Shows your current growth progress
- **Default amount**: 25 points
- **How to use**:
  1. Enter the amount you want to add
  2. Click "Add" button
  3. Watch your pet evolve!

**Growth Thresholds:**
- **Stage 1 (Egg)**: 0
- **Stage 2 (Baby)**: 25
- **Stage 3 (Teen)**: 50
- **Stage 4 (Adult)**: 100
- **Stage 5 (Master)**: 200

---

## 🎬 Test Scenarios

Quick buttons to set up common testing states:

### 🌟 Healthy
Sets up a healthy pet with good stats:
- Energy: 100
- Gems: 50
- Fullness: 80
- Mood: 4/5
- Growth: 20
- Health: Healthy

### 🤒 Sick
Sets up a sick pet needing attention:
- Health State: Sick
- Unfed Days: 2
- Energy: 150
- Gems: 100
- Fullness: 20
- Mood: 1/5
- Growth: 50

### 💀 Dead
Sets up a dead pet for testing recovery:
- Health State: Dead
- Unfed Days: 4
- Dead At: Current time
- Energy: 50
- Gems: 200
- Fullness: 0
- Mood: 0/5
- Growth: 75

### 🚀 Advanced
Sets up an advanced pet with high stats:
- Growth: 350 (Stage 4-5)
- Energy: 200
- Gems: 150
- Fullness: 90
- Mood: 5/5
- Today's Buff: 15%
- Health: Healthy

---

## 🎯 Quick Actions

Convenient one-click actions for common tests:

### 🐾 View All Pet Stages
- Opens the Pet Showcase
- Shows all 5 evolution stages side-by-side
- For both Cat and Dog species
- Great for previewing pixel art

### Make Sick (3 days)
- Sets unfed days to 3
- Pet becomes sick
- Triggers sick health banner

### Make Dead (7 days)
- Sets unfed days to 7
- Pet becomes dead
- Triggers death/revival options

### Make Healthy (0 days)
- Resets unfed days to 0
- Pet becomes healthy
- Removes any health warnings

---

## ⚠️ Reset Entire Game

**WARNING: This action cannot be undone!**

- Clears all game data from localStorage
- Resets to initial state
- You will lose all progress
- Requires confirmation before executing

---

## Common Testing Workflows

### Testing Health Transitions
```
1. Click "Make Healthy" to start fresh
2. Click "Make Sick (3 days)"
3. Test cure functionality
4. Click "Make Dead (7 days)"
5. Test revive/restart functionality
```

### Testing Evolution System
```
1. Open Debug Panel
2. Add Growth: 25 → See Baby stage
3. Add Growth: 25 → See Teen stage
4. Add Growth: 50 → See Adult stage
5. Add Growth: 100 → See Master stage
```

### Testing Food System with Low Resources
```
1. Reset game to start fresh
2. Use default state (50 energy)
3. Try to buy food
4. Test energy economy
```

### Testing Premium Recovery
```
1. Click "🚀 Advanced" scenario (gives you 150 gems)
2. Click "Make Dead (7 days)"
3. Test revival system with gems
4. Test fragile state after revival
```

### Testing Pet Showcase
```
1. Open Debug Panel
2. Click "🐾 View All Pet Stages"
3. Review all evolution stages
4. Check pixel art quality
5. Click "← Back to Game" to return
```

---

## Tips & Tricks

### Rapid Testing
- Use Test Scenarios for instant state setup
- Combine with Quick Actions for fast testing
- Keep panel open while testing

### Visual Testing
- Use Pet Showcase to compare all stages
- Adjust growth incrementally to see transitions
- Test evolution animations by adding growth slowly

### Economy Testing
- Add gems to test all shop items
- Set unfed days to test health economy
- Add growth to unlock new food items

### Save State Testing
- Test scenarios create fresh states
- Use Reset to clear localStorage
- Manual adjustments persist in localStorage

---

## Developer Notes

The Debug Panel is **always available** in the app and doesn't need to be enabled. It's designed to:

- ✅ Speed up development and testing
- ✅ Allow easy state manipulation
- ✅ Test edge cases quickly
- ✅ Preview all visual states
- ✅ Validate game mechanics

**Location**: Bottom-left corner (fixed position)  
**Z-index**: 50 (appears above most UI)  
**Persistence**: State changes persist in localStorage  
**Reset**: Use "Reset Entire Game" to clear all data

---

## Need More Debug Features?

If you need additional debug capabilities, you can easily extend the Debug Panel by:

1. Opening `/components/DebugPanel.tsx`
2. Adding new state manipulation functions
3. Creating new Quick Action buttons
4. Adding new Test Scenarios

The panel is designed to be easily extensible for your testing needs!
