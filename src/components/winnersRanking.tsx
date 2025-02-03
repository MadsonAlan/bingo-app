import { Winner } from "@/types/winnerTypes";

type WinnersRankingProps = {
  winners: Winner[];
  onShowDetails: (numbers: number[]) => void;
};

// src/components/WinnersRanking.tsx
export const WinnersRanking = ({ winners, onShowDetails }: WinnersRankingProps) => {
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
        <div className="overflow-x-auto rounded-lg border-2 border-red-100">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-red-600 to-orange-500 text-white">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold">Posição</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Ganhador</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Quando</th>
                <th className="px-4 py-3 text-left text-sm font-semibold">Detalhes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-red-50">
              {winners.map((winner, index) => (
                <tr 
                  key={winner.id} 
                  className="hover:bg-red-50 transition-colors even:bg-red-50/30"
                >
                  <td className="px-4 py-3 font-bold text-red-600">#{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{winner.name}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {new Date(winner.timestamp).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => onShowDetails(winner.drawnNumbers)}
                      className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium">Ver Jogo</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};