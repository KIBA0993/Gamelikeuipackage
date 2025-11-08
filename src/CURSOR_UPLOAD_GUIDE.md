# How to Upload Unhooked to Cursor IDE

This guide explains how to transfer your Unhooked project from Figma Make to Cursor IDE for continued development.

## Step 1: Export from Figma Make

1. **Download the project files** from Figma Make
   - Look for an "Export" or "Download" button in the Figma Make interface
   - This should download a `.zip` file containing all your project files

2. **Extract the files**
   - Unzip the downloaded file to a location on your computer
   - You should see the file structure matching what's shown in the file tree

## Step 2: Set Up in Cursor

### Option A: Open Existing Folder

1. **Open Cursor IDE**
2. **File → Open Folder** (or `Cmd/Ctrl + O`)
3. **Navigate to** the extracted project folder
4. **Select** the root folder and click "Open"

### Option B: Drag and Drop

1. **Open Cursor IDE**
2. **Drag the entire project folder** into the Cursor window
3. Cursor will open it as a workspace

## Step 3: Install Dependencies

1. **Open the integrated terminal** in Cursor (`Ctrl/Cmd + ~`)

2. **Install dependencies** (if using npm):
   ```bash
   npm install
   ```

   Or if using pnpm:
   ```bash
   pnpm install
   ```

   Or if using yarn:
   ```bash
   yarn install
   ```

3. **Wait for installation** to complete

## Step 4: Configure the Project

### Vite Configuration (if needed)

If you need to create a `vite.config.ts` file, create it in the root:

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
})
```

### Package.json Check

Make sure your `package.json` includes all necessary dependencies:

```json
{
  "name": "unhooked",
  "version": "2.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "motion": "^10.18.0",
    "lucide-react": "^0.263.1",
    "sonner": "^2.0.3"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.0",
    "@vitejs/plugin-react": "^4.2.1",
    "typescript": "^5.2.2",
    "vite": "^5.2.0",
    "tailwindcss": "^4.0.0"
  }
}
```

## Step 5: Run the Development Server

1. **Start the dev server**:
   ```bash
   npm run dev
   ```

2. **Open your browser** to the URL shown (usually `http://localhost:5173`)

3. **Verify** the app is running correctly

## Step 6: Important Files to Review

After opening in Cursor, familiarize yourself with these key files:

### Core Application
- **`/App.tsx`** - Main application entry point
- **`/types/game.ts`** - TypeScript interfaces and types
- **`/data/foodCatalog.ts`** - Food items and shop data

### Game Logic
- **`/utils/economy.ts`** - Energy and gem calculations
- **`/utils/health.ts`** - Pet health system logic

### Components
- **`/components/PixelPet.tsx`** - Pet rendering with all evolution stages
- **`/components/PetActions.tsx`** - Feed, play, and shop actions
- **`/components/HealthBanner.tsx`** - Health status display
- **`/components/RecoveryModal.tsx`** - Revival system
- **`/components/Settings.tsx`** - App settings and configuration

### Documentation
- **`/PRD_v2.md`** - Complete product requirements
- **`/IMPLEMENTATION_v2.md`** - Implementation guide
- **`/EVOLUTION_SYSTEM.md`** - Pet evolution mechanics
- **`/PIXEL_ART_IMPROVEMENTS.md`** - Recent pixel art updates

## Step 7: Using Cursor AI Features

### Chat with AI about the codebase
1. **Open Cursor Chat** (`Cmd/Ctrl + L`)
2. **Ask questions** about the codebase:
   - "Explain how the pet health system works"
   - "Show me where the evolution logic is implemented"
   - "How does the dual currency system work?"

### Make changes with AI
1. **Select code** you want to modify
2. **Press `Cmd/Ctrl + K`** to open inline edit
3. **Describe your changes**:
   - "Add a new evolution stage"
   - "Change the health transition timing"
   - "Add a new food item"

### Use Composer for larger changes
1. **Open Composer** (`Cmd/Ctrl + I`)
2. **Describe complex features**:
   - "Add a new pet species with 5 evolution stages"
   - "Implement a daily quest system"
   - "Add sound effects when feeding the pet"

## Troubleshooting

### Missing Dependencies
If you see import errors:
```bash
npm install [package-name]
```

### TypeScript Errors
Make sure you have a `tsconfig.json` in the root:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "references": [{ "path": "./tsconfig.node.json" }]
}
```

### Build Issues
Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

Once set up in Cursor, you can:

1. ✅ **Continue development** with AI assistance
2. ✅ **Add new features** (sound effects, animations, new pets)
3. ✅ **Deploy to production** (Vercel, Netlify, etc.)
4. ✅ **Add backend integration** (Supabase for cloud sync)
5. ✅ **Build mobile versions** (React Native conversion)

## Resources

- **Cursor Documentation**: https://cursor.sh/docs
- **Vite Documentation**: https://vitejs.dev
- **React Documentation**: https://react.dev
- **Tailwind CSS v4**: https://tailwindcss.com/docs

## Need Help?

If you encounter issues:
1. Check the `/guidelines/Guidelines.md` file for coding standards
2. Review the `/IMPLEMENTATION_v2.md` for system details
3. Use Cursor's AI to help debug issues
4. Check the browser console for runtime errors

---

**Happy coding! 🚀**
