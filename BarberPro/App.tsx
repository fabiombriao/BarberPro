
import React, { useState } from 'react';
import ClientSidebar from './components/ClientSidebar';
import ClientDashboardView from './components/ClientDashboardView';
import ClientAppointmentsView from './components/ClientAppointmentsView';
import ClientNewAppointmentView from './components/ClientNewAppointmentView';
import ClientProfileView from './components/ClientProfileView';
import ClientLoginView from './components/ClientLoginView';
import ClientRegisterView from './components/ClientRegisterView';
import { appointments as initialAppointments, Appointment, clients as initialUsers, User } from './components/data';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [authView, setAuthView] = useState<'login' | 'register'>('login');
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [activeView, setActiveView] = useState('Dashboard');
    const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
    const [currentUser, setCurrentUser] = useState<User>(initialUsers[0]);
    const [appointmentToReschedule, setAppointmentToReschedule] = useState<Appointment | null>(null);

    const handleLogin = () => {
        // In a real app, you'd verify credentials here.
        // For this demo, we'll use the default user.
        setCurrentUser(users[0]);
        setIsLoggedIn(true);
        setActiveView('Dashboard');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
    };
    
    const handleBookingConfirmation = (newAppointment: Appointment) => {
        let updatedAppointments = [...appointments];

        if (appointmentToReschedule) {
            updatedAppointments = updatedAppointments.map(app =>
                app.id === appointmentToReschedule.id ? { ...app, status: 'Cancelado' } : app
            );
        }

        updatedAppointments.push(newAppointment);

        setAppointments(updatedAppointments.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        
        setAppointmentToReschedule(null);
    };

    const handleCancelAppointment = (appointmentId: number) => {
        setAppointments(prev =>
            prev.map(app =>
                app.id === appointmentId ? { ...app, status: 'Cancelado' } : app
            )
        );
    };

    const handleInitiateReschedule = (appointmentId: number) => {
        const appointment = appointments.find(a => a.id === appointmentId);
        if (appointment) {
            setAppointmentToReschedule(appointment);
            setActiveView('Novo Agendamento');
        }
    };

    const handleUpdateUser = (updatedUser: User) => {
        setCurrentUser(updatedUser);
        setUsers(prevUsers => prevUsers.map(u => u.id === updatedUser.id ? updatedUser : u));
    };

    const handleRegister = (newUser: User): boolean => {
        if (users.some(user => user.email === newUser.email)) {
            return false; // Email already exists
        }
        setUsers(prev => [...prev, newUser]);
        setCurrentUser(newUser);
        setIsLoggedIn(true);
        setActiveView('Dashboard');
        return true;
    };


    if (!isLoggedIn) {
        switch(authView) {
            case 'login':
                return <ClientLoginView onLogin={handleLogin} onNavigateToRegister={() => setAuthView('register')} />;
            case 'register':
                return <ClientRegisterView onRegister={handleRegister} onNavigateToLogin={() => setAuthView('login')} />;
            default:
                return <ClientLoginView onLogin={handleLogin} onNavigateToRegister={() => setAuthView('register')} />;
        }
    }

    const renderView = () => {
        switch (activeView) {
            case 'Dashboard':
                return <ClientDashboardView setActiveView={setActiveView} appointments={appointments} user={currentUser} onReschedule={handleInitiateReschedule} />;
            case 'Meus Agendamentos':
                return <ClientAppointmentsView appointments={appointments} setActiveView={setActiveView} onCancelAppointment={handleCancelAppointment} onReschedule={handleInitiateReschedule} user={currentUser} />;
            case 'Novo Agendamento':
                 return <ClientNewAppointmentView setActiveView={setActiveView} onAppointmentConfirm={handleBookingConfirmation} user={currentUser} />;
            case 'Meu Perfil':
                return <ClientProfileView user={currentUser} onUpdateUser={handleUpdateUser} />;
            default:
                return <ClientDashboardView setActiveView={setActiveView} appointments={appointments} user={currentUser} onReschedule={handleInitiateReschedule}/>;
        }
    };

    return (
        <div className="flex h-screen bg-brand-gray font-sans text-brand-dark-300">
            <ClientSidebar
                activeView={activeView}
                setActiveView={setActiveView}
                onLogout={handleLogout}
                user={currentUser}
            />
            <div className="flex-1 flex flex-col overflow-hidden">
                <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 md:p-8">
                    {renderView()}
                </main>
            </div>
        </div>
    );
};

export default App;
