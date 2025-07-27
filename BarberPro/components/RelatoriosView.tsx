import React from 'react';
import { RelatoriosIcon } from '../constants';

const ReportCard: React.FC<{ title: string; value: string; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 mr-4">
                {icon}
            </div>
            <div>
                <p className="text-sm font-medium text-brand-text">{title}</p>
                <p className="text-2xl font-bold text-brand-dark">{value}</p>
            </div>
        </div>
    </div>
);

const RelatoriosView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-dark">Relatórios Detalhados</h2>
            
            {/* Filters */}
            <div className="bg-white p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Período</label>
                        <select className="mt-1 form-select w-full">
                            <option>Este Mês</option>
                            <option>Mês Passado</option>
                            <option>Últimos 90 dias</option>
                            <option>Personalizado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Barbeiro</label>
                        <select className="mt-1 form-select w-full">
                            <option>Todos</option>
                            <option>Carlos Santos</option>
                            <option>Roberto Lima</option>
                            <option>André Costa</option>
                        </select>
                    </div>
                    <div className="col-span-1 md:col-span-2">
                        <button className="w-full md:w-auto bg-brand-yellow hover:bg-brand-yellow-dark text-white font-bold py-2 px-4 rounded-lg">
                            Gerar Relatório
                        </button>
                    </div>
                </div>
            </div>

            {/* Reports Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ReportCard title="Faturamento Total" value="R$ 18.430,50" icon={<i className="fas fa-dollar-sign text-xl text-brand-yellow-dark"></i>} />
                <ReportCard title="Total de Agendamentos" value="212" icon={<RelatoriosIcon className="w-6 h-6 text-brand-yellow-dark"/>} />
                <ReportCard title="Ticket Médio" value="R$ 86,93" icon={<i className="fas fa-receipt text-xl text-brand-yellow-dark"></i>} />
                <ReportCard title="Novos Clientes" value="34" icon={<i className="fas fa-user-plus text-xl text-brand-yellow-dark"></i>} />
            </div>

            {/* Detailed Lists */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold mb-4">Serviços Mais Vendidos</h3>
                    <ul>
                        <li className="flex justify-between py-2 border-b"><span>Corte Masculino</span> <span className="font-semibold">105</span></li>
                        <li className="flex justify-between py-2 border-b"><span>Barba Premium</span> <span className="font-semibold">68</span></li>
                        <li className="flex justify-between py-2"><span>Corte + Barba</span> <span className="font-semibold">39</span></li>
                    </ul>
                </div>
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="font-bold mb-4">Faturamento por Barbeiro</h3>
                    <ul>
                    <li className="flex justify-between py-2 border-b"><span>Carlos Santos</span> <span className="font-semibold">R$ 7.890,00</span></li>
                        <li className="flex justify-between py-2 border-b"><span>Roberto Lima</span> <span className="font-semibold">R$ 6.120,50</span></li>
                        <li className="flex justify-between py-2"><span>André Costa</span> <span className="font-semibold">R$ 4.420,00</span></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default RelatoriosView;
