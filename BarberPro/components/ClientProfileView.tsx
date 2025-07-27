
import React, { useState, ChangeEvent } from 'react';
import { User } from './data';

interface ClientProfileViewProps {
    user: User;
    onUpdateUser: (user: User) => void;
}

const ClientProfileView: React.FC<ClientProfileViewProps> = ({ user, onUpdateUser }) => {
    const [formData, setFormData] = useState<User>(user);
    const [isSaved, setIsSaved] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setIsSaved(false);
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                if (event.target?.result) {
                    setFormData(prev => ({ ...prev, avatar: event.target!.result as string }));
                    setIsSaved(false);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onUpdateUser(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    return (
        <div className="space-y-8 max-w-2xl mx-auto">
             <div>
                <h1 className="text-3xl font-bold text-brand-dark">Meu Perfil</h1>
                <p className="text-brand-text mt-1">Mantenha seus dados sempre atualizados.</p>
            </div>
            
            <div className="bg-white p-8 rounded-2xl shadow-lg">
                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="flex flex-col items-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-6">
                        <img src={formData.avatar} alt="Avatar" className="w-24 h-24 rounded-full object-cover ring-4 ring-offset-2 ring-brand-yellow"/>
                        <div className="flex-grow text-center sm:text-left">
                             <label htmlFor="avatar-upload" className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-brand-dark font-semibold py-2 px-4 rounded-lg text-sm transition">
                                Alterar Foto
                            </label>
                            <input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                            <p className="text-xs text-brand-text mt-2">PNG, JPG ou GIF. Tamanho máximo de 800K.</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nome Completo</label>
                            <input 
                                type="text" 
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">E-mail</label>
                            <input 
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm" 
                            />
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700">Telefone</label>
                            <input 
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm"
                            />
                        </div>
                    </div>
                    
                    <div className="pt-5">
                         <div className="flex justify-end items-center">
                            {isSaved && <p className="text-sm text-green-600 mr-4">Alterações salvas com sucesso!</p>}
                            <button type="submit" className="w-full sm:w-auto bg-brand-yellow hover:bg-brand-yellow-dark text-brand-dark font-bold py-3 px-8 rounded-lg shadow-md transition transform hover:scale-105">
                                Salvar Alterações
                            </button>
                        </div>
                    </div>
                 </form>
            </div>
        </div>
    );
};

export default ClientProfileView;
