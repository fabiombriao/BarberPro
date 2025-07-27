
import React, { useState } from 'react';
import { User, Appointment } from './data';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import ActionModal from './ActionModal';

interface ClientAppointmentsViewProps {
    appointments: Appointment[];
    setActiveView: (view: string) => void;
    onCancelAppointment: (appointmentId: number) => void;
    onReschedule: (appointmentId: number) => void;
    user: User;
}

const ClientAppointmentsView: React.FC<ClientAppointmentsViewProps> = ({ appointments, setActiveView, onCancelAppointment, onReschedule, user }) => {
    const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');
    const [modalState, setModalState] = useState<{ step: 'confirm' | 'reschedule' | 'success' | null; appointmentId: number | null }>({ step: null, appointmentId: null });

    const allUserAppointments = appointments
        .filter(a => a.client === user.name)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const upcomingAppointments = allUserAppointments.filter(a => new Date(a.date) >= new Date() && a.status === 'Pendente');
    const pastAppointments = allUserAppointments.filter(a => new Date(a.date) < new Date() || a.status !== 'Pendente');

    const canCancel = (dateString: string) => {
        const appointmentDate = new Date(dateString);
        const now = new Date();
        const hoursDifference = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);
        return hoursDifference > 2;
    };

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'Concluído': return 'bg-green-100 text-green-700';
            case 'Pendente': return 'bg-blue-100 text-blue-700';
            case 'Cancelado': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const handleOpenCancelModal = (id: number) => {
        setModalState({ step: 'confirm', appointmentId: id });
    };

    const handleConfirmCancel = () => {
        if (modalState.appointmentId) {
            onCancelAppointment(modalState.appointmentId);
            setModalState(prev => ({ ...prev, step: 'reschedule' }));
        }
    };

    const handleConfirmReschedule = () => {
        if (modalState.appointmentId) {
            onReschedule(modalState.appointmentId)
        }
        closeModal();
    };

    const handleCloseFinal = () => {
        setModalState(prev => ({ ...prev, step: 'success' }));
    };

    const closeModal = () => {
        setModalState({ step: null, appointmentId: null });
    };

    const AppointmentCard: React.FC<{ appointment: Appointment }> = ({ appointment }) => (
        <div className="bg-white p-5 rounded-lg shadow-md border border-gray-200 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div>
                <p className="font-bold text-lg text-brand-dark">{appointment.service}</p>
                <p className="text-sm text-brand-text">com {appointment.barber}</p>
                <p className="text-sm font-medium text-brand-yellow-dark mt-2 capitalize">{format(new Date(appointment.date), "EEEE, dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}</p>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
                 <span className={`w-full sm:w-auto text-center px-3 py-1 text-xs font-semibold leading-tight rounded-full ${getStatusChip(appointment.status)}`}>
                    {appointment.status}
                </span>
                {activeTab === 'upcoming' && appointment.status === 'Pendente' && (
                    <>
                         <button onClick={() => handleOpenCancelModal(appointment.id)} disabled={!canCancel(appointment.date)} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 disabled:opacity-50 disabled:cursor-not-allowed">
                            Cancelar
                        </button>
                        <button onClick={() => onReschedule(appointment.id)} className="w-full sm:w-auto px-4 py-2 text-sm font-medium text-brand-dark bg-brand-yellow rounded-lg hover:bg-brand-yellow-dark">
                            Reagendar
                        </button>
                    </>
                )}
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-brand-dark">Meus Agendamentos</h1>
            
            <div className="flex border-b border-gray-200">
                <button 
                    onClick={() => setActiveTab('upcoming')}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'upcoming' ? 'border-b-2 border-brand-yellow text-brand-dark' : 'text-brand-text hover:text-brand-dark'}`}>
                    Próximos
                </button>
                <button 
                    onClick={() => setActiveTab('past')}
                    className={`px-4 py-2 text-sm font-semibold transition-colors ${activeTab === 'past' ? 'border-b-2 border-brand-yellow text-brand-dark' : 'text-brand-text hover:text-brand-dark'}`}>
                    Histórico
                </button>
            </div>

            <div className="space-y-4">
                {(activeTab === 'upcoming' ? upcomingAppointments : pastAppointments).map(app => (
                    <AppointmentCard key={app.id} appointment={app} />
                ))}
                {(activeTab === 'upcoming' && upcomingAppointments.length === 0) && (
                    <div className="text-center py-12 px-6 bg-white rounded-lg shadow-md border">
                        <h3 className="text-lg font-semibold text-brand-dark">Você não tem agendamentos futuros.</h3>
                        <p className="text-brand-text mt-2">Que tal agendar um novo serviço e garantir seu horário?</p>
                        <button
                            onClick={() => setActiveView('Novo Agendamento')}
                            className="mt-6 bg-brand-yellow text-brand-dark font-bold py-2 px-5 rounded-lg shadow-md hover:bg-brand-yellow-dark transition"
                        >
                            Agendar um Serviço
                        </button>
                    </div>
                )}
                {(activeTab === 'past' && pastAppointments.length === 0) && (
                    <div className="text-center py-12 bg-white rounded-lg shadow-md">
                        <p className="text-brand-text">Seu histórico de agendamentos está vazio.</p>
                    </div>
                )}
            </div>
            {modalState.step === 'confirm' && (
                 <ActionModal
                    title="Cancelar Agendamento"
                    message="Você tem certeza que deseja cancelar esse agendamento?"
                    onClose={closeModal}
                    actions={[
                        { label: 'Não', onClick: closeModal, style: 'secondary' },
                        { label: 'Sim', onClick: handleConfirmCancel, style: 'danger' }
                    ]}
                />
            )}
             {modalState.step === 'reschedule' && (
                 <ActionModal
                    title="Agendamento Cancelado!"
                    message="Gostaria de reagendar?"
                    onClose={handleCloseFinal}
                    actions={[
                        { label: 'Não', onClick: handleCloseFinal, style: 'secondary' },
                        { label: 'Sim', onClick: handleConfirmReschedule, style: 'primary' }
                    ]}
                />
            )}
            {modalState.step === 'success' && (
                 <ActionModal
                    title="Cancelamento Concluído"
                    message="Seu agendamento foi cancelado com sucesso. Estamos ansiosos para atendê-lo novamente o mais breve possível!"
                    onClose={closeModal}
                    actions={[
                        { label: 'Ok', onClick: closeModal, style: 'primary' }
                    ]}
                />
            )}
        </div>
    );
};

export default ClientAppointmentsView;