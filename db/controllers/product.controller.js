const Product = require('../models/product.model');



// Créer un nouveau produit
exports.createProduct = async (req, res) => {
    try {
        const newProductData = {
            ...req.body,
            image: req.file ? req.file.path : null  // Ajoute le chemin de l'image si disponible
        };
        const newProduct = new Product(newProductData);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire tous les produits
exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire un produit spécifique par ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('category');
        if (!product) return res.status(404).json({ message: "Produit non trouvé" });
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour un produit
// Mettre à jour un produit
exports.updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Produit non trouvé" });

        // Supprimer l'ancienne image si une nouvelle est téléchargée
        if (req.file && product.image) {
            const fs = require('fs');
            fs.unlinkSync(product.image);
        }

        // Mettre à jour le produit avec les nouvelles informations et la nouvelle image
        const updatedData = {
            ...req.body,
            image: req.file ? req.file.path : product.image
        };
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, updatedData, { new: true });

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Supprimer un produit
// Supprimer un produit
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Produit non trouvé" });

        // Supprimer l'image associée au produit
        if (product.image) {
            const fs = require('fs');
            fs.unlinkSync(product.image);
        }

        // Supprimer le produit de la base de données
        await product.remove();
        res.status(200).json({ message: "Produit supprimé" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

