const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',  // Référence au modèle Category
        required: true
    },
    image: {
        type: String,
        required: true  // Rendre ce champ facultatif
    }
    // autres champs selon vos besoins
});

module.exports = mongoose.model('Product', productSchema);
