import { PixelPet } from './PixelPet';
import { Card } from './ui/card';

const STAGES = [
  { id: 0, name: 'Egg', emoji: '🥚' },
  { id: 1, name: 'Baby', emoji: '👶' },
  { id: 2, name: 'Teen', emoji: '🧒' },
  { id: 3, name: 'Adult', emoji: '🧑' },
  { id: 4, name: 'Master', emoji: '👑' },
];

export function PetShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-center mb-8">🐾 Unhooked Pet Evolution Showcase 🐾</h1>
        
        {/* CAT SHOWCASE */}
        <div className="mb-16">
          <h2 className="text-center mb-6">
            🐱 BLACK & WHITE TUXEDO CAT
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Inspired by classic tuxedo cats with green eyes and white chest
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {STAGES.map((stage) => (
              <Card key={stage.id} className="p-6 bg-white/90 backdrop-blur border-2 border-black hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-1">{stage.emoji}</div>
                  <div className="font-bold">{stage.name}</div>
                  <div className="text-xs text-gray-500">Stage {stage.id + 1}/5</div>
                </div>
                
                <div className="flex justify-center mb-4 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg p-6 border-2 border-gray-300">
                  <PixelPet
                    stage={stage.id}
                    mood="happy"
                    isActive={true}
                    petType="cat"
                    healthState="healthy"
                    currentAnimation="idle"
                  />
                </div>
                
                <div className="text-xs text-center text-gray-600">
                  {stage.id === 0 && 'Mysterious egg with black & white pattern'}
                  {stage.id === 1 && 'Adorable baby kitten'}
                  {stage.id === 2 && 'Playful teen cat sitting'}
                  {stage.id === 3 && 'Elegant adult cat laying down'}
                  {stage.id === 4 && 'Majestic master with crown'}
                </div>
              </Card>
            ))}
          </div>
        </div>
        
        {/* DOG SHOWCASE */}
        <div>
          <h2 className="text-center mb-6">
            🐶 PATCHED DOG WITH PINK POLKA-DOT EARS
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Inspired by cute patched pups with pink polka-dot ears and turquoise collar
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {STAGES.map((stage) => (
              <Card key={stage.id} className="p-6 bg-white/90 backdrop-blur border-2 border-black hover:shadow-xl transition-shadow">
                <div className="text-center mb-4">
                  <div className="text-2xl mb-1">{stage.emoji}</div>
                  <div className="font-bold">{stage.name}</div>
                  <div className="text-xs text-gray-500">Stage {stage.id + 1}/5</div>
                </div>
                
                <div className="flex justify-center mb-4 bg-gradient-to-b from-sky-200 to-green-200 rounded-lg p-6 border-2 border-gray-300">
                  <PixelPet
                    stage={stage.id}
                    mood="happy"
                    isActive={true}
                    petType="dog"
                    healthState="healthy"
                    currentAnimation="idle"
                  />
                </div>
                
                <div className="text-xs text-center text-gray-600">
                  {stage.id === 0 && 'Cream egg with pink & orange spots'}
                  {stage.id === 1 && 'Tiny puppy with big floppy ears'}
                  {stage.id === 2 && 'Sitting teen with turquoise collar'}
                  {stage.id === 3 && 'Full-grown adult dog'}
                  {stage.id === 4 && 'Royal master with crown & cape'}
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* COLOR LEGEND */}
        <div className="mt-16 bg-white/80 backdrop-blur rounded-lg p-6 border-2 border-black">
          <h3 className="text-center mb-4">🎨 Color Legend</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cat Colors */}
            <div>
              <h4 className="mb-3">Cat (Tuxedo)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-black border border-gray-400"></div>
                  <span>Black fur</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-white border border-gray-400"></div>
                  <span>White chest & paws</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-green-400 border border-gray-400"></div>
                  <span>Green eyes</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-300 border border-gray-400"></div>
                  <span>Pink nose</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-yellow-400 border border-gray-400"></div>
                  <span>Golden crown (Master)</span>
                </div>
              </div>
            </div>
            
            {/* Dog Colors */}
            <div>
              <h4 className="mb-3">Dog (Patched)</h4>
              <div className="space-y-1 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-pink-300 border border-gray-400"></div>
                  <span>Pink ears</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500 border border-gray-400"></div>
                  <span>Orange polka dots</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-slate-600 border border-gray-400"></div>
                  <span>Dark face patches</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-amber-100 border border-gray-400"></div>
                  <span>Cream/beige body</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-turquoise border border-gray-400"></div>
                  <span>Turquoise collar</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
