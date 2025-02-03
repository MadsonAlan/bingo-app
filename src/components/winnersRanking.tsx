// src/components/WinnersRanking.tsx
type WinnersRankingProps = {
  winners: Winner[];
  onShowDetails: (numbers: number[]) => void;
};

export const WinnersRanking = ({ winners, onShowDetails }: WinnersRankingProps) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🏅 Ranking de Ganhadores</h2>
      
      {winners.length === 0 ? (
        <p className="text-gray-600">Nenhum ganhador registrado ainda.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posição</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nome</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Data/Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {winners.map((winner, index) => (
                <tr key={winner.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">#{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{winner.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(winner.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => onShowDetails(winner.drawnNumbers)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Ver Números
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