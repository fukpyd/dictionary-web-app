export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export function toggleTheme(rootElement, themes) {
  rootElement.classList.toggle('dark');
  let currentTheme = themes.DARK;
  if (!rootElement.classList.contains('dark')) {
    currentTheme = themes.LIGHT;
  }
  localStorage.setItem('theme', currentTheme);
}
