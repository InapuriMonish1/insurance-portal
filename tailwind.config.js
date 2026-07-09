/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0F1C2E',
          800: '#16273D',
          700: '#20344D',
          600: '#2C4460',
          400: '#5C7391',
          200: '#AEBBCB'
        },
        paper: {
          50: '#F7F8FA',
          100: '#EDEFF3',
          200: '#E2E5EB'
        },
        steel: {
          700: '#16304F',
          600: '#1F3A5F',
          500: '#2C4F7C',
          400: '#4A6C99'
        },
        brick: {
          600: '#9E3D22',
          500: '#B5482B',
          100: '#F3DCD3'
        },
        moss: {
          600: '#2F5940',
          500: '#3F6E52',
          100: '#DCE8DF'
        },
        gold: {
          600: '#9C6C1F',
          500: '#C88A2E',
          100: '#F3E4C8'
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace']
      },
      boxShadow: {
        panel: '0 1px 2px rgba(15, 28, 46, 0.06), 0 1px 0 rgba(15, 28, 46, 0.04)'
      }
    }
  },
  plugins: []
}
