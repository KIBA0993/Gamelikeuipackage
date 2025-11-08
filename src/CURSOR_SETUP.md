# Setting Up Unhooked in Cursor

This guide will help you export this Figma Make project and set it up in Cursor for further development.

## 🚀 Quick Start

### 1. Export from Figma Make
- Click the **Export** button in Figma Make (usually in the top menu)
- Download the project as a ZIP file
- Extract the files to your local machine

### 2. Create a New Vite Project

```bash
# Create a new Vite + React + TypeScript project
npm create vite@latest unhooked-app -- --template react-ts

# Navigate to the project
cd unhooked-app
```

### 3. Install Dependencies

```bash
# Core dependencies
npm install

# UI & Animation
npm install motion framer-motion
npm install lucide-react
npm install sonner@2.0.3

# Radix UI Components (for shadcn/ui)
npm install @radix-ui/react-dialog
npm install @radix-ui/react-tooltip
npm install @radix-ui/react-slot
npm install @radix-ui/react-switch
npm install @radix-ui/react-separator

# Utility libraries
npm install class-variance-authority clsx tailwind-merge

# Tailwind CSS v4 (alpha)
npm install tailwindcss@4.0.0-alpha.25 postcss autoprefixer
```

### 4. Copy Your Project Files

Copy all files from the extracted Figma Make export to the `src/` folder:

```
src/
├── App.tsx                 # Main app component
├── main.tsx               # Entry point
├── components/            # All UI components
│   ├── Tutorial.tsx       # New onboarding flow
│   ├── Settings.tsx       # New settings page
│   ├── PixelPet.tsx
│   ├── PetBackground.tsx
│   ├── ... (all other components)
│   └── ui/                # shadcn/ui components
├── utils/                 # Helper functions
│   ├── economy.ts
│   └── health.ts
├── types/                 # TypeScript types
│   └── game.ts
├── data/                  # Game data
│   └── foodCatalog.ts
└── styles/
    └── globals.css        # Global styles
```

### 5. Configure Tailwind CSS

Create `tailwind.config.js`:
```js
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
}
```

Update `src/main.tsx` to import your global styles:
```tsx
import './styles/globals.css'
```

### 6. Open in Cursor

```bash
# Open the project in Cursor
cursor .

# Or drag the folder into Cursor
```

### 7. Start Development Server

```bash
npm run dev
```

Your app should now be running at `http://localhost:5173`

---

## 🎯 Using Cursor AI Features

### Chat with AI about your codebase
- Press **⌘L** (Ctrl+L on Windows/Linux) to open the chat panel
- Ask questions like:
  - "Add a weekly progress chart to the stats"
  - "Implement data persistence with localStorage"
  - "Add sound effects when the pet performs tricks"

### Edit code inline
- Press **⌘K** (Ctrl+K) to edit selected code with AI
- Highlight any code and ask for changes like:
  - "Refactor this to use React hooks"
  - "Add error handling"
  - "Optimize this function"

### Reference specific files
- Use `@filename` in chat to reference specific files:
  - `@game.ts explain the health state system`
  - `@economy.ts how does energy calculation work?`

---

## 📦 Key Features Already Implemented

### ✅ Tutorial System
- 6-step onboarding flow
- Explains core mechanics (Energy, Feeding, Growth, Health)
- Can be triggered anytime via the Help button
- Automatically shows for first-time users

### ✅ Settings Page
- **Usage Tracking**: Mock screen time authorization
- **Cloud Sync**: iCloud sync status (mock for web)
- **Account**: Display Energy & Gems balances
- **Buy Gems**: In-app purchase flow with packages
- **Widgets**: Toggle home screen widget and detailed stats

### ✅ Core Game Systems
- Dual-currency economy (Energy & Gems)
- 5-stage evolution system
- Health states (Healthy → Sick → Dead)
- Recovery flows (Cure, Revive, Restart)
- Daily check-in and buff system
- Pet interactions (Trick, Pet, Nap)
- Species-specific food shops

---

## 🎨 Development Tips

### Maintain the Pixel Art Aesthetic
- Use `border-2` or `border-3` for thick borders
- Apply `retro-shadow` class for the signature shadow
- Stick to the color palette in `globals.css`

### State Management
- Game state is managed in `App.tsx`
- Persisted to localStorage
- Use the Debug Panel (bottom-left) for testing different states

### Adding New Features with Cursor
Examples of what you can ask:

1. **"Add a daily streak counter that shows consecutive days the user has checked in"**
2. **"Create a pet stats history chart showing growth over time"**
3. **"Implement achievements system with unlockable badges"**
4. **"Add sound effects using the Web Audio API"**
5. **"Create a friend referral system"**

### Testing Different Game States
Use the Debug Panel to test:
- Different health states (Healthy, Sick, Dead)
- Various evolution stages (Baby to Champion)
- Recovery scenarios

---

## 🐛 Common Issues

### Tailwind classes not applying
- Ensure `globals.css` is imported in `main.tsx`
- Check `tailwind.config.js` content paths

### Import errors
- Verify all dependencies are installed
- Check import paths match your folder structure

### TypeScript errors
- The project uses strict TypeScript
- Fix type errors in `types/game.ts` if needed

---

## 📚 Project Structure Reference

```
Key Files to Understand:
├── App.tsx              - Main app logic, state management
├── types/game.ts        - All TypeScript interfaces
├── utils/economy.ts     - Energy & growth calculations
├── utils/health.ts      - Health state logic
├── components/
│   ├── Tutorial.tsx     - Onboarding flow (NEW)
│   ├── Settings.tsx     - Settings page (NEW)
│   ├── PixelPet.tsx     - Pet visual component
│   ├── PetBackground.tsx - Dynamic background with stats
│   ├── FoodShop.tsx     - Species-specific food catalog
│   └── RecoveryModal.tsx - Cure/Revive/Restart flows
```

---

## 🎓 Next Steps

After setup, consider:

1. **Enable Tutorial by default for new users**
   - Change `showTutorial` initial state to `true` in `App.tsx`
   - Or add localStorage check: `!localStorage.getItem('unhookedTutorialComplete')`

2. **Customize Settings**
   - Add real screen time tracking (requires native mobile app)
   - Implement actual cloud sync (Firebase, Supabase, etc.)
   - Connect real payment processing for gems

3. **Extend Gameplay**
   - Add mini-games
   - Implement social features
   - Create seasonal events

---

## 💡 Using Cursor Composer

For major refactors or new features, try Cursor's Composer mode:
1. Press **⌘I** (Ctrl+I)
2. Describe your feature in detail
3. Cursor will make changes across multiple files

Example prompts:
- "Add a dark mode toggle to the settings and implement it across all components"
- "Create a notification system for when the pet needs feeding"
- "Build a shop for purchasing cosmetic items for the pet"

---

## 🤝 Need Help?

- **PRD Reference**: Check `/PRD_v2.md` for full specification
- **Implementation Guide**: See `/IMPLEMENTATION_v2.md`
- **Cursor Docs**: https://cursor.sh/docs

Happy coding! 🚀
