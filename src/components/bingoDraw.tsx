"use client"
// src/components/BingoDraw.tsx
import { useEffect, useState } from "react";
import { BINGO_COLUMNS, BingoService } from "../services/bingoService";
import { BingoBall } from "./bingoBall";

const bingoService = new BingoService();

export const BingoDraw = () => {
  const [ currentDraw, setCurrentDraw ] = useState<{ number: number; column: string } | null>(null);
  const [ drawnNumbers, setDrawnNumbers ] = useState<{ number: number; column: string }[]>([]);

  useEffect(() => {
    const savedNumbers = bingoService.getDrawnNumbers();
    setDrawnNumbers(savedNumbers);
    if (savedNumbers.length > 0) {
      setCurrentDraw(savedNumbers[ savedNumbers.length - 1 ]);
    }
  }, []);

  const speakNumber = (number: number, column: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(`${column}... ${number}`);
      utterance.lang = "pt-BR";
      utterance.rate = 0.9; // Velocidade moderada
      utterance.pitch = 0.8; // Tom mais grave

      // Configuração extra para melhor clareza
      utterance.text = utterance.text
        .replace("B", "Bê")
        .replace("I", "Íh")
        .replace("N", "Eni")
        .replace("G", "Gê")
        .replace("O", "Ó");

      window.speechSynthesis.speak(utterance);
    }
  };

  const handleDraw = () => {
    const drawResult = bingoService.drawNumber();
    setCurrentDraw(drawResult);
    setDrawnNumbers(bingoService.getDrawnNumbers());
    speakNumber(drawResult.number, drawResult.column);
  };

  const handleReset = () => {
    bingoService.resetGame();
    setCurrentDraw(null);
    setDrawnNumbers([]);
  };

  // Agrupa números por coluna
  const groupedNumbers = BINGO_COLUMNS.map((col) => ({
    letter: col.letter,
    numbers: drawnNumbers
      .filter((n) => n.column === col.letter)
      .map((n) => n.number)
      .sort((a, b) => a - b),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-red-100 p-4 md:p-8">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-red-600 drop-shadow-md md:text-6xl">
          BINGO<span className="text-yellow-500">DIGITAL</span>
        </h1>
        <p className="mt-2 text-gray-600 md:text-lg">Sorteio automático com voz integrada</p>
      </header>

      {/* Main Content */}
      <div className="mx-auto max-w-6xl">
        {/* Current Number Section */}
        <section className="mb-12 rounded-xl bg-white p-6 shadow-2xl">
          <div className="flex flex-col items-center gap-6">
            <div className="w-full max-w-xs">
              {currentDraw && <BingoBall {...currentDraw} />}
            </div>

            <button
              onClick={handleDraw}
              className="w-full max-w-xs transform rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-8 py-4 text-xl font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 md:max-w-sm"
            >
              🎉 Sortear Próximo Número
            </button>
          </div>
        </section>

        {/* Called Numbers Grid */}
        <section className="rounded-xl bg-white p-6 shadow-2xl">
          <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
            🔢 Números Sorteados
            <span className="ml-2 text-red-600">({drawnNumbers.length}/75)</span>
          </h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-5">
            {BINGO_COLUMNS.map((col) => (
              <div key={col.letter} className="overflow-hidden rounded-lg border-2 border-red-100">
                {/* Column Header */}
                <div className="bg-red-600 p-3 text-center">
                  <span className="text-2xl font-bold text-white">{col.letter}</span>
                </div>

                {/* Numbers Grid */}
                <div className="grid grid-cols-3 gap-1 bg-white p-2 sm:grid-cols-5 md:grid-cols-3 lg:grid-cols-5">
                  {Array.from({ length: 15 }, (_, i) => col.min + i).map((n) => (
                    <div
                      key={n}
                      className={`aspect-square rounded p-1 text-center text-sm transition-all
                        ${drawnNumbers.some(d => d.number === n)
                          ? 'bg-red-500 text-white animate-[bounce_0.5s]'
                          : 'bg-gray-50 hover:bg-red-100'} 
                        ${currentDraw?.number === n ? 'ring-4 ring-yellow-400' : ''}`}
                    >
                      {drawnNumbers.some(d => d.number === n) ? n : ''}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Mobile Floating Action Button */}
      <div className="fixed bottom-4 right-4 z-50 md:hidden">
        <button
          onClick={handleDraw}
          className="h-14 w-14 rounded-full bg-red-600 p-3 text-white shadow-xl transition-transform hover:scale-110"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};