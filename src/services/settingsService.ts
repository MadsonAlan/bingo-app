export const SettingsService = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem('bingoSettings') || '{ volume: Math.floor(1), theme: "light", autoRepeat: false, continuousDraw: false }')
  }
};