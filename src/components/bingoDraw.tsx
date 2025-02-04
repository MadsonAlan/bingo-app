"use client"
import { useEffect, useState } from "react";
import { BINGO_COLUMNS, BingoService } from "../services/bingoService";
import { BingoBall } from "./bingoBall";
import { AddWinnerForm } from "./addWinnerForm";
import { WinnersRanking } from "./winnersRanking";
import { Winner } from "@/types/winnerTypes";
import { Settings } from "@/types/menuTypes";
import { SettingsMenu } from "./settingsMenu";
import { SettingsService } from "@/services/settingsService";

const bingoService = new BingoService();

export const BingoDraw = () => {
  const [ currentDraw, setCurrentDraw ] = useState<{ number: number; column: string } | null>(null);
  const [ drawnNumbers, setDrawnNumbers ] = useState<{ number: number; column: string }[]>([]);
  const [ showNumbersModal, setShowNumbersModal ] = useState(false);
  const [ winners, setWinners ] = useState<Winner[]>([]);
  const [ selectedNumbers, setSelectedNumbers ] = useState<number[]>([]);
  const [ settings, setSettings ] = useState<Settings>(SettingsService || {
    volume: Math.floor(1),
    theme: 'light',
    autoRepeat: true,
    continuousDraw: false
  });

  useEffect(() => {
    const savedNumbers = bingoService.getDrawnNumbers();
    const savedWinners = bingoService.getWinners();
    setDrawnNumbers(savedNumbers);
    setWinners(savedWinners);

    if (bingoService.getDrawnNumbers().length > 0) {
      const last = bingoService.getDrawnNumbers().slice(-1)[ 0 ];
      setCurrentDraw({
        number: last.number,
        column: BingoService.getColumnForNumber(last.number)
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bingoSettings', JSON.stringify(settings));
  }, [ settings ]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (settings.continuousDraw) {
      interval = setInterval(() => {
        if (drawnNumbers.length < 75) { // Verifica se ainda há números para sortear
          handleDraw();
        } else {
          setSettings(s => ({ ...s, continuousDraw: false })); // Desativa ao terminar
        }
      }, 3000); // Intervalo de 3 segundos
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [ settings.continuousDraw, drawnNumbers.length ]);


  const handleDraw = async () => {
    if (drawnNumbers.length >= 75) {
      setSettings(s => ({ ...s, continuousDraw: false }));
      return;
    }

    const drawResult = bingoService.drawNumber();

    setCurrentDraw(drawResult);
    setDrawnNumbers(bingoService.getDrawnNumbers());
    // Reproduzir áudio com controle de volume
    try {
      const audio = new Audio(`sounds/numerosSorteados/${drawResult.column}${drawResult.number}.mp3`);
      audio.volume = settings.volume;
      // Reprodução principal
      await audio.play();

      // Repetição controlada
      if (settings.autoRepeat) {
        // Criar nova instância para evitar conflitos
        const repeatAudio = new Audio(audio.src);
        repeatAudio.volume = settings.volume;
        await new Promise(resolve => setTimeout(resolve, 2500)); // Intervalo de 0.5s
        await repeatAudio.play();
      }
    } catch (error) {
      console.error('Erro na reprodução:', error);
      if (settings.autoRepeat) {
        const utterance = new SpeechSynthesisUtterance(
          `${drawResult.column} ${drawResult.number}. Repetindo: ${drawResult.column} ${drawResult.number}`
        );
        utterance.lang = 'pt-BR';
        window.speechSynthesis.speak(utterance);
      }
    }

  };


  const handleReset = () => {
    bingoService.resetGame();
    setCurrentDraw(null);
    setDrawnNumbers([]);
    setWinners([]);
  };

  const handleAddWinner = (name: string, numbers: number[]) => {
    const newWinner: Winner = {
      id: crypto.randomUUID(),
      name,
      timestamp: new Date().toISOString(),
      drawnNumbers: [ ...numbers ],
    };
    bingoService.addWinner(newWinner);
    setWinners(bingoService.getWinners());
  };

  const handleShowDetails = (numbers: number[]) => {
    setSelectedNumbers(numbers);
    setShowNumbersModal(true);
  };

  // Modal de Visualização
  const NumbersModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl border-4 border-red-600 overflow-hidden">
        <div className="bg-gradient-to-r from-red-600 to-orange-500 p-4">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <span>🔢 Números Sorteados</span>
            <span className="text-sm font-medium">({selectedNumbers.length} bolas)</span>
          </h3>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-5 gap-2 md:gap-3">
            {selectedNumbers.map((num, index) => (
              <div
                key={num}
                className="relative bg-red-50 rounded-lg p-2 text-center animate-scale-in"
                style={{ animationDelay: `${index * 20}ms` }}
              >
                <span className="font-medium text-red-600">{num}</span>
                <span className="absolute top-0 right-0 -mt-2 -mr-1 text-xs font-bold text-orange-500">
                  {BingoService.getColumnForNumber(num)}
                </span>
              </div>
            ))}
          </div>

          <button
            onClick={() => setShowNumbersModal(false)}
            className="mt-6 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-all"
          >
            Fechar Visualização
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen">
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
      <SettingsMenu settings={settings} setSettings={setSettings} />
      {settings.continuousDraw && (
        <div className="fixed bottom-20 left-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Sorteio automático ativo
        </div>
      )}
    </div>
  );
};