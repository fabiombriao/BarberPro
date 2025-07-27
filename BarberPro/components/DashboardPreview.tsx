
import React from 'react';
import { StatsIcon, AgendaIcon, BarbeirosIcon, TicketIcon, PlusIcon, UserPlusIcon, RelatoriosIcon, FinanceIcon } from '../constants';

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode; changeColor: string }> = ({ title, value, change, icon, changeColor }) => (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex-1">
        <div className="flex justify-between items-start">
            <p className="text-brand-text">{title}</p>
            {icon}
        </div>
        <p className="text-3xl font-bold text-gray-800 mt-2">{value}</p>
        <p className={`text-sm mt-1 ${changeColor}`}>{change}</p>
    </div>
);

const AppointmentCard: React.FC<{ time: string; client: string; services: string; price: string; status: 'Confirmado' | 'Em Andamento'; avatar: string }> = ({ time, client, services, price, status, avatar }) => (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 last:border-b-0">
        <div className="flex items-center space-x-4">
             <div className="bg-yellow-100 text-yellow-600 font-bold rounded-full h-10 w-10 flex items-center justify-center text-sm">{avatar}</div>
            <div>
                <p className="font-semibold text-gray-800">{client}</p>
                <p className="text-sm text-brand-text">{services}</p>
            </div>
        </div>
        <div className="text-right">
            <p className="text-sm text-brand-text flex items-center"><i className="far fa-clock mr-1.5"></i>{time}</p>
            <div className="flex items-center space-x-4 mt-1">
                <p className="font-bold text-gray-800">R$ {price}</p>
                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${status === 'Confirmado' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{status}</span>
            </div>
        </div>
    </div>
);

const QuickAction: React.FC<{ icon: React.ReactNode; text: string; highlighted?: boolean }> = ({ icon, text, highlighted = false }) => (
    <button className={`w-full flex items-center space-x-3 p-4 rounded-lg transition ${highlighted ? 'bg-brand-yellow text-gray-800 font-bold shadow-md hover:bg-brand-yellow-dark' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
        {icon}
        <span>{text}</span>
    </button>
);


const DashboardPreview: React.FC = () => {
    return (
        <section className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                     <div className="inline-block bg-yellow-100 text-yellow-600 text-sm font-semibold px-4 py-2 rounded-full mb-4">
                        <span className="mr-2">👑</span> Painel do Proprietário
                    </div>
                    <h2 className="text-4xl font-extrabold text-gray-800">
                        Dashboard <span className="text-brand-yellow">Executivo</span>
                    </h2>
                    <p className="mt-4 text-lg text-brand-text">
                        Tenha controle total do seu negócio com métricas em tempo real e relatórios detalhados.
                    </p>
                </div>

                <div className="bg-gray-50 p-8 rounded-2xl shadow-lg">
                    {/* Stats */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        <StatCard title="Faturamento Hoje" value="R$ 2.450" change="+12.5%" icon={<StatsIcon className="h-6 w-6 text-green-500" />} changeColor="text-green-600" />
                        <StatCard title="Agendamentos Hoje" value="28" change="+3 desde ontem" icon={<AgendaIcon className="h-6 w-6 text-blue-500" />} changeColor="text-green-600" />
                        <StatCard title="Barbeiros Ativos" value="5" change="2 trabalhando agora" icon={<BarbeirosIcon className="h-6 w-6 text-purple-500" />} changeColor="text-brand-text" />
                        <StatCard title="Ticket Médio" value="R$ 87,50" change="+5.2%" icon={<TicketIcon className="h-6 w-6 text-yellow-500" />} changeColor="text-green-600" />
                    </div>

                    {/* Main Content */}
                    <div className="grid lg:grid-cols-3 gap-8 mt-8">
                        {/* Appointments */}
                        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6 flex justify-between items-center border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-800">Agendamentos de Hoje</h3>
                                <button className="font-semibold text-brand-yellow-dark hover:text-brand-yellow transition">Ver Todos</button>
                            </div>
                            <div>
                                <AppointmentCard time="09:30" client="João Silva" services="Carlos Santos • Corte + Barba" price="45" status="Confirmado" avatar="JS" />
                                <AppointmentCard time="10:00" client="Pedro Oliveira" services="Roberto Lima • Corte Masculino" price="30" status="Em Andamento" avatar="PO" />
                                <AppointmentCard time="10:30" client="Lucas Ferreira" services="André Costa • Barba Premium" price="25" status="Confirmado" avatar="LF" />
                                <AppointmentCard time="11:00" client="Marco Antonio" services="Carlos Santos • Corte + Barba + Massagem" price="65" status="Confirmado" avatar="MA" />
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                             <h3 className="text-xl font-bold text-gray-800 mb-4">Ações Rápidas</h3>
                             <p className="text-brand-text mb-6">Funcionalidades mais utilizadas</p>
                             <div className="space-y-4">
                                <QuickAction icon={<PlusIcon className="h-5 w-5"/>} text="Novo Agendamento" />
                                <QuickAction icon={<UserPlusIcon className="h-5 w-5"/>} text="Adicionar Barbeiro" />
                                <QuickAction icon={<RelatoriosIcon className="h-5 w-5"/>} text="Ver Relatórios" />
                                <QuickAction icon={<FinanceIcon className="h-5 w-5"/>} text="Relatório Financeiro" highlighted />
                             </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DashboardPreview;