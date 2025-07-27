
import React from 'react';

interface Action {
    label: string;
    onClick: () => void;
    style: 'primary' | 'secondary' | 'danger';
}

interface ActionModalProps {
    title: string;
    message: string;
    actions: Action[];
    onClose: () => void;
}

const ActionModal: React.FC<ActionModalProps> = ({ title, message, actions, onClose }) => {
    const getButtonStyle = (style: string) => {
        switch (style) {
            case 'primary':
                return 'bg-brand-yellow hover:bg-brand-yellow-dark text-brand-dark font-bold';
            case 'danger':
                return 'bg-red-600 hover:bg-red-700 text-white font-bold';
            case 'secondary':
            default:
                return 'bg-gray-200 hover:bg-gray-300 text-gray-800';
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 animate-fade-in-down" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md" onClick={(e) => e.stopPropagation()}>
                <div className="p-6">
                    <h3 className="text-xl font-bold text-brand-dark">{title}</h3>
                    <p className="mt-2 text-brand-text">{message}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-3 rounded-b-lg">
                    {actions.map((action) => (
                        <button
                            key={action.label}
                            onClick={action.onClick}
                            className={`px-4 py-2 rounded-lg text-sm transition-colors ${getButtonStyle(action.style)}`}
                        >
                            {action.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActionModal;
