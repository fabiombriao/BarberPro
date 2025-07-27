import React, { useState } from 'react';
import { clients, services, barbers } from './data';
import { ClientesIcon, ServicosIcon, BarbeirosIcon, AgendaIcon, CustomHoursIcon, PencilIcon } from '../constants';

interface NewAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const FormRow: React.FC<{ icon: React.ReactNode; label: string; children: React.ReactNode }> = ({ icon, label, children }) => (
    <div>
        <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
            {icon}
            <span className="ml-2">{label}</span>
        </label>
        {children}
    </div>
);

const NewAppointmentModal: React.FC<NewAppointmentModalProps> = ({ isOpen, onClose }) => {
    const [selectedClient, setSelectedClient] = useState('');
    const [showNewClientForm, setShowNewClientForm] = useState(false);
    const [selectedService, setSelectedService] = useState('');
    const [selectedBarber, setSelectedBarber] = useState('');
    
    const activeBarbers = barbers.filter(b => b.status === 'Ativo' && b.google_connected);
    const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    if (!isOpen) return null;

    const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'add-new') {
            setShowNewClientForm(true);
            setSelectedClient(value);
        } else {
            setShowNewClientForm(false);
            setSelectedClient(value);
        }
    };
    
    const handleClose = () => {
        setShowNewClientForm(false);
        onClose();
    }

    const serviceDetails = services.find(s => s.id.toString() === selectedService);

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in-down" onClick={handleClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="p-6 border-b">
                    <h3 className="text-xl font-bold text-brand-dark">Novo Agendamento</h3>
                    <p className="text-sm text-brand-text">Preencha os dados abaixo para criar um novo agendamento.</p>
                </div>

                <form className="p-6 space-y-5">
                    <FormRow icon={<ClientesIcon className="w-5 h-5 text-gray-400" />} label="Cliente">
                        <select
                            value={selectedClient}
                            onChange={handleClientChange}
                            className="form-select w-full"
                        >
                            <option value="" disabled>Selecione um cliente</option>
                            <option value="add-new">-- Adicionar Novo Cliente --</option>
                            {clients.map(client => (
                                <option key={client.id} value={client.id}>{client.name}</option>
                            ))}
                        </select>
                    </FormRow>

                    {showNewClientForm && (
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 border rounded-md bg-gray-50 animate-fade-in-down">
                            <input type="text" placeholder="Nome do Cliente" className="form-input" />
                            <input type="text" placeholder="Telefone" className="form-input" />
                            <input type="email" placeholder="E-mail (opcional)" className="form-input" />
                        </div>
                    )}

                    <FormRow icon={<ServicosIcon className="w-5 h-5 text-gray-400" />} label="Serviço">
                        <select 
                            value={selectedService} 
                            onChange={e => setSelectedService(e.target.value)} 
                            className="form-select w-full"
                        >
                            <option value="" disabled>Selecione um serviço</option>
                            {services.map(service => (
                                <option key={service.id} value={service.id}>{service.name}</option>
                            ))}
                        </select>
                        {serviceDetails && (
                            <p className="text-xs text-brand-text mt-1">
                                Duração: {serviceDetails.duration} min • Valor: R$ {serviceDetails.price.toFixed(2)}
                            </p>
                        )}
                    </FormRow>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <FormRow icon={<BarbeirosIcon className="w-5 h-5 text-gray-400" />} label="Barbeiro">
                            <select 
                                value={selectedBarber} 
                                onChange={e => setSelectedBarber(e.target.value)}
                                className="form-select w-full"
                            >
                                <option value="" disabled>Selecione um barbeiro</option>
                                {activeBarbers.map(barber => (
                                    <option key={barber.id} value={barber.id}>{barber.name}</option>
                                ))}
                            </select>
                            {barbers.filter(b => b.status !== 'Ativo' || !b.google_connected).length > 0 &&
                                <p className="text-xs text-blue-500 mt-1">
                                    Apenas barbeiros ativos e com Google Agenda conectado são exibidos.
                                </p>
                            }
                        </FormRow>

                        <FormRow icon={<AgendaIcon className="w-5 h-5 text-gray-400" />} label="Data">
                           <input type="date" className="form-input w-full" defaultValue={new Date().toISOString().split('T')[0]} />
                        </FormRow>
                    </div>

                    <FormRow icon={<CustomHoursIcon className="w-5 h-5 text-gray-400" />} label="Horário">
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                            {availableTimes.map(time => (
                                <button key={time} type="button" className="px-3 py-2 text-sm border rounded-md text-gray-700 hover:bg-brand-yellow hover:text-white hover:border-brand-yellow focus:bg-brand-yellow focus:text-white focus:border-brand-yellow transition">
                                    {time}
                                </button>
                            ))}
                        </div>
                    </FormRow>

                    <FormRow icon={<PencilIcon className="w-5 h-5 text-gray-400" />} label="Observações Adicionais (Opcional)">
                        <textarea placeholder="Alguma preferência ou detalhe importante para o barbeiro?" className="form-input w-full" rows={2}></textarea>
                    </FormRow>
                </form>

                <div className="p-6 bg-gray-50 border-t flex justify-end space-x-3">
                    <button onClick={handleClose} type="button" className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none">
                        Cancelar
                    </button>
                    <button type="submit" className="px-6 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-sm">
                        Agendar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewAppointmentModal;