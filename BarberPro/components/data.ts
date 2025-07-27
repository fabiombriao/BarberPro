
export interface Appointment {
    id: number;
    date: string;
    client: string;
    barber: string;
    service: string;
    status: 'Pendente' | 'Concluído' | 'Cancelado';
}

export interface User {
    id: number;
    name: string;
    email: string;
    phone: string;
    avatar: string;
    visits: number;
    last_visit: string;
    dob?: string;
    gender?: string;
}

export const barbers = [
    { id: 1, name: 'Carlos Santos', email: 'carlos.s@email.com', commission: 50, status: 'Ativo', google_connected: true, avatar: 'https://i.pravatar.cc/150?u=carlos' },
    { id: 2, name: 'Roberto Lima', email: 'roberto.l@email.com', commission: 45, status: 'Ativo', google_connected: false, avatar: 'https://i.pravatar.cc/150?u=roberto' },
    { id: 3, name: 'André Costa', email: 'andre.c@email.com', commission: 50, status: 'Ativo', google_connected: true, avatar: 'https://i.pravatar.cc/150?u=andre' },
    { id: 4, name: 'Lucas Ferreira', email: 'lucas.f@email.com', commission: 40, status: 'Inativo', google_connected: true, avatar: 'https://i.pravatar.cc/150?u=lucas' },
    { id: 5, name: 'Marcos Almeida', email: 'marcos.a@email.com', commission: 50, status: 'Ativo', google_connected: true, avatar: 'https://i.pravatar.cc/150?u=marcos' },
];

export const services = [
    { id: 1, name: 'Corte Masculino', description: 'Corte social ou moderno com tesoura e máquina.', duration: 45, price: 50.00 },
    { id: 2, name: 'Barba Premium', description: 'Modelagem de barba com toalha quente e navalha.', duration: 30, price: 40.00 },
    { id: 3, name: 'Corte + Barba', description: 'Pacote completo de corte e barba.', duration: 75, price: 85.00 },
    { id: 4, name: 'Hidratação Capilar', description: 'Tratamento para fortalecer e dar brilho.', duration: 25, price: 30.00 },
    { id: 5, name: 'Pintura', description: 'Coloração profissional para cabelo ou barba.', duration: 60, price: 70.00 },
];

export const currentUser: User = { 
    id: 1, 
    name: 'João Silva', 
    email: 'joao.silva@email.com', 
    phone: '(11) 98765-4321',
    avatar: 'https://i.pravatar.cc/150?u=joao',
    visits: 12,
    last_visit: '25/10/2024',
};

export const clients: User[] = [
    currentUser,
    { id: 2, name: 'Pedro Oliveira', email: 'pedro.oliveira@email.com', phone: '(21) 91234-5678', visits: 8, last_visit: '15/10/2024', avatar: 'https://i.pravatar.cc/150?u=pedro' },
    { id: 3, name: 'Rafael Souza', email: 'rafael.souza@email.com', phone: '(31) 95555-4444', visits: 1, last_visit: '28/10/2024', avatar: 'https://i.pravatar.cc/150?u=rafael' },
    { id: 4, name: 'Gustavo Pereira', email: 'gustavo.p@email.com', phone: '(41) 94321-8765', visits: 2, last_visit: '05/09/2024', avatar: 'https://i.pravatar.cc/150?u=gustavo' },
];

export const appointments: Appointment[] = [
    { id: 1, date: '2024-11-15T10:00:00', client: 'João Silva', barber: 'Carlos Santos', service: 'Corte + Barba', status: 'Pendente' },
    { id: 2, date: '2024-10-20T14:00:00', client: 'João Silva', barber: 'André Costa', service: 'Barba Premium', status: 'Concluído' },
    { id: 3, date: '2024-09-05T11:00:00', client: 'João Silva', barber: 'Carlos Santos', service: 'Corte Masculino', status: 'Concluído' },
    { id: 4, date: '2024-08-10T16:30:00', client: 'João Silva', barber: 'Marcos Almeida', service: 'Corte Masculino', status: 'Cancelado' },
    { id: 5, date: '2024-07-22T09:00:00', client: 'João Silva', barber: 'Carlos Santos', service: 'Corte + Barba', status: 'Concluído' },
    { id: 6, date: '2024-06-18T18:00:00', client: 'João Silva', barber: 'André Costa', service: 'Hidratação Capilar', status: 'Concluído' },
    { id: 7, date: '2024-10-28T15:00:00', client: 'Pedro Oliveira', barber: 'Roberto Lima', service: 'Corte Masculino', status: 'Concluído' },
];
