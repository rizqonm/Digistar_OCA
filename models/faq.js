const mongoose = require('mongoose');

const faq = new mongoose.Schema({
    pertanyaan: {
        type: String,
        required: true
    },
    jawaban: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('FAQ', faq);