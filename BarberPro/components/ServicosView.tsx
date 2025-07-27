import React, { useState } from 'react';
import { services } from './data';
import { PlusIcon, DotsVerticalIcon } from '../constants';

const ServicosView: React.FC = () => {
    const [showForm, setShowForm] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-brand-dark">Catálogo de Serviços</h2>
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className="flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-yellow hover:bg-brand-yellow-dark rounded-lg shadow">
                    <PlusIcon className="w-4 h-4 mr-2" />
                    {showForm ? 'Cancelar' : 'Novo Serviço'}
                </button>
            </div>

            {showForm && (
                <div className="bg-white p-6 rounded-lg shadow-md animate-fade-in-down">
                    <h3 className="text-lg font-semibold mb-4">Adicionar Novo Serviço</h3>
                    <form className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <input className="md:col-span-2 form-input" type="text" placeholder="Nome do serviço" />
                            <input className="form-input" type="number" placeholder="Duração (min)" />
                            <input className="form-input" type="text" placeholder="Valor (R$)" />
                        </div>
                        <div>
                            <textarea className="form-input w-full" placeholder="Descrição do serviço" rows={2}></textarea>
                        </div>
                        <div>
                            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">Salvar Serviço</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome do Serviço</th>
                                <th scope="col" className="px-6 py-3">Descrição</th>
                                <th scope="col" className="px-6 py-3">Duração</th>
                                <th scope="col" className="px-6 py-3">Valor</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Ações</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {services.map(service => (
                                <tr key={service.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{service.name}</td>
                                    <td className="px-6 py-4">{service.description}</td>
                                    <td className="px-6 py-4">{service.duration} min</td>
                                    <td className="px-6 py-4 font-semibold">R$ {service.price.toFixed(2)}</td>
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

export default ServicosView;