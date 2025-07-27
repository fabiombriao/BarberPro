import React, { useState } from 'react';
import { LogoIcon } from '../constants';
import { User } from './data';

interface ClientRegisterViewProps {
    onRegister: (newUser: User, password?: string) => boolean;
    onNavigateToLogin: () => void;
}

// Define InputField outside the component to prevent re-creation on render, which fixes the focus loss issue.
const InputField: React.FC<{
    name: string, 
    label: string, 
    type?: string, 
    placeholder?: string, 
    autoComplete?: string,
    value: string,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
    error?: string,
}> = ({name, label, type="text", placeholder, autoComplete, value, onChange, error}) => (
    <div>
        <label htmlFor={name} className="text-sm font-medium text-gray-700">{label}</label>
        <input
            id={name}
            name={name}
            type={type}
            autoComplete={autoComplete}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`mt-1 block w-full px-3 py-2 bg-white border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm`}
        />
        {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
);


const ClientRegisterView: React.FC<ClientRegisterViewProps> = ({ onRegister, onNavigateToLogin }) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        dob: '',
        gender: '',
        terms: false,
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Nome completo é obrigatório.';
        if (!formData.email.trim()) newErrors.email = 'E-mail é obrigatório.';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Formato de e-mail inválido.';
        if (!formData.phone.trim()) newErrors.phone = 'Telefone é obrigatório.';
        if (!formData.password) newErrors.password = 'Senha é obrigatória.';
        else if (formData.password.length < 8) newErrors.password = 'A senha deve ter no mínimo 8 caracteres.';
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'As senhas não correspondem.';
        if (!formData.dob) newErrors.dob = 'Data de nascimento é obrigatória.';
        if (!formData.terms) newErrors.terms = 'Você deve aceitar os termos de uso.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            const newUser: User = {
                id: Date.now(),
                name: formData.name,
                email: formData.email,
                phone: formData.phone,
                avatar: `https://i.pravatar.cc/150?u=${formData.email}`,
                visits: 0,
                last_visit: new Date().toLocaleDateString('pt-BR'),
                dob: formData.dob,
                gender: formData.gender,
            };

            const success = onRegister(newUser, formData.password);
            if (!success) {
                setErrors(prev => ({ ...prev, email: 'Este e-mail já está em uso.' }));
            }
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        
        // Clear the specific error when user starts typing
        if (errors[name]) {
             setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[name];
                return newErrors;
            });
        }

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-brand-gray p-4">
            <div className="w-full max-w-2xl p-8 space-y-8 bg-white rounded-2xl shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="bg-brand-yellow p-3 rounded-xl mb-4">
                        <LogoIcon className="h-8 w-8 text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-center text-brand-dark">Crie sua conta</h2>
                    <p className="mt-2 text-sm text-center text-brand-text">
                        Rápido e fácil. Comece a agendar seus cortes agora mesmo.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                        <InputField name="name" label="Nome Completo" placeholder="João da Silva" autoComplete="name" value={formData.name} onChange={handleChange} error={errors.name} />
                        <InputField name="email" label="E-mail" type="email" placeholder="seu@email.com" autoComplete="email" value={formData.email} onChange={handleChange} error={errors.email}/>
                        <InputField name="phone" label="Telefone Celular" type="tel" placeholder="(11) 99999-9999" autoComplete="tel" value={formData.phone} onChange={handleChange} error={errors.phone}/>
                        <InputField name="dob" label="Data de Nascimento" type="date" value={formData.dob} onChange={handleChange} error={errors.dob}/>
                        <InputField name="password" label="Senha" type="password" placeholder="Mínimo 8 caracteres" autoComplete="new-password" value={formData.password} onChange={handleChange} error={errors.password}/>
                        <InputField name="confirmPassword" label="Confirmar Senha" type="password" placeholder="Repita sua senha" autoComplete="new-password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword}/>
                         <div>
                            <label htmlFor="gender" className="text-sm font-medium text-gray-700">Gênero</label>
                             <select id="gender" name="gender" onChange={handleChange} value={formData.gender} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-yellow focus:border-brand-yellow sm:text-sm">
                                <option value="">Prefiro não dizer</option>
                                <option value="masculino">Masculino</option>
                                <option value="feminino">Feminino</option>
                                <option value="outro">Outro</option>
                             </select>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input id="terms" name="terms" type="checkbox" checked={formData.terms} onChange={handleChange} className="h-4 w-4 text-brand-yellow focus:ring-brand-yellow-dark border-gray-300 rounded" />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="terms" className="font-medium text-gray-700">Eu aceito os <a href="#" className="text-brand-yellow-dark hover:underline">Termos de Uso</a> e a <a href="#" className="text-brand-yellow-dark hover:underline">Política de Privacidade</a>.</label>
                            {errors.terms && <p className="mt-1 text-xs text-red-600">{errors.terms}</p>}
                        </div>
                    </div>

                    <div>
                        <button type="submit" className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-brand-dark bg-brand-yellow hover:bg-brand-yellow-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">
                            Criar conta
                        </button>
                    </div>
                </form>
                <p className="mt-4 text-center text-sm text-gray-600">
                    Já tem uma conta?{' '}
                    <button type="button" onClick={onNavigateToLogin} className="font-medium text-brand-yellow-dark hover:text-brand-yellow">
                        Fazer login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default ClientRegisterView;