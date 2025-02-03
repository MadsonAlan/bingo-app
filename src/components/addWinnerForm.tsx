// src/components/AddWinnerForm.tsx
import { useState } from "react";

type AddWinnerFormProps = {
  currentNumbers: number[];
  onAddWinner: (name: string, numbers: number[]) => void;
};

// src/components/AddWinnerForm.tsx
export const AddWinnerForm = ({ currentNumbers, onAddWinner }: AddWinnerFormProps) => {
  const [winnerName, setWinnerName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (winnerName.trim()) {
      onAddWinner(winnerName, currentNumbers);
      setWinnerName("");
    }
  };

  return (
    <div className="mt-8 bg-white rounded-xl shadow-2xl p-6 border-4 border-red-600">
      <h3 className="text-xl font-bold text-red-600 mb-4 flex items-center gap-2">
        <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white rounded-lg px-3 py-1">
          🏅
        </span>
        Registrar Novo Ganhador
      </h3>

      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          <div className="flex-1 relative">
            <input
              type="text"
              id="winnerName"
              value={winnerName}
              onChange={(e) => setWinnerName(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border-2 border-red-200 focus:border-red-500 focus:ring-4 focus:ring-red-100 placeholder-gray-400 transition-all"
              placeholder="Digite o nome do vencedor"
              required
            />
            <div className="absolute right-3 top-3 text-red-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
          </div>

          <button
            type="submit"
            className="group relative flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 text-white font-semibold rounded-lg hover:to-orange-600 transition-all transform hover:scale-105 focus:ring-4 focus:ring-red-200 shadow-lg"
          >
            <span className="absolute -right-2 -top-2 bg-yellow-400 text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold shadow-md transform group-hover:rotate-12 transition-transform">
              {currentNumbers.length}
            </span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
            </svg>
            Confirmar Vitória
          </button>
        </div>

        <p className="mt-3 text-sm text-gray-500 flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          O histórico de números será registrado automaticamente
        </p>
      </form>
    </div>
  );
};