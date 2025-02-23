const express = require('express');
const router = express.Router();
const multer = require('multer');
const csvController = require('../controllers/csvController');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('csv'), csvController.postCSV);

router.get('/', csvController.getCSV);

module.exports = router;