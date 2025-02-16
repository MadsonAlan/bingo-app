// src/services/audioService.ts
export class AudioService {
  private static readonly BASE_PATH = '/sounds/numerosSorteados';

  static playNumber(column: string, number: number) {
    return new Promise<void>(() => {
      const audioPath = `${this.BASE_PATH}/${column}${number}.mp3`;
      const audio = new Audio(audioPath);
      
      audio.play().catch((error) => {
        this.fallbackTTS(column, number);
        console.error('Erro na reprodução de áudio:', error);
      });
    });
  }

  private static fallbackTTS(column: string, number: number) {
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
  }
}