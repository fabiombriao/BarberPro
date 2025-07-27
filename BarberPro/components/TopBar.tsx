import React from 'react';
import { SearchIcon, NotificationIcon, ChevronDownIcon } from '../constants';

interface TopBarProps {
    title: string;
}

const TopBar: React.FC<TopBarProps> = ({ title }) => {
    return (
        <header className="z-10 py-4 bg-white shadow-md">
            <div className="container flex items-center justify-between h-full px-6 mx-auto text-brand-yellow-dark">
                {/* Mobile hamburger */}
                <button className="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-yellow" aria-label="Menu">
                    {/* Placeholder for menu icon */}
                    <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path>
                    </svg>
                </button>
                
                <h1 className="text-2xl font-semibold text-gray-700">{title}</h1>

                <div className="flex justify-end flex-1 lg:mr-32">
                    {/* Search input */}
                    <div className="relative w-full max-w-xl mr-6 focus-within:text-brand-yellow">
                        <div className="absolute inset-y-0 flex items-center pl-2">
                            <SearchIcon className="w-4 h-4" />
                        </div>
                        <input
                            className="w-full pl-8 pr-2 text-sm text-gray-700 placeholder-gray-600 bg-gray-100 border-0 rounded-md focus:placeholder-gray-500 focus:bg-white focus:border-yellow-300 focus:outline-none focus:shadow-outline-yellow form-input"
                            type="text"
                            placeholder="Buscar..."
                            aria-label="Search"
                        />
                    </div>
                </div>

                <ul className="flex items-center flex-shrink-0 space-x-6">
                    {/* Notifications menu */}
                    <li className="relative">
                        <button className="relative align-middle rounded-md focus:outline-none focus:shadow-outline-yellow" aria-label="Notifications" aria-haspopup="true">
                            <NotificationIcon className="w-5 h-5" />
                            {/* Notification badge */}
                            <span aria-hidden="true" className="absolute top-0 right-0 inline-block w-3 h-3 transform translate-x-1 -translate-y-1 bg-red-600 border-2 border-white rounded-full"></span>
                        </button>
                    </li>
                    {/* Profile menu */}
                    <li className="relative">
                        <button className="align-middle rounded-full focus:shadow-outline-yellow focus:outline-none" aria-label="Account" aria-haspopup="true">
                           <div className="flex items-center space-x-2">
                             <img className="object-cover w-8 h-8 rounded-full" src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="" aria-hidden="true" />
                            <ChevronDownIcon className="w-4 h-4 text-gray-500" />
                           </div>
                        </button>
                    </li>
                </ul>
            </div>
        </header>
    );
};

export default TopBar;
