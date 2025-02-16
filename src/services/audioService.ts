// src/services/audioService.ts
export class AudioService {
  private static readonly BASE_PATH = '/sounds/numerosSorteados';

  static async playNumber(column: string, number: number, volume: number = 1) {
    try {
      const formattedColumn = column.toUpperCase();
      const audioPath = `${this.BASE_PATH}/${formattedColumn}${number}.mp3`;
      
      // Verifica se o arquivo existe
      const response = await fetch(audioPath);
      if (!response.ok) throw new Error('Arquivo não encontrado');

      const audio = new Audio(audioPath);
      audio.volume = volume;
      audio.preload = 'auto';
      
      await audio.play();
    } catch (error) {
      this.fallbackTTS(column, number);
      console.error('Falha na reprodução:', error);
      throw error; // Propaga o erro para tratamento externo
    }
  }

  private static fallbackTTS(column: string, number: number) {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      const synonyms: { [key: string]: string } = {
        B: "Bê", I: "Ih", N: "Eni", G: "Gê", O: "Ô"
      };

      const utterance = new SpeechSynthesisUtterance(
        `${synonyms[column] || column} ${number}`
      );

      utterance.lang = "pt-BR";
      utterance.rate = 0.9;
      utterance.pitch = 0.8;
      
      // Força a fala mesmo com outras operações pendentes
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utterance);
    }
  }
}