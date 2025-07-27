import React from 'react';
import { BarbeirosIcon, AgendaIcon, CheckIcon, ArrowRightIcon } from '../constants';
import { appointments, barbers } from './data';
import { format } from 'date-fns';

const StatCard: React.FC<{ title: string; value: string; change: string; icon: React.ReactNode; }> = ({ title, value, change, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
        <div>
            <p className="text-sm text-brand-text font-medium">{title}</p>
            <p className="text-3xl font-bold text-brand-dark mt-1">{value}</p>
            <p className="text-xs text-green-600 mt-1">{change}</p>
        </div>
        <div className="bg-yellow-100 p-3 rounded-full">
            {icon}
        </div>
    </div>
);

const DashboardView: React.FC = () => {
    const todayAppointments = appointments.slice(0, 4);
    const topBarber = barbers[0];

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Faturamento Hoje" value="R$ 2.450" change="+12.5% vs ontem" icon={<i className="fas fa-dollar-sign text-xl text-brand-yellow-dark"></i>} />
                <StatCard title="Atendimentos Hoje" value="28" change="+3 vs ontem" icon={<AgendaIcon className="w-6 h-6 text-brand-yellow-dark" />} />
                <StatCard title="Ticket Médio" value="R$ 87,50" change="+5.2% vs ontem" icon={<i className="fas fa-receipt text-xl text-brand-yellow-dark"></i>} />
                <StatCard title="Taxa de Ocupação" value="82%" change="-1.0% vs ontem" icon={<i className="fas fa-percent text-xl text-brand-yellow-dark"></i>} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Performance Chart */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-lg text-brand-dark">Desempenho Semanal</h3>
                        <div className="flex space-x-2">
                             <button className="text-sm font-medium text-brand-text hover:text-brand-dark">Semana</button>
                             <button className="text-sm font-bold text-brand-yellow-dark">Mês</button>
                        </div>
                    </div>
                    {/* Placeholder for chart */}
                    <div className="h-64 bg-gray-100 rounded-md flex items-center justify-center">
                        <p className="text-brand-text">Gráfico de Faturamento</p>
                    </div>
                </div>

                {/* Top Barber */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold text-lg text-brand-dark mb-4">Barbeiro do Mês</h3>
                    <div className="flex flex-col items-center text-center">
                        <img className="h-24 w-24 rounded-full object-cover mb-4 ring-4 ring-brand-yellow" src={topBarber.avatar} alt={topBarber.name} />
                        <h4 className="font-bold text-xl">{topBarber.name}</h4>
                        <p className="text-sm text-brand-text">{topBarber.email}</p>
                        <div className="mt-4 bg-yellow-50 text-brand-yellow-dark font-bold py-2 px-4 rounded-lg">
                            124 Atendimentos
                        </div>
                    </div>
                </div>
            </div>

            {/* Today's Appointments */}
            <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-brand-dark">Agenda de Hoje</h3>
                    <button className="flex items-center text-sm font-semibold text-brand-yellow-dark hover:underline">
                        Ver agenda completa <ArrowRightIcon className="w-4 h-4 ml-1" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Horário</th>
                                <th scope="col" className="px-6 py-3">Cliente</th>
                                <th scope="col" className="px-6 py-3">Barbeiro</th>
                                <th scope="col" className="px-6 py-3">Serviço</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todayAppointments.map(app => (
                                <tr key={app.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">{format(new Date(app.date), 'HH:mm')}</td>
                                    <td className="px-6 py-4">{app.client}</td>
                                    <td className="px-6 py-4">{app.barber}</td>
                                    <td className="px-6 py-4">{app.service}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full">
                                            {app.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default DashboardView;