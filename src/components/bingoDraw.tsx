"use client"
import { useEffect, useState } from "react";
import { BINGO_COLUMNS, BingoService } from "../services/bingoService";
import { BingoBall } from "./bingoBall";
import { AddWinnerForm } from "./addWinnerForm";
import { WinnersRanking } from "./winnersRanking";
import { Winner } from "@/types/winnerTypes";

const bingoService = new BingoService();

export const BingoDraw = () => {
  const [ currentDraw, setCurrentDraw ] = useState<{ number: number; column: string } | null>(null);
  const [ drawnNumbers, setDrawnNumbers ] = useState<{ number: number; column: string }[]>([]);
  const [ showNumbersModal, setShowNumbersModal ] = useState(false);
  const [ winners, setWinners ] = useState<Winner[]>([]);
  const [ selectedNumbers, setSelectedNumbers ] = useState<number[]>([]);
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

  const handleAddWinner = (name: string, numbers: number[]) => {
    const newWinner: Winner = {
      id: crypto.randomUUID(),
      name,
      timestamp: new Date().toISOString(),
      drawnNumbers: [ ...numbers ],
    };
    setWinners((prev) => [ newWinner, ...prev ]);
  };

  const handleShowDetails = (numbers: number[]) => {
    setSelectedNumbers(numbers);
    setShowNumbersModal(true);
  };

  // Modal de Visualização
  const NumbersModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h3 className="text-lg font-bold mb-4">Números Sorteados</h3>
        <div className="grid grid-cols-5 gap-2">
          {selectedNumbers.map((num) => (
            <span key={num} className="bg-gray-100 p-2 rounded text-center">
              {num}
            </span>
          ))}
        </div>
        <button
          onClick={() => setShowNumbersModal(false)}
          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700"
        >
          Fechar
        </button>
      </div>
    </div>
  );

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
            {/* Bola sorteada */}
            <div className="w-full max-w-xs">
              {currentDraw && <BingoBall {...currentDraw} />}
            </div>

            {/* Container dos botões */}
            <div className="flex w-full max-w-xs flex-col gap-4 md:max-w-sm md:flex-row md:items-center">
              <button
                onClick={handleDraw}
                className="flex-1 transform rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-4 text-lg font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300 md:px-8 md:text-xl"
              >
                {drawnNumbers.length === 0 ? (
                  '🎉 Iniciar Sorteio!'
                ) : (
                  '🔔 Sortear Próximo Número'
                )}
              </button>

              <button
                onClick={handleReset}
                disabled={drawnNumbers.length === 0}
                className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-red-600 to-orange-500 px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 disabled:opacity-50 disabled:hover:scale-100 disabled:hover:shadow-lg md:px-4"
                title="Reiniciar jogo completo"
              >
                <span className="md:hidden">🔄 Reiniciar</span>
                <span className="hidden md:inline">🔄</span>
              </button>
            </div>
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
      <AddWinnerForm
        currentNumbers={drawnNumbers.map((n) => n.number)}
        onAddWinner={handleAddWinner}
      />
      <WinnersRanking
        winners={winners}
        onShowDetails={handleShowDetails}
      />
      {showNumbersModal && <NumbersModal />}
    </div>
  );
};