import React from 'react';

const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-50">
            <div className="flex justify-center items-center h-full">
                <div className="bg-white rounded-lg shadow dark:bg-gray-700 p-4 md:p-5">
                    <div className="flex items-center justify-between border-b dark:border-gray-600 pb-4">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{title}</h3>
                        <button onClick={onClose} className="text-gray-400 hover:text-gray-900">
                            {/* Icone de fermeture */}
                        </button>
                    </div>
                    <div className="p-4 space-y-4">
                        {children}
                    </div>
                    {/* Pied de page du modal, si nécessaire */}
                </div>
            </div>
        </div>
    );
};
export default Modal;
