const Category = require('../models/category.model');
const Product = require('../models/product.model'); // Assurez-vous d'importer le modèle de produit

// Créer une nouvelle catégorie
exports.createCategory = async (req, res) => {
    try {
        const newCategory = new Category({ name: req.body.name });
        const savedCategory = await newCategory.save();
        res.status(201).json(savedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Lire toutes les catégories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Mettre à jour une catégorie
exports.updateCategory = async (req, res) => {
    try {
        const updatedCategory = await Category.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedCategory) return res.status(404).json({ message: "Catégorie non trouvée" });
        res.status(200).json(updatedCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Supprimer une catégorie

exports.deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;

        // Trouver et supprimer la catégorie
        const deletedCategory = await Category.findByIdAndDelete(categoryId);
        if (!deletedCategory) return res.status(404).json({ message: "Catégorie non trouvée" });

        // Trouver et supprimer tous les produits associés à cette catégorie
        await Product.deleteMany({ category: categoryId });

        res.status(200).json({ message: "Catégorie et produits associés supprimés" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

