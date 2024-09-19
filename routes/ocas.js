const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');
const authMiddleware = require('../middleware/authMiddleware');
const ocaController = require('../controller/ocaController');
const upload = require('../middleware/upload');

// Tambah, Update, Hapus FAQ (hanya admin)
router.post('/faq', authMiddleware, adminController.addFAQ); 
router.put('/faq/:id', authMiddleware, adminController.updateFAQ);
router.delete('/faq/:id', authMiddleware, adminController.deleteFAQ);

// Tambah, Update, Hapus Feedback (hanya admin)
router.post('/feedback', authMiddleware, upload.single('logo'), adminController.addFeedback);
router.put('/feedback/:id', authMiddleware, upload.single('logo'), adminController.updateFeedback);
router.delete('/feedback/:id', authMiddleware, adminController.deleteFeedback);

// Delete email (hanya admin)
router.delete('/email/:id', authMiddleware, adminController.deleteEmail);

// Dapat dilakukan tanpa login
router.post('/email', ocaController.addEmail);
router.get('/email', ocaController.getAllEmails)
router.get('/faq', ocaController.getAllFAQs);
router.get('/feedback', ocaController.getAllFeedbacks);

module.exports = router;
