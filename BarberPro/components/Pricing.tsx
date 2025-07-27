
import React from 'react';
import { CheckIcon } from '../constants';

interface Plan {
    name: string;
    description: string;
    price: string;
    features: string[];
    highlighted?: boolean;
    badge?: string;
    badgeColor?: string;
}

const plans: Plan[] = [
    {
        name: "Starter",
        description: "Perfeito para barbearias pequenas",
        price: "49",
        features: [
            "Até 2 barbeiros",
            "Agenda integrada Google Calendar",
            "Relatórios básicos",
            "Suporte por email",
            "50 agendamentos/mês"
        ]
    },
    {
        name: "Professional",
        description: "Ideal para barbearias em crescimento",
        price: "99",
        features: [
            "Até 5 barbeiros",
            "Agenda integrada Google Calendar",
            "Relatórios avançados",
            "Suporte prioritário",
            "Agendamentos ilimitados",
            "Integração ASAAS",
            "Notificações WhatsApp"
        ],
        highlighted: true,
        badge: "Mais Popular",
        badgeColor: "bg-yellow-400"
    },
    {
        name: "Enterprise",
        description: "Para redes de barbearias",
        price: "199",
        features: [
            "Barbeiros ilimitados",
            "Múltiplas unidades",
            "API personalizada",
            "Suporte 24/7",
            "Relatórios personalizados",
            "Integração avançada",
            "Treinamento incluído",
            "Backup automático"
        ],
        badge: "Premium",
        badgeColor: "bg-gray-800"
    }
];

const PricingCard: React.FC<{ plan: Plan }> = ({ plan }) => (
    <div className={`border rounded-2xl p-8 flex flex-col ${plan.highlighted ? 'border-brand-yellow bg-white shadow-2xl scale-105' : 'border-gray-200 bg-white shadow-lg'}`}>
        {plan.badge && (
            <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-white text-xs font-bold px-4 py-1.5 rounded-full`}>
                {plan.badge}
            </div>
        )}
        <h3 className="text-2xl font-bold text-gray-800">{plan.name}</h3>
        <p className="text-brand-text mt-2">{plan.description}</p>
        <div className="mt-6">
            <span className="text-5xl font-extrabold text-gray-900">R$ {plan.price}</span>
            <span className="text-lg text-brand-text">/mês</span>
        </div>
        <ul className="mt-8 space-y-4 flex-grow">
            {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                    <CheckIcon className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-700">{feature}</span>
                </li>
            ))}
        </ul>
        <button className={`mt-8 w-full py-3 rounded-lg font-bold transition-transform transform hover:scale-105 ${plan.highlighted ? 'bg-brand-yellow hover:bg-brand-yellow-dark text-gray-800 shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            Começar Teste Grátis
        </button>
    </div>
);

const Pricing: React.FC = () => {
    return (
        <section id="precos" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        Planos que <span className="text-brand-yellow">Crescem</span> com seu Negócio
                    </h2>
                    <p className="mt-4 text-lg text-brand-text">
                        Escolha o plano ideal para sua barbearia. Todos incluem 14 dias grátis para testar.
                    </p>
                </div>
                <div className="grid lg:grid-cols-3 gap-8 max-w-5xl mx-auto items-start">
                    {plans.map((plan, index) => (
                        <div key={index} className="relative">
                            <PricingCard plan={plan} />
                        </div>
                    ))}
                </div>
                <div className="text-center mt-16 text-brand-text">
                    <p>Todos os planos incluem 14 dias grátis • Cancele a qualquer momento</p>
                    <div className="mt-4 flex justify-center items-center space-x-6">
                        <span className="flex items-center"><CheckIcon className="h-5 w-5 text-green-500 mr-2" /> Sem taxa de setup</span>
                        <span className="flex items-center"><CheckIcon className="h-5 w-5 text-green-500 mr-2" /> Suporte em português</span>
                        <span className="flex items-center"><CheckIcon className="h-5 w-5 text-green-500 mr-2" /> Dados seguros</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Pricing;
