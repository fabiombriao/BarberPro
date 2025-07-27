import React from 'react';
import { clients } from './data';
import { DotsVerticalIcon } from '../constants';

const ClientesView: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-dark">Lista de Clientes</h2>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Nome</th>
                                <th scope="col" className="px-6 py-3">Contato</th>
                                <th scope="col" className="px-6 py-3">Nº de Visitas</th>
                                <th scope="col" className="px-6 py-3">Última Visita</th>
                                <th scope="col" className="px-6 py-3"><span className="sr-only">Ações</span></th>
                            </tr>
                        </thead>
                        <tbody>
                            {clients.map(client => (
                                <tr key={client.id} className="bg-white border-b hover:bg-gray-50">
                                    <td className="px-6 py-4 font-semibold text-gray-900">{client.name}</td>
                                    <td className="px-6 py-4">
                                        <div>{client.email}</div>
                                        <div className="text-xs text-gray-500">{client.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">{client.visits}</td>
                                    <td className="px-6 py-4">{client.last_visit}</td>
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

export default ClientesView;
