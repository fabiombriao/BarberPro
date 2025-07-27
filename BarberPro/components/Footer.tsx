
import React from 'react';
import { LogoIcon, EmailIcon, PhoneIcon, LocationIcon } from '../constants';

const Footer: React.FC = () => {
    return (
        <footer id="contato" className="bg-brand-dark text-gray-300">
            <div className="container mx-auto px-6 py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Branding */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                             <div className="bg-brand-yellow p-2 rounded-lg">
                                <LogoIcon className="h-6 w-6 text-white"/>
                             </div>
                             <div>
                                <h1 className="text-xl font-bold text-white">BarberPro</h1>
                                <p className="text-xs text-gray-400">Gestão Inteligente</p>
                            </div>
                        </div>
                        <p className="text-gray-400">A plataforma SaaS completa para gestão de barbearias modernas.</p>
                    </div>

                    {/* Produto */}
                    <div>
                        <h4 className="font-bold text-white tracking-wider mb-4">Produto</h4>
                        <ul className="space-y-3">
                            <li><a href="#funcionalidades" className="hover:text-brand-yellow transition">Funcionalidades</a></li>
                            <li><a href="#precos" className="hover:text-brand-yellow transition">Preços</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition">Demonstração</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition">Integrações</a></li>
                        </ul>
                    </div>

                    {/* Suporte */}
                    <div>
                        <h4 className="font-bold text-white tracking-wider mb-4">Suporte</h4>
                        <ul className="space-y-3">
                            <li><a href="#" className="hover:text-brand-yellow transition">Central de Ajuda</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition">Documentação</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition">Tutoriais</a></li>
                            <li><a href="#" className="hover:text-brand-yellow transition">Status do Sistema</a></li>
                        </ul>
                    </div>

                    {/* Contato */}
                    <div>
                        <h4 className="font-bold text-white tracking-wider mb-4">Contato</h4>
                        <ul className="space-y-4">
                            <li className="flex items-center space-x-3">
                                <EmailIcon className="h-5 w-5 text-brand-yellow" />
                                <a href="mailto:contato@barberpro.com" className="hover:text-brand-yellow transition">contato@barberpro.com</a>
                            </li>
                            <li className="flex items-center space-x-3">
                                <PhoneIcon className="h-5 w-5 text-brand-yellow" />
                                <span>(11) 9999-9999</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <LocationIcon className="h-5 w-5 text-brand-yellow" />
                                <span>São Paulo, SP</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-brand-dark-200">
                <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                    <p>&copy; 2024 BarberPro. Todos os direitos reservados.</p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition">Privacidade</a>
                        <a href="#" className="hover:text-white transition">Termos</a>
                        <a href="#" className="hover:text-white transition">Cookies</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;