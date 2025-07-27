
import React from 'react';
import { LogoIcon } from '../constants';

const Header: React.FC = () => {
    return (
        <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                    <div className="bg-brand-yellow p-2 rounded-lg">
                       <LogoIcon className="h-6 w-6 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-800">BarberPro</h1>
                        <p className="text-xs text-brand-text">Gestão Inteligente</p>
                    </div>
                </div>
                <nav className="hidden md:flex items-center space-x-8">
                    <a href="#funcionalidades" className="text-gray-600 hover:text-brand-yellow-dark transition">Funcionalidades</a>
                    <a href="#precos" className="text-gray-600 hover:text-brand-yellow-dark transition">Preços</a>
                    <a href="#contato" className="text-gray-600 hover:text-brand-yellow-dark transition">Contato</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <button className="text-gray-600 font-medium hover:text-brand-yellow-dark transition">Entrar</button>
                    <button className="bg-brand-yellow hover:bg-brand-yellow-dark text-gray-800 font-bold py-2 px-4 rounded-lg shadow-md transition">Começar Grátis</button>
                </div>
            </div>
        </header>
    );
};

export default Header;
