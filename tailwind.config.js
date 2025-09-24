/**
 * Nome do arquivo: tailwind.config.js
 * Data de criação: 23/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * arquivo css responsável por configuração inicial do tailwind.css 
 *
 * Este script é parte o curso de ADS.
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#58C4DC'
      }
    },
  },
  plugins: [],
}

