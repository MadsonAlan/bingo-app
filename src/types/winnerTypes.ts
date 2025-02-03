export type Winner = {
  id: string; // Identificador único
  name: string; // Nome do ganhador
  timestamp: string; // Data/hora da vitória
  drawnNumbers: number[]; // Números sorteados até o momento
};