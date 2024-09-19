const Email = require('../models/email');
const FAQ = require('../models/faq');
const Feedback = require('../models/feedback');

exports.addEmail = async (req, res) => {
    const { email } = req.body;
    try {
        const newEmail = new Email({ email });
        await newEmail.save();
        res.status(201).json({ message: 'Email added successfully', email: newEmail });
    } catch (error) {
        res.status(500).json({ message: 'Error adding email', error });
    }
};

exports.getAllEmails = async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).json(emails);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving emails', error });
    }
};

exports.getAllFAQs = async (req, res) => {
    try {
        const faqs = await FAQ.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving FAQs', error });
    }
};

exports.getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await Feedback.find();
        res.status(200).json(feedbacks);
    } catch (error) {
        res.status(500).json({ message: 'Error retrieving feedbacks', error });
    }
};
