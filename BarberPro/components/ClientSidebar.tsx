
import React from 'react';
import { LogoIcon, DashboardIcon, AgendaIcon, ConfiguracoesIcon, LogoutIcon, PlusIcon } from '../constants';
import { User } from './data';

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    active: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, active, onClick }) => (
    <button
        onClick={onClick}
        className={`flex items-center w-full px-4 py-3 text-sm font-medium transition-colors duration-150 rounded-lg ${
            active
                ? 'bg-brand-yellow text-brand-dark font-bold shadow-md'
                : 'text-gray-400 hover:bg-brand-dark-300 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

interface ClientSidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    onLogout: () => void;
    user: User;
}

const ClientSidebar: React.FC<ClientSidebarProps> = ({ activeView, setActiveView, onLogout, user }) => {
    const navItems = [
        { id: 'Dashboard', icon: <DashboardIcon className="h-5 w-5" />, label: 'Dashboard' },
        { id: 'Meus Agendamentos', icon: <AgendaIcon className="h-5 w-5" />, label: 'Meus Agendamentos' },
        { id: 'Meu Perfil', icon: <ConfiguracoesIcon className="h-5 w-5" />, label: 'Meu Perfil' },
    ];
    
    const isNewAppointmentActive = activeView === 'Novo Agendamento';

    return (
        <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-brand-dark md:block">
            <div className="py-4 text-gray-500 flex flex-col h-full">
                <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="bg-brand-yellow p-2 rounded-lg">
                       <LogoIcon className="h-7 w-7 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">BarberPro</h1>
                    </div>
                </div>
                <div className="px-6 my-6">
                    <button
                        onClick={() => setActiveView('Novo Agendamento')}
                        className={`flex flex-col items-center justify-center w-full p-4 font-bold text-brand-dark transition-colors duration-150 rounded-xl shadow-lg
                        ${isNewAppointmentActive ? 'bg-amber-400' : 'bg-brand-yellow'}
                        hover:bg-amber-400`}
                    >
                        <PlusIcon className="w-7 h-7" />
                        <span className="mt-2 text-sm">Novo Agendamento</span>
                    </button>
                </div>
                <ul className="mt-6 px-4 space-y-2 flex-grow">
                    {navItems.map((item) => (
                        <li key={item.id}>
                            <NavItem
                                icon={item.icon}
                                label={item.label}
                                active={activeView === item.id}
                                onClick={() => setActiveView(item.id)}
                            />
                        </li>
                    ))}
                </ul>
                
                <div className="mt-auto">
                    <div className="p-4 border-t border-brand-dark-300">
                        <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full object-cover" src={user.avatar} alt="User avatar" />
                            <div className="ml-3">
                                <p className="font-semibold text-white text-sm">{user.name}</p>
                                <p className="text-xs text-gray-400">Cliente</p>
                            </div>
                            <button onClick={onLogout} className="ml-auto text-gray-400 hover:text-white" aria-label="Sair">
                                <LogoutIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default ClientSidebar;
