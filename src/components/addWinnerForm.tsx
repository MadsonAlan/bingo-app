// src/components/AddWinnerForm.tsx
import { useState } from "react";

type AddWinnerFormProps = {
  currentNumbers: number[];
  onAddWinner: (name: string, numbers: number[]) => void;
};

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
    <form onSubmit={handleSubmit} className="mt-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end">
        <div className="flex-1">
          <label htmlFor="winnerName" className="block text-sm font-medium text-gray-700">
            Nome do Ganhador
          </label>
          <input
            type="text"
            id="winnerName"
            value={winnerName}
            onChange={(e) => setWinnerName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
            placeholder="Digite o nome do ganhador"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          🏆 Adicionar Ganhador
        </button>
      </div>
    </form>
  );
};