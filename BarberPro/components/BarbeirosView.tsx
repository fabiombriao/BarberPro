import React, { useState } from 'react';
import { barbers } from './data';
import { PlusIcon, DotsVerticalIcon } from '../constants';

const BarbeirosView: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-dark">Gestão de Barbeiros</h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-yellow hover:bg-brand-yellow-dark rounded-lg shadow">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    {showForm ? 'Cancelar' : 'Novo Barbeiro'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in-down">
                    <h3 className="text-lg font-semibold mb-4">Adicionar Novo Barbeiro</h3>
                    <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <input className="form-input" type="text" placeholder="Nome completo" />
                        <input className="form-input" type="email" placeholder="E-mail" />
                        <input className="form-input" type="number" placeholder="Comissão (%)" />
                        <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Salvar Barbeiro</button>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Barbeiro</th>
                                <th scope="col" className="px-6 py-3">Contato</th>
                                <th scope="col" className="px-6 py-3">Comissão</th>
                                <th scope="col" className="px-6 py-3">Google Agenda</th>
                                <th scope="col" className="px-6 py-3">Status</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Ações</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {barbers.map(barber => (
                                <tr key={barber.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center">
                                            <img className="w-10 h-10 rounded-full" src={barber.avatar} alt={barber.name} />
                                            <div className="pl-3">
                                                <div className="text-base font-semibold">{barber.name}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">{barber.email}</td>
                                    <td className="px-6 py-4">{barber.commission}%</td>
                                    <td className="px-6 py-4">
                                        {barber.google_connected ? 
                                            <span className="text-green-600 font-semibold">Conectado</span> :
                                            <button className="text-blue-600 hover:underline font-semibold">Convidar</button>
                                        }
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 font-semibold leading-tight rounded-full ${barber.status === 'Ativo' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                                            {barber.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-500 hover:text-gray-800"><DotsVerticalIcon className="w-5 h-5"/></button>
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

export default BarbeirosView;
