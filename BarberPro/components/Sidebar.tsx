import React from 'react';
import { LogoIcon, DashboardIcon, AgendaIcon, BarbeirosIcon, ServicosIcon, ClientesIcon, RelatoriosIcon, ConfiguracoesIcon, LogoutIcon, PlusIcon } from '../constants';

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
                ? 'bg-brand-yellow text-gray-800 font-bold shadow-md'
                : 'text-gray-400 hover:bg-brand-dark-300 hover:text-white'
        }`}
    >
        {icon}
        <span className="ml-4">{label}</span>
    </button>
);

interface SidebarProps {
    activeView: string;
    setActiveView: (view: string) => void;
    onNewAppointmentClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView, onNewAppointmentClick }) => {
    const navItems = [
        { id: 'Dashboard', icon: <DashboardIcon className="h-5 w-5" />, label: 'Dashboard' },
        { id: 'Agenda', icon: <AgendaIcon className="h-5 w-5" />, label: 'Agenda' },
        { id: 'Barbeiros', icon: <BarbeirosIcon className="h-5 w-5" />, label: 'Barbeiros' },
        { id: 'Serviços', icon: <ServicosIcon className="h-5 w-5" />, label: 'Serviços' },
        { id: 'Clientes', icon: <ClientesIcon className="h-5 w-5" />, label: 'Clientes' },
        { id: 'Relatórios', icon: <RelatoriosIcon className="h-5 w-5" />, label: 'Relatórios' },
        { id: 'Configurações', icon: <ConfiguracoesIcon className="h-5 w-5" />, label: 'Configurações' },
    ];

    return (
        <aside className="z-30 flex-shrink-0 hidden w-64 overflow-y-auto bg-brand-dark md:block">
            <div className="py-4 text-gray-500">
                <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="bg-brand-yellow p-2 rounded-lg">
                       <LogoIcon className="h-7 w-7 text-white"/>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">BarberPro</h1>
                    </div>
                </div>
                <ul className="mt-6 px-4 space-y-2">
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
                <div className="px-6 my-8">
                    <button 
                        onClick={onNewAppointmentClick}
                        className="flex items-center justify-center w-full px-4 py-3 font-bold text-gray-800 transition-colors duration-150 bg-brand-yellow rounded-lg hover:bg-brand-yellow-dark focus:outline-none focus:shadow-outline-yellow">
                        Novo Agendamento
                        <PlusIcon className="w-5 h-5 ml-2" />
                    </button>
                </div>

                <div className="absolute bottom-0 w-full">
                    <div className="p-4 border-t border-brand-dark-300">
                        <div className="flex items-center">
                            <img className="h-10 w-10 rounded-full object-cover" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="User avatar" />
                            <div className="ml-3">
                                <p className="font-semibold text-white text-sm">Carlos Silva</p>
                                <p className="text-xs text-gray-400">Proprietário</p>
                            </div>
                            <button className="ml-auto text-gray-400 hover:text-white">
                                <LogoutIcon className="w-5 h-5"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;