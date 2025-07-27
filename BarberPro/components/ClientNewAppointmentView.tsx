
import React, { useState, useMemo } from 'react';
import { services, barbers, User, Appointment } from './data';
import { CheckCircleIcon, ArrowRightIcon } from '../constants';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSunday, isSameDay, isToday, isBefore } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ClientNewAppointmentViewProps {
    setActiveView: (view: string) => void;
    onAppointmentConfirm: (newAppointment: Appointment) => void;
    user: User;
}

const ClientNewAppointmentView: React.FC<ClientNewAppointmentViewProps> = ({ setActiveView, onAppointmentConfirm, user }) => {
    // States to match screenshot and logic
    const [selectedService, setSelectedService] = useState<number | null>(1);
    const [selectedBarber, setSelectedBarber] = useState<number | null>(3);
    const [currentMonth, setCurrentMonth] = useState(new Date('2025-07-01T00:00:00'));
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date('2025-07-13T00:00:00')); // Initial state with a Sunday to demonstrate the fix
    const [selectedTime, setSelectedTime] = useState<string | null>('09:00');

    const activeBarbers = barbers.filter(b => b.status === 'Ativo');
    const availableTimes = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00'];

    const todayStart = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

    const isDateInvalid = useMemo(() => {
        if (!selectedDate) return false;
        return isSunday(selectedDate) || isBefore(selectedDate, todayStart);
    }, [selectedDate, todayStart]);
    
    const canConfirm = useMemo(() => {
        return !!(selectedService && selectedBarber && selectedDate && selectedTime && !isDateInvalid);
    },[selectedService, selectedBarber, selectedDate, selectedTime, isDateInvalid]);
    
    const handleConfirm = () => {
        if (!canConfirm || !selectedService || !selectedBarber || !selectedDate || !selectedTime) return;
        
        const newDate = new Date(selectedDate);
        const [hours, minutes] = selectedTime.split(':').map(Number);
        newDate.setHours(hours, minutes, 0, 0);

        const newAppointment: Appointment = {
            id: Date.now(),
            date: newDate.toISOString(),
            client: user.name,
            service: services.find(s => s.id === selectedService)!.name,
            barber: barbers.find(b => b.id === selectedBarber)!.name,
            status: 'Pendente',
        };

        onAppointmentConfirm(newAppointment);
        setActiveView('Dashboard');
    };

    const handleDateSelect = (day: Date) => {
        setSelectedDate(day);
        setSelectedTime(null); // Reset time selection when date changes
    };

    const isStepComplete = (step: number) => {
        switch(step) {
            case 1: return !!selectedService;
            case 2: return !!selectedDate && !!selectedBarber;
            case 3: return !!selectedTime;
            default: return false;
        }
    }

    return (
        <div className="max-w-4xl mx-auto space-y-6 pb-12">
            {/* Service Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                    <CheckCircleIcon className={`w-6 h-6 transition-colors ${isStepComplete(1) ? 'text-green-500' : 'text-gray-300'}`} />
                    <h3 className="ml-3 text-lg font-bold text-brand-dark">Escolha o Serviço</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {services.map(service => (
                         <button key={service.id} onClick={() => setSelectedService(service.id)} className={`p-4 text-left border rounded-lg transition ${selectedService === service.id ? 'bg-yellow-50 border-brand-yellow ring-2 ring-brand-yellow' : 'hover:bg-gray-50'}`}>
                            <p className="font-semibold text-brand-dark">{service.name}</p>
                            <p className="text-sm text-brand-text">{service.duration} min - R$ {service.price.toFixed(2)}</p>
                        </button>
                    ))}
                </div>
            </div>

            {/* Date & Barber Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                 <div className="flex items-center mb-4">
                    <CheckCircleIcon className={`w-6 h-6 transition-colors ${isStepComplete(2) ? 'text-green-500' : 'text-gray-300'}`} />
                    <h3 className="ml-3 text-lg font-bold text-brand-dark">Escolha a Data e o Barbeiro</h3>
                </div>
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                    {/* Calendar */}
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <button onClick={() => setCurrentMonth(subMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
                            <span className="font-bold text-center capitalize">{format(currentMonth, 'MMMM de yyyy', { locale: ptBR })}</span>
                            <button onClick={() => setCurrentMonth(addMonths(currentMonth, 1))} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-center text-xs text-brand-text">
                            {['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sáb'].map(d => <div key={d} className="font-semibold uppercase">{d}</div>)}
                        </div>
                        <div className="mt-2 grid grid-cols-7 gap-1">
                            {eachDayOfInterval({start: startOfWeek(startOfMonth(currentMonth)), end: endOfWeek(endOfMonth(currentMonth))}).map(day => {
                                const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
                                const isSel = selectedDate && isSameDay(day, selectedDate);
                                const isSun = isSunday(day);
                                const isPast = isBefore(day, todayStart);
                                const isDisabled = isSun || isPast;

                                return (
                                    <button 
                                        key={day.toString()}
                                        onClick={() => handleDateSelect(day)}
                                        disabled={isDisabled}
                                        className={`w-10 h-10 rounded-full transition-colors text-sm
                                        ${!isCurrentMonth ? 'text-gray-400' : ''}
                                        ${isDisabled ? 'text-red-300 cursor-not-allowed line-through' : 'hover:bg-yellow-100'}
                                        ${isSel && !isDisabled ? 'bg-brand-yellow text-brand-dark font-bold' : ''}
                                        ${isSel && isDisabled ? 'bg-red-200 text-red-700 font-bold ring-2 ring-red-500' : ''}
                                        ${isToday(day) && !isSel ? 'border-2 border-brand-yellow' : ''}
                                    `}>
                                        {format(day, 'd')}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    {/* Barbers */}
                    <div className="flex flex-wrap gap-4 justify-center">
                        {activeBarbers.map(barber => (
                            <button key={barber.id} onClick={() => setSelectedBarber(barber.id)} className={`flex flex-col items-center p-3 border rounded-lg transition text-center ${selectedBarber === barber.id ? 'bg-yellow-50 border-brand-yellow ring-2 ring-brand-yellow' : 'hover:bg-gray-50'}`}>
                                <img src={barber.avatar} alt={barber.name} className="w-16 h-16 rounded-full mb-2"/>
                                <p className="font-semibold text-sm text-brand-dark">{barber.name}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Time Selection */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                    <CheckCircleIcon className={`w-6 h-6 transition-colors ${isStepComplete(3) ? 'text-green-500' : 'text-gray-300'}`} />
                    <h3 className="ml-3 text-lg font-bold text-brand-dark">Horários Disponíveis</h3>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                    {availableTimes.map(time => (
                        <button 
                            key={time} 
                            onClick={() => setSelectedTime(time)}
                            disabled={!selectedDate || isDateInvalid}
                            className={`px-3 py-3 text-sm border rounded-md transition disabled:bg-gray-100 disabled:cursor-not-allowed ${selectedTime === time ? 'bg-brand-yellow text-brand-dark font-bold border-brand-yellow' : 'text-gray-700 hover:bg-gray-100'}`}>
                            {time}
                        </button>
                    ))}
                </div>
            </div>

            {/* Confirmation */}
            <div className="mt-8 pt-6 border-t">
                {isDateInvalid && selectedDate && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4" role="alert">
                        <p className="font-bold">Data Inválida</p>
                        <p>Não é possível agendar aos domingos ou em datas passadas. Por favor, selecione um dia válido.</p>
                    </div>
                )}
                <button
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className={`w-full flex items-center justify-center text-white font-bold py-4 px-6 rounded-lg shadow-lg transition-colors text-lg
                    ${canConfirm
                        ? 'bg-green-500 hover:bg-green-600'
                        : 'bg-gray-400 cursor-not-allowed'
                    }`}>
                    Confirmar Agendamento <ArrowRightIcon className="w-5 h-5 ml-3"/>
                </button>
            </div>
        </div>
    );
};

export default ClientNewAppointmentView;
