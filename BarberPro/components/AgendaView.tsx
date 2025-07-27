import React from 'react';
import { barbers, appointments } from './data';
import { PlusIcon, ChevronDownIcon } from '../constants';

const timeSlots = Array.from({ length: 12 }, (_, i) => `${i + 8}:00`); // 8 AM to 7 PM

const AgendaView: React.FC = () => {
    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-md">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-brand-dark">Agenda Geral</h2>
                    <p className="text-brand-text">Segunda-feira, 28 de Outubro</p>
                </div>
                <div className="flex items-center space-x-2 mt-4 sm:mt-0">
                    <div className="flex bg-gray-100 p-1 rounded-lg">
                        <button className="px-3 py-1 text-sm font-semibold rounded-md">Diária</button>
                        <button className="px-3 py-1 text-sm font-semibold text-white bg-brand-yellow-dark rounded-md shadow">Semanal</button>
                        <button className="px-3 py-1 text-sm font-semibold rounded-md">Mensal</button>
                    </div>
                    <button className="flex items-center px-4 py-2 text-sm font-medium text-white bg-brand-yellow hover:bg-brand-yellow-dark rounded-lg shadow">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        Agendar
                    </button>
                </div>
            </div>

            <div className="overflow-x-auto">
                <div className="grid" style={{ gridTemplateColumns: `60px repeat(${barbers.length}, minmax(150px, 1fr))` }}>
                    {/* Time Slot Column */}
                    <div className="sticky left-0 bg-white z-10">
                        <div className="h-20 border-b border-r border-gray-200"></div>
                        {timeSlots.map(time => (
                            <div key={time} className="h-20 flex items-center justify-center border-r border-gray-200 text-xs font-medium text-brand-text">
                                {time}
                            </div>
                        ))}
                    </div>

                    {/* Barber Columns */}
                    {barbers.map(barber => (
                        <div key={barber.id} className="border-b border-gray-200">
                            <div className="h-20 flex flex-col items-center justify-center text-center p-2 sticky top-0 bg-white z-10 border-b border-gray-200">
                                <img src={barber.avatar} alt={barber.name} className="w-8 h-8 rounded-full mb-1" />
                                <p className="font-semibold text-sm text-brand-dark">{barber.name}</p>
                            </div>
                            <div className="relative">
                                {timeSlots.map((time, index) => (
                                    <div key={time} className="h-20 border-t border-gray-200"></div>
                                ))}
                                {/* Appointments overlay */}
                                {appointments.filter(a => a.barber === barber.name).map(app => {
                                    const topPosition = (new Date(app.date).getHours() - 8) * 80;
                                    const height = 80;
                                    return (
                                        <div key={app.id}
                                             className="absolute w-full p-2 cursor-pointer"
                                             style={{ top: `${topPosition}px`, height: `${height}px` }}>
                                            <div className="h-full bg-blue-100 border-l-4 border-blue-500 rounded-r-lg p-2 text-xs overflow-hidden">
                                                <p className="font-bold text-blue-800">{app.service}</p>
                                                <p className="text-blue-600">{app.client}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AgendaView;