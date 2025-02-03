// src/components/AudioControls.tsx
import { useState } from 'react';

export const AudioControls = () => {
  const [volume, setVolume] = useState(1);

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg border-2 border-red-600">
      <label className="block text-sm font-medium text-red-600 mb-2">
        Volume: {Math.round(volume * 100)}%
      </label>
      <input
        type="range"
        min="0"
        max="1"
        step="0.1"
        value={volume}
        onChange={(e) => setVolume(parseFloat(e.target.value))}
        className="w-full h-2 bg-red-100 rounded-lg appearance-none cursor-pointer"
      />
    </div>
  );
};