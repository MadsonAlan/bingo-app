import { Winner } from "@/types/winnerTypes";

// src/services/bingoService.ts
export type BingoColumn = {
  letter: string;
  min: number;
  max: number;
};

export const BINGO_COLUMNS: BingoColumn[] = [
  { letter: "B", min: 1, max: 15 },
  { letter: "I", min: 16, max: 30 },
  { letter: "N", min: 31, max: 45 },
  { letter: "G", min: 46, max: 60 },
  { letter: "O", min: 61, max: 75 },
];

type GameState = {
  drawnNumbers: number[];
  winners: Winner[];
};

export class BingoService {
  private drawnNumbers: number[] = [];
  private winners: Winner[] = []; // Adiciona os ganhadores

  constructor() {
    this.loadGameState();
  }

  private saveGameState() {
    const gameState: GameState = {
      drawnNumbers: this.drawnNumbers,
      winners: this.winners, // Salva os ganhadores
    };
    localStorage.setItem("bingoGame", JSON.stringify(gameState));
  }

  private loadGameState() {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("bingoGame");
      if (saved) {
        const { drawnNumbers, winners } = JSON.parse(saved) as GameState;
        this.drawnNumbers = drawnNumbers;
        this.winners = winners || []; // Carrega os ganhadores
      }
    }
  }

  drawNumber(): { number: number; column: string } {
    let newNumber: number;
    let column: string;

    do {
      const randomColumn = BINGO_COLUMNS[Math.floor(Math.random() * 5)];
      newNumber =
        Math.floor(Math.random() * (randomColumn.max - randomColumn.min + 1)) +
        randomColumn.min;
      column = randomColumn.letter;
    } while (this.drawnNumbers.includes(newNumber));

    this.drawnNumbers.push(newNumber);
    this.saveGameState();
    return { number: newNumber, column };
  }

  getDrawnNumbers(): { number: number; column: string }[] {
    return this.drawnNumbers.map((num) => ({
      number: num,
      column: BingoService.getColumnForNumber(num),
    }));
  }

  static getColumnForNumber(num: number): string {
    const column = BINGO_COLUMNS.find(
      (col) => num >= col.min && num <= col.max
    );
    return column?.letter || "";
  }

  // Adiciona um ganhador ao ranking
  addWinner(winner: Winner) {
    this.winners.push(winner);
    this.saveGameState();
  }

  // Obtém a lista de ganhadores
  getWinners(): Winner[] {
    return this.winners;
  }

  resetGame() {
    this.drawnNumbers = [];
    this.winners = [];
    localStorage.removeItem("bingoGame");
  }
}
