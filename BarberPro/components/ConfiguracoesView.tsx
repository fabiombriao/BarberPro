import React from 'react';
import { UploadIcon } from '../constants';

const ConfiguracoesView: React.FC = () => {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-brand-dark">Configurações</h2>
                <button className="bg-brand-yellow hover:bg-brand-yellow-dark text-white font-bold py-2 px-6 rounded-lg shadow">
                    Salvar Alterações
                </button>
            </div>

            {/* Dados da Barbearia */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6 border-b pb-4">Dados da Barbearia</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2 space-y-4">
                        <div>
                            <label className="form-label">Nome da Barbearia</label>
                            <input type="text" className="form-input" defaultValue="BarberPro Exemplo" />
                        </div>
                         <div>
                            <label className="form-label">Endereço</label>
                            <input type="text" className="form-input" defaultValue="Rua das Tesouras, 123, Centro" />
                        </div>
                        <div>
                            <label className="form-label">WhatsApp de Contato</label>
                            <input type="text" className="form-input" defaultValue="(11) 99999-8888" />
                        </div>
                    </div>
                    <div className="text-center">
                        <label className="form-label">Logotipo</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <UploadIcon className="mx-auto h-12 w-12 text-gray-400" />
                                <p className="text-xs text-gray-500">PNG, JPG até 10MB</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Horário de Funcionamento */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6 border-b pb-4">Horário de Funcionamento</h3>
                <div className="space-y-4">
                    {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'].map(day => (
                        <div key={day} className="grid grid-cols-3 gap-4 items-center">
                            <label className="font-medium text-gray-700">{day}</label>
                            <div className="col-span-2 flex items-center space-x-2">
                                <input type="time" className="form-input w-full" defaultValue={day.startsWith('S') || day.startsWith('D') ? '' : '09:00'} />
                                <span>até</span>
                                <input type="time" className="form-input w-full" defaultValue={day.startsWith('S') || day.startsWith('D') ? '' : '19:00'} />
                                <label className="flex items-center space-x-2 text-sm">
                                    <input type="checkbox" className="form-checkbox" defaultChecked={!day.startsWith('D')} />
                                    <span>Aberto</span>
                                </label>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
             {/* Perfil */}
            <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold mb-6 border-b pb-4">Seu Perfil</h3>
                <div className="space-y-4">
                     <div>
                        <label className="form-label">E-mail de Acesso</label>
                        <input type="email" className="form-input" defaultValue="carlos.silva@barberpro.com" />
                    </div>
                     <div>
                        <label className="form-label">Nova Senha</label>
                        <input type="password" placeholder="Deixe em branco para não alterar" className="form-input" />
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ConfiguracoesView;
