import React, {useEffect, useState} from 'react';
import Modal from "./Modal.jsx";
import {useNavigate} from "react-router-dom";

const CategoryForm = () => {
    const [formData, setFormData] = useState({
        name: ''

    });
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };
    const navigate = useNavigate(); // Ajoutez cette ligne

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = JSON.stringify({
            "name": formData.name
        });

        try {
            const response = await fetch('http://localhost:5000/api/categories', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: data,
            });

            if (!response.ok) {
                alert('Network response was not ok');
            } else {
                setIsModalOpen(true); // Ouvre le modal après la création réussie
                setTimeout(() => {
                    setIsModalOpen(false); // Ferme le modal après 5 secondes
                    navigate('/category');
                }, 3000);
            }

            const responseData = await response.json();
            console.log(responseData);
            // Traiter la réponse...
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
    <section className="bg-white dark:bg-gray-900 mt-32">
        <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title="Succès Creat"
        >
            <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">Success Creat!</span> category.
                </div>
            </div>
        </Modal>
        <div className="py-8 px-4 mx-auto max-w-2xl lg:py-16">
            <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add a new Category</h2>
            <form  onSubmit={handleSubmit} >
                <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
                    <div className="sm:col-span-2">
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category Name</label>
                        <input type="text" name="name" id="name"   value={formData.name}
                               onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Category name" required=""/>
                    </div>
                </div>
                <button type="submit" className="inline-flex items-center px-5 py-2.5 mt-4 sm:mt-6 text-sm font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800">
                    Add Category
                </button>
            </form>
        </div>
    </section>
    );
};

export default CategoryForm;
