// src/components/SettingsMenu.tsx
import { Settings } from '@/types/menuTypes';
import { useState } from 'react';

type SettingsMenuProps = {
  settings: Settings;
  setSettings: (settings: Settings) => void;
};

export const SettingsMenu = ({ settings, setSettings }: SettingsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed bottom-4 right-4 p-4 bg-red-600 text-white rounded-full shadow-xl hover:bg-red-700 transition-all z-50"
      >
        ⚙️
      </button>

      {isOpen && (
        <div className="fixed bottom-20 right-4 bg-white dark:bg-gray-800 p-6 rounded-xl shadow-2xl border-2 border-red-600 w-80">
          <h2 className="text-xl font-bold text-red-600 dark:text-red-400 mb-4">🔧 Configurações</h2>

          <div className="space-y-4">
            {/* Controle de Volume */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Volume:</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={settings.volume}
                  onChange={(e) => setSettings({ ...settings, volume: parseFloat(e.target.value) })}
                  className="w-32"
                />
                <button
                  onClick={() => setSettings({ ...settings, volume: settings.volume > 0 ? 0 : 1 })}
                  className="px-2"
                >
                  {settings.volume > 0 ? '🔊' : '🔇'}
                </button>
              </div>
            </div>

            {/* Auto-repeat */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Repetir número sorteado:</label>
              <button
                onClick={() => setSettings({ ...settings, autoRepeat: !settings.autoRepeat })}
                className={`p-2 rounded ${settings.autoRepeat ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                {settings.autoRepeat ? '✅ Ativado' : '❌ Desativado'}
              </button>
            </div>

            {/* Sorteio Contínuo */}
            <div className="flex items-center justify-between">
              <label className="text-gray-700 dark:text-gray-300">Sorteio automático:</label>
              <button
                onClick={() => setSettings({ ...settings, continuousDraw: !settings.continuousDraw })}
                className={`p-2 rounded ${settings.continuousDraw ? 'bg-green-500' : 'bg-gray-200'}`}
              >
                {settings.continuousDraw ? '⏸️ Pausar' : '▶️ Iniciar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};