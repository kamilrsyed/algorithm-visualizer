/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: 'var(--accent)',
        'primary-foreground': 'var(--text-h)',
        skin: {
          bg: 'var(--bg)',
          surface: 'var(--code-bg)',
          muted: 'var(--text)',
          text: 'var(--text-h)',
          border: 'var(--border)'
        }
      }
    }
  },
  plugins: []
}
