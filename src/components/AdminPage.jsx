import React from 'react';

const AdminPage = () => {
    return (
        <div className="p-4">
            <h1 className="text-3xl font-semibold text-gray-800">Tableau de Bord Admin</h1>
            <div className="flex flex-wrap mt-4">
                <div className="w-full lg:w-1/3 p-2">
                    <div className="bg-white p-4 rounded-lg shadow-xs">
                        <h4 className="mb-4 font-semibold text-gray-800">Utilisateurs</h4>
                        <p className="text-gray-600">42</p>
                    </div>
                </div>
                <div className="w-full lg:w-1/3 p-2">
                    <div className="bg-white p-4 rounded-lg shadow-xs">
                        <h4 className="mb-4 font-semibold text-gray-800">Ventes</h4>
                        <p className="text-gray-600">1234€</p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default AdminPage;
