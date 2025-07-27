
import React from 'react';
import { AgendaIcon, BarbeirosIcon, RelatoriosIcon, ConfiguracoesIcon, NotificationIcon, PaymentsIcon, DashboardIcon, CustomHoursIcon, SecureAccessIcon } from '../constants';

interface Feature {
    icon: React.ReactNode;
    title: string;
    description: string;
    tag?: {
        text: string;
        color: string;
    };
}

const features: Feature[] = [
    {
        icon: <AgendaIcon className="h-7 w-7 text-blue-500"/>,
        title: "Agenda Inteligente",
        description: "Sincronização automática com Google Calendar e bloqueio de horários ocupados.",
        tag: { text: "Popular", color: "bg-blue-500" }
    },
    {
        icon: <BarbeirosIcon className="h-7 w-7 text-green-500"/>,
        title: "Gestão de Barbeiros",
        description: "Cadastre barbeiros, defina comissões e gerencie acesso individual.",
        tag: { text: "Essencial", color: "bg-green-500" }
    },
    {
        icon: <RelatoriosIcon className="h-7 w-7 text-yellow-500"/>,
        title: "Relatórios Avançados",
        description: "Faturamento por período, barbeiro, serviços mais vendidos e ticket médio.",
        tag: { text: "Premium", color: "bg-gray-800" }
    },
    {
        icon: <ConfiguracoesIcon className="h-7 w-7 text-purple-500"/>,
        title: "Configurações Flexíveis",
        description: "Personalize serviços, preços, horários de funcionamento e comissões."
    },
    {
        icon: <NotificationIcon className="h-7 w-7 text-orange-500"/>,
        title: "Notificações",
        description: "Alertas automáticos para novos agendamentos e lembretes."
    },
    {
        icon: <PaymentsIcon className="h-7 w-7 text-teal-500"/>,
        title: "Pagamentos ASAAS",
        description: "Integração com sistema de pagamentos para cobranças automáticas.",
        tag: { text: "Novo", color: "bg-teal-500" }
    },
    {
        icon: <DashboardIcon className="h-7 w-7 text-red-500"/>,
        title: "Dashboard Executivo",
        description: "Visão completa do negócio: faturamento, agendamentos e performance."
    },
    {
        icon: <CustomHoursIcon className="h-7 w-7 text-indigo-500"/>,
        title: "Horários Personalizados",
        description: "Configure dias e horários de funcionamento específicos por barbeiro."
    },
    {
        icon: <SecureAccessIcon className="h-7 w-7 text-cyan-500"/>,
        title: "Acesso Seguro",
        description: "Autenticação separada para proprietário e barbeiros com permissões específicas.",
        tag: { text: "Seguro", color: "bg-cyan-600" }
    }
];

const Features: React.FC = () => {
    return (
        <section id="funcionalidades" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        Funcionalidades <span className="text-brand-yellow">Completas</span>
                    </h2>
                    <p className="mt-4 text-lg text-brand-text">
                        Tudo que sua barbearia precisa em uma plataforma integrada e fácil de usar.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 relative">
                            {feature.tag && (
                                <div className={`absolute top-0 right-6 -mt-3 text-white text-xs font-bold px-3 py-1 rounded-full ${feature.tag.color}`}>
                                    {feature.tag.text}
                                </div>
                            )}
                            <div className="flex items-center mb-4 space-x-4">
                                <div className="bg-gray-100 p-3 rounded-lg">
                                {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800">{feature.title}</h3>
                            </div>
                            <p className="text-brand-text">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;