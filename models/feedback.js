const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    logo: {
        type: String,
        required: true
    },
    nama: {
        type: String,
        required: true
    },
    asal: {
        type: String,
        required: true
    },
    respon: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Feedback', feedbackSchema);