import React, {useState, useEffect, useMemo} from 'react';
import Modal from "./Modal.jsx";
import {Link} from "react-router-dom";

const ProductList = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchProducts = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des products');
                }
                const productsData = await response.json();
                setProducts(productsData);
            } catch (error) {
                setError('Erreur lors de la récupération des products');
                console.error(error);
            }
        };

        setLoading(true);
        fetchProducts();
        setLoading(false);
    }, []);

    const produitFiltres = useMemo(() => {
        return products.filter(produit =>
            produit.name.toLowerCase().includes(recherche.toLowerCase()));
    }, [recherche,products]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    const handleDelete = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Erreur lors de la suppression du produit');
            }else{
                setIsModalOpen(true); // Ouvre le modal après la création réussie
                setTimeout(() => {
                    setIsModalOpen(false); // Ferme le modal après 5 secondes
                }, 3000);
            }

            // Mettre à jour l'état des products pour retirer le produit supprimé
            setProducts(products.filter(product => product._id !== productId));
        } catch (error) {
            console.error('Erreur :', error);
        }
    };


    return (


        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-32 mx-9">
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title="Succès Remove"
            >
                <div className="flex items-center p-4 mb-4 text-sm text-green-800 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800" role="alert">
                    <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                    </svg>
                    <span className="sr-only">Info</span>
                    <div>
                        <span className="font-medium">Success Remove!</span> Product.
                    </div>
                </div>
            </Modal>

            <div className="flex items-center justify-between flex-column md:flex-row flex-wrap space-y-4 md:space-y-0 py-4 bg-white dark:bg-gray-900">
                <div>
                    <Link to='/product/creat' type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                        Ajouter
                    </Link>
                </div>
                <label htmlFor="table-search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text"  value={recherche}
                           onChange={(e) => setRecherche(e.target.value)} id="table-search-users" className="block pt-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for users"/>
                </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr >
                    <th scope="col" className="px-6 py-3">
                        Image
                    </th>
                    <th scope="col" className="px-6 py-3">
                        name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Description
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th><th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-center">
                        Action
                    </th>
                    </tr>
                </thead>
                <tbody>
                {produitFiltres.map((product) => (
                    <tr key={product._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="px-6 py-4 font-semibold">
                        <img src={`http://localhost:5000/${product.image}`} className=" max-w-28 max-h-28" alt="Apple Watch"/>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.name}
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.description}
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} Dt
                    </td>

                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                        {product.category?.name ? `${product.category.name} Dt` : 'Catégorie non spécifiée'}
                    </td>

                    <td className="px-6 py-4 text-center">
                        <button onClick={() => handleDelete(product._id)} type="button" className="px-3 py-2 text-xs font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Remove</button>


                    </td>
                </tr>

            ))}
                </tbody>
            </table>
        </div>

    );
};

export default ProductList;
