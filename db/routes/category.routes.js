const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/category.controller');

// Créer une nouvelle catégorie
router.post('/', categoryController.createCategory);

// Lire toutes les catégories
router.get('/', categoryController.getAllCategories);

// Mettre à jour une catégorie par ID
router.put('/:id', categoryController.updateCategory);

// Supprimer une catégorie par ID
router.delete('/:id', categoryController.deleteCategory);

module.exports = router;
