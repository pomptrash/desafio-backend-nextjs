/**
 * Nome do arquivo: not-found.js
 * Data de criação: 24/09/2025
 * Autor: João Pompeu
 * Matrícula: 01748208
 *
 * Descrição:
 * componente NotFound que será renderizado quando uma rota que não existe for acessada
 *
 * Este script é parte o curso de ADS.
 */
export default function NotFound(){
    return (
        <div className="flex flex-col justify-center items-center gap-3">
            <img className="sm:max-w-96" src="https://httpcats.com/404.jpg" alt="um gato dentro de uma caixa e uma mensagem com o status http 404 not found"/>
            <p className="text-2xl font-bold text-center">PÁGINA NÃO ENCONTRADA</p>
        </div>
    )
}