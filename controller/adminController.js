const Email = require('../models/email');
const FAQ = require('../models/faq');
const Feedback = require('../models/feedback');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.register = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = new User({ username, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.addFAQ = async (req, res) => {
    const { pertanyaan, jawaban } = req.body;
    try {
        const newFAQ = new FAQ({ pertanyaan, jawaban });
        await newFAQ.save();
        res.status(201).json({ message: 'FAQ added successfully', faq: newFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Error adding FAQ', error });
    }
};

exports.updateFAQ = async (req, res) => {
    const { id } = req.params;
    const { pertanyaan, jawaban } = req.body;
    try {
        const updatedFAQ = await FAQ.findByIdAndUpdate(id, { pertanyaan, jawaban }, { new: true });
        if (!updatedFAQ) return res.status(404).json({ message: 'FAQ not found' });
        res.status(200).json({ message: 'FAQ updated successfully', faq: updatedFAQ });
    } catch (error) {
        res.status(500).json({ message: 'Error updating FAQ', error });
    }
};

exports.deleteFAQ = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFAQ = await FAQ.findByIdAndDelete(id);
        if (!deletedFAQ) return res.status(404).json({ message: 'FAQ not found' });
        res.status(200).json({ message: 'FAQ deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting FAQ', error });
    }
};


exports.addFeedback = async (req, res) => {
    const { nama, asal, respon } = req.body;
    const logo = req.file ? req.file.path : null;
    try {
        const newFeedback = new Feedback({ nama, asal, respon, logo });
        await newFeedback.save();
        res.status(201).json({ message: 'Feedback added successfully', feedback: newFeedback });
    } catch (error) {
        res.status(500).json({ message: 'Error adding feedback', error });
    }
};

exports.updateFeedback = async (req, res) => {
    const { id } = req.params;
    const { nama, asal, respon } = req.body;
    const logo = req.file ? req.file.path : null;

    try {
        const feedback = await Feedback.findById(id);
        if (!feedback) {
            return res.status(404).json({ message: 'Feedback not found' });
        }

        if (logo && feedback.logo) {
            fs.unlink(feedback.logo, (err) => {
                if (err) console.error(err);
            });
        }

        if (nama) feedback.nama = nama;
        if (asal) feedback.asal = asal;
        if (respon) feedback.respon = respon;
        feedback.logo = logo || feedback.logo;

        const updatedFeedback = await feedback.save();
        res.status(200).json({ message: 'Feedback updated successfully', feedback: updatedFeedback });
    } catch (error) {
        res.status(500).json({ message: 'Error updating feedback', error });
    }
};

exports.deleteFeedback = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedFeedback = await Feedback.findByIdAndDelete(id);
        if (!deletedFeedback) return res.status(404).json({ message: 'Feedback not found' });
        res.status(200).json({ message: 'Feedback deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting feedback', error });
    }
};

exports.deleteEmail = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEmail = await Email.findByIdAndDelete(id);
        if (!deletedEmail) return res.status(404).json({ message: 'Email not found' });
        res.status(200).json({ message: 'Email deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting Email', error });
    }
};

exports.loginAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });

        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        // Kirim token ke client
        res.status(200).json({ 
            message: 'Login successful', 
            token 
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};
