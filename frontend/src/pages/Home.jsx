import React from 'react'
import useAuth from '../hooks/useAuth'
import MiQR from '../components/QR'
import { Link } from 'react-router-dom'

const Home = () => {
    const { logout, cliente } = useAuth()

    return (
        <div className="min-h-screen bg-[#f0f7f1] flex flex-col max-w-sm mx-auto font-sans">

            {/* Header */}
            <header className="bg-[#1a5e2a] px-5 pt-5 pb-8 flex items-center justify-between rounded-b-[2rem]">
                <div className='flex justify-center w-full'>
                    <p className="text-white font-bold tracking-widest text-lg leading-none text-center" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                        GimnasioOlympo
                    </p>
                </div>
                <button
                    onClick={logout}
                    className="bg-red-500 border border-white/25 text-white text-sm px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                >
                    Salir
                </button>
            </header>

            {/* Body */}
            <main className="px-5 pt-6 flex flex-col gap-5 flex-1">
                {/* QR */}
                <div className="bg-white rounded-2xl border border-[#c3dfc9] p-6 flex flex-col items-center gap-4">
                    <p className="text-[11px] uppercase tracking-[2.5px] text-[#6b9977] font-medium">
                        Tu acceso al gimnasio
                    </p>
                    <div className="border-2 border-[#1a5e2a] rounded-2xl p-4 ring-4 ring-[#e8f5eb]">
                        <MiQR value={cliente?.id} size={180} />
                    </div>
                    <div className="bg-[#f0f7f2] border border-[#b4d9bf] rounded-full px-5 py-1.5 text-[#2e7d46] text-sm tracking-widest uppercase">
                        {cliente?.nombre ?? '------'}
                    </div>
                    <p className="text-xs text-[#9dbfa6] text-center">
                        Muestra este código en recepción para registrar tu entrada
                    </p>
                </div>
            </main>

            {/* Nav bar */}
            <nav className="bg-gradient-to-r from-green-50 to-green-100 border-t border-green-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] flex justify-around items-center py-3 px-2 sticky bottom-0 backdrop-blur-md">

                <Link
                    to="/inicio"
                    className="flex flex-col items-center justify-center text-green-800 hover:text-green-600 transition-all duration-200 hover:scale-105"
                >
                    <div className="px-4 py-2 rounded-xl hover:bg-green-200/60 transition">
                        <p className="text-sm font-semibold tracking-wide">Inicio</p>
                    </div>
                </Link>

                <Link
                    to="/qr"
                    className="flex flex-col items-center justify-center text-green-800 hover:text-green-600 transition-all duration-200 hover:scale-105"
                >
                    <div className="px-4 py-2 rounded-xl hover:bg-green-200/60 transition">
                        <p className="text-sm font-semibold tracking-wide">QR</p>
                    </div>
                </Link>

                <Link
                    to="/clases"
                    className="flex flex-col items-center justify-center text-green-800 hover:text-green-600 transition-all duration-200 hover:scale-105"
                >
                    <div className="px-4 py-2 rounded-xl hover:bg-green-200/60 transition">
                        <p className="text-sm font-semibold tracking-wide">Clases</p>
                    </div>
                </Link>

                <Link
                    to="/perfil"
                    className="flex flex-col items-center justify-center text-green-800 hover:text-green-600 transition-all duration-200 hover:scale-105"
                >
                    <div className="px-4 py-2 rounded-xl hover:bg-green-200/60 transition">
                        <p className="text-sm font-semibold tracking-wide">Perfil</p>
                    </div>
                </Link>

            </nav>
        </div>
    )
}

export default Home