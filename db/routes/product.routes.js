const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Créer un nouveau produit
router.post('/', upload.single('image'), (err, req, res, next) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    next();
}, productController.createProduct);

// Lire tous les produits
router.get('/', productController.getAllProducts);

// Lire un produit spécifique par ID
router.get('/:id', productController.getProductById);

// Mettre à jour un produit par ID
router.put('/:id', productController.updateProduct);

// Supprimer un produit par ID
router.delete('/:id', productController.deleteProduct);

module.exports = router;
