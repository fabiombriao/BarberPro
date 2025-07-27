
import React from 'react';
import { LogoIcon } from '../constants';

interface ClientLoginViewProps {
    onLogin: () => void;
    onNavigateToRegister: () => void;
}

const ClientLoginView: React.FC<ClientLoginViewProps> = ({ onLogin, onNavigateToRegister }) => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gray p-4">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="bg-brand-yellow p-3 rounded-xl mb-4">
                        <LogoIcon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-brand-dark">Acesse sua conta</h2>
                    <p className="mt-2 text-sm text-center text-brand-text">
                        Bem-vindo de volta! Agende seu próximo corte.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="email-address" className="sr-only">Email</label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm"
                                placeholder="Seu e-mail"
                                defaultValue="joao.silva@email.com"
                            />
                        </div>
                        <div>
                            <label htmlFor="password sr-only">Senha</label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow focus:z-10 sm:text-sm"
                                placeholder="Sua senha"
                                defaultValue="123456"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow-dark border-gray-300 rounded" />
                            <label htmlFor="remember-me" className="ml-2 block text-gray-900">
                                Lembrar de mim
                            </label>
                        </div>

                        <div >
                            <a href="#" className="font-medium text-brand-yellow-dark hover:text-brand-yellow">
                                Esqueceu sua senha?
                            </a>
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-brand-dark hover:bg-brand-dark-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-yellow-dark"
                        >
                            Entrar
                        </button>
                    </div>
                </form>
                 <p className="mt-4 text-center text-sm text-gray-600">
                    Não tem uma conta?{' '}
                    <button type="button" onClick={onNavigateToRegister} className="font-medium text-brand-yellow-dark hover:text-brand-yellow">
                        Cadastre-se
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ClientLoginView;
