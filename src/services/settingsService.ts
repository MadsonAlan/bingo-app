import { Settings } from "@/types/menuTypes";

export class SettingsService {
  static getSettings(): Settings {
    return typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("bingoSettings") as string)
      : {
          volume: 1,
          autoRepeat: false,
          continuousDraw: false,
        };
  }
}
