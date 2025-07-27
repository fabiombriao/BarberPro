
import React from 'react';
import { AgendaIcon, ClientesIcon, RelatoriosIcon } from '../constants';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string; highlighted?: boolean; }> = ({ icon, title, description, highlighted = false }) => (
    <div className={`bg-white rounded-xl p-6 shadow-lg transform transition-transform hover:-translate-y-2 ${highlighted ? 'border-2 border-brand-yellow scale-105' : 'border border-gray-200'}`}>
        <div className="flex items-center space-x-4">
            <div className="bg-gray-100 p-3 rounded-lg">
                {icon}
            </div>
            <div>
                <h3 className="font-bold text-gray-800">{title}</h3>
                <p className="text-sm text-brand-text">{description}</p>
            </div>
        </div>
    </div>
);


const Hero: React.FC = () => {
    return (
        <section className="relative bg-white py-20 md:py-32 overflow-hidden">
             <div className="absolute -top-20 -right-40 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl" />
             <div className="absolute top-1/2 -left-40 w-96 h-96 bg-gray-100/50 rounded-full blur-3xl" />
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-2 gap-16 items-center">
                    <div className="max-w-xl">
                        <div className="inline-block bg-yellow-100 text-yellow-600 text-sm font-semibold px-3 py-1 rounded-full mb-4">
                            <span className="mr-2">✦</span> Sistema SaaS para Barbearias
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight">
                            Gestão Inteligente <br/> para sua <span className="bg-brand-yellow px-2 text-white rounded-md">Barbearia</span>
                        </h1>
                        <p className="mt-6 text-lg text-brand-text">
                            Controle completo da sua barbearia em uma plataforma. Gerencie agendamentos, barbeiros, relatórios financeiros e integre com Google Calendar.
                        </p>
                        <div className="mt-8 flex items-center space-x-4">
                            <button className="bg-brand-yellow hover:bg-brand-yellow-dark text-gray-800 font-bold py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition">Começar Grátis por 14 dias</button>
                            <button className="font-semibold text-gray-700 hover:text-gray-900 transition">Ver Demonstração</button>
                        </div>
                        <div className="mt-12 flex items-center space-x-8 text-brand-text font-semibold">
                            <p><span className="text-yellow-500 font-bold text-xl">500+</span> Barbearias</p>
                            <p><span className="text-yellow-500 font-bold text-xl">50k+</span> Agendamentos</p>
                        </div>
                    </div>
                    <div className="relative space-y-6">
                        <FeatureCard icon={<AgendaIcon className="h-6 w-6 text-yellow-500" />} title="Agenda Integrada" description="Sincronização automática com Google Calendar" />
                        <div className="md:ml-12">
                             <FeatureCard icon={<ClientesIcon className="h-6 w-6 text-yellow-500" />} title="Gestão de Equipe" description="Controle completo de barbeiros e comissões" highlighted />
                        </div>
                        <FeatureCard icon={<RelatoriosIcon className="h-6 w-6 text-yellow-500" />} title="Relatórios" description="Análises detalhadas de faturamento e performance" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;