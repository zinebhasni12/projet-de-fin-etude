const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
    // autres champs selon vos besoins
});

module.exports = mongoose.model('Category', categorySchema);
