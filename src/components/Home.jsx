import React, {useState, useEffect, useMemo, useContext} from 'react';
import CardList from './CardListe';
import { Header } from "./Header.jsx";
import {AuthContext} from "./AuthContext.jsx";

function Home() {
    const [categories, setCategories] = useState([]);
    const [produits, setProduits] = useState([]);
    const [categorie, setCategorie] = useState('');
    const [recherche, setRecherche] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des catégories');
                }
                const categoriesData = await response.json();
                setCategories(categoriesData);
            } catch (error) {
                setError('Erreur lors de la récupération des catégories');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        setLoading(true);
        fetchCategories();
    }, []);

    useEffect(() => {
        const fetchProduits = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/products');
                if (!response.ok) {
                    throw new Error('Erreur lors de la récupération des produits');
                }
                const produitsData = await response.json();
                setProduits(produitsData);
            } catch (error) {
                setError('Erreur lors de la récupération des produits');
                console.error(error);
            }
        };

        fetchProduits();
    }, []);

    const produitFiltres = useMemo(() => {
        return produits.filter(produit =>
            produit.name.toLowerCase().includes(recherche.toLowerCase()) &&
            (categorie === '' || produit.category.name === categorie)
        );
    }, [recherche, categorie, produits]);

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>Erreur : {error}</div>;

    return (
        <div className="bg-white dark:bg-gray-800">
            <div className="container mx-auto p-4 mt-20">
                <div className="grid grid-cols-4 gap-2 mb-4">
                    <input
                        className="flex-1 p-2 border rounded text-black"
                        type='text'
                        placeholder='Rechercher un produit'
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />
                    <select
                        className="p-2 border rounded text-black"
                        value={categorie}
                        onChange={(e) => setCategorie(e.target.value)}
                    >
                        <option value="">Toutes les catégories</option>
                        {categories.map(categorie => (
                            <option key={categorie?.name} value={categorie?.name}>{categorie?.name}</option>
                        ))}
                    </select>
                </div>
                <CardList produits={produitFiltres} />
            </div>
        </div>
    );
}

export default Home;
