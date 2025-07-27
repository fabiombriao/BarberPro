
import React from 'react';
import { User, Appointment } from './data';
import { BarbeirosIcon, HistoryIcon, ServicosIcon, LocationIcon, LogoIcon } from '../constants';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ClientDashboardViewProps {
    setActiveView: (view: string) => void;
    appointments: Appointment[];
    user: User;
    onReschedule: (appointmentId: number) => void;
}

const ClientDashboardView: React.FC<ClientDashboardViewProps> = ({ setActiveView, appointments, user, onReschedule }) => {
    
    const upcomingAppointments = appointments
        .filter(a => a.client === user.name && a.status === 'Pendente' && new Date(a.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    const nextAppointment = upcomingAppointments[0];

    const pastAppointments = appointments
        .filter(a => a.client === user.name && (new Date(a.date) < new Date() || a.status !== 'Pendente'))
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5);

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), "EEEE, dd 'de' MMMM 'às' HH:mm", { locale: ptBR });
    }

    const getStatusChip = (status: string) => {
        switch (status) {
            case 'Concluído': return 'bg-green-100 text-green-700';
            case 'Pendente': return 'bg-blue-100 text-blue-700';
            case 'Cancelado': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-brand-dark">Olá, {user.name.split(' ')[0]}! 👋</h1>
                <p className="text-brand-text mt-1">Bem-vindo(a) de volta! Pronto para o seu próximo corte?</p>
            </div>

            {/* Next Appointment & Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-brand-dark text-white p-8 rounded-2xl shadow-lg flex flex-col">
                    {nextAppointment ? (
                        <>
                            <h2 className="text-sm font-bold uppercase tracking-wider text-brand-yellow mb-2">Seu Próximo Agendamento</h2>
                            <p className="text-2xl font-bold capitalize">{formatDate(nextAppointment.date)}</p>
                            <div className="mt-6 border-t border-gray-600 pt-6 space-y-4 text-gray-300 flex-grow">
                                <div className="flex items-center"><ServicosIcon className="w-5 h-5 mr-3 text-brand-yellow"/> {nextAppointment.service}</div>
                                <div className="flex items-center"><BarbeirosIcon className="w-5 h-5 mr-3 text-brand-yellow"/> {nextAppointment.barber}</div>
                                <div className="flex items-center"><LocationIcon className="w-5 h-5 mr-3 text-brand-yellow"/> Rua das Tesouras, 123, Centro</div>
                            </div>
                             <button onClick={() => onReschedule(nextAppointment.id)} className="mt-8 bg-brand-yellow text-brand-dark font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-yellow-dark transition-transform transform hover:scale-105 self-start">
                                Reagendar
                            </button>
                        </>
                    ) : (
                         <div className="flex flex-col justify-center items-center text-center h-full">
                            <h2 className="text-lg font-bold uppercase tracking-wider text-brand-yellow mb-2">Nenhum agendamento futuro</h2>
                            <p className="text-2xl font-bold">Que tal agendar um novo corte?</p>
                            <p className="mt-2 text-gray-300">Estamos prontos para te atender.</p>
                             <button onClick={() => setActiveView('Novo Agendamento')} className="mt-8 bg-brand-yellow text-brand-dark font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-brand-yellow-dark transition-transform transform hover:scale-105">
                                Agendar Agora
                            </button>
                        </div>
                    )}
                </div>
                <div className="bg-white p-8 rounded-2xl shadow-lg flex flex-col justify-center items-center text-center">
                    <div className="bg-brand-yellow p-3 rounded-xl mb-4">
                        <LogoIcon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="font-bold text-xl text-brand-dark">BarberPro</h3>
                    <p className="text-sm text-brand-text mt-2 mb-6">Sua barbearia de confiança, sempre à sua disposição.</p>
                     <button onClick={() => setActiveView('Meus Agendamentos')} className="mt-auto w-full bg-gray-100 text-brand-dark font-semibold py-3 px-4 rounded-lg hover:bg-gray-200 transition">
                        Ver Todos Agendamentos
                    </button>
                </div>
            </div>

            {/* History */}
            <div className="bg-white p-6 rounded-2xl shadow-lg">
                 <h3 className="font-bold text-lg text-brand-dark mb-4 flex items-center"><HistoryIcon className="w-5 h-5 mr-2 text-gray-500"/> Histórico de Agendamentos</h3>
                 <div className="overflow-x-auto">
                    {pastAppointments.length > 0 ? (
                        <table className="w-full text-sm">
                            <tbody>
                                {pastAppointments.map(app => (
                                    <tr key={app.id} className="border-b last:border-b-0">
                                        <td className="px-2 sm:px-4 py-4 font-medium text-gray-900 whitespace-nowrap">{format(new Date(app.date), "dd/MM/yyyy 'às' HH:mm")}</td>
                                        <td className="px-2 sm:px-4 py-4">{app.service}</td>
                                        <td className="px-2 sm:px-4 py-4 text-gray-600">{app.barber}</td>
                                        <td className="px-2 sm:px-4 py-4 text-right">
                                            <span className={`px-2 py-1 text-xs font-semibold leading-tight rounded-full ${getStatusChip(app.status)}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center text-brand-text py-8">Nenhum histórico de agendamentos para mostrar.</p>
                    )}
                 </div>
            </div>
        </div>
    );
};

export default ClientDashboardView;