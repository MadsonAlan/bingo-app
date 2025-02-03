"use client"
import { Winner } from "@/types/winnerTypes";
import { useState } from "react";

type WinnersRankingProps = {
  winners: Winner[];
  onShowDetails: (numbers: number[]) => void;
};

// src/components/WinnersRanking.tsx
export const WinnersRanking = ({ winners, onShowDetails }: WinnersRankingProps) => {
  const [expandedWinner, setExpandedWinner] = useState<string | null>(null);

  const toggleDetails = (id: string) => {
    setExpandedWinner(expandedWinner === id ? null : id);
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-2xl p-6 border-4 border-red-600">
      <h2 className="text-2xl font-bold text-red-600 mb-6 flex items-center gap-2">
        <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg px-4 py-2">
          🏆 Ranking
        </span>
        <span className="text-gray-600 text-lg">Ganhadores do Bingo</span>
      </h2>

      {winners.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500 italic">Nenhum vencedor registrado ainda</p>
        </div>
      ) : (
        <div className="space-y-4">
          {winners.map((winner, index) => (
            <div 
              key={winner.id}
              className="rounded-lg border-2 border-red-100 overflow-hidden"
            >
              <button
                onClick={() => toggleDetails(winner.id)}
                className="w-full p-4 text-left flex items-center justify-between bg-gradient-to-r from-red-50 to-white hover:from-red-100 transition-colors"
              >
                <div>
                  <div className="font-bold text-red-600">#{index + 1}</div>
                  <div className="text-lg font-medium text-gray-800">{winner.name}</div>
                </div>
                <div className="text-gray-500">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`h-6 w-6 transform transition-transform ${
                      expandedWinner === winner.id ? 'rotate-180' : ''
                    }`}
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {expandedWinner === winner.id && (
                <div className="p-4 border-t border-red-50 bg-red-50/30">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span>
                        {new Date(winner.timestamp).toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    <button
                      onClick={() => onShowDetails(winner.drawnNumbers)}
                      className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      Ver Números Sorteados
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};