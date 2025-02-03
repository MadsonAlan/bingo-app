export const SettingsService = () => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem('bingoSettings') || '{}')
  }
};