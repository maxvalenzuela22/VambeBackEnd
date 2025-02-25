const express = require('express');
const router = express.Router();
const metricsController = require('../controllers/metricsController');

router.get('/', metricsController.getMetrics);
router.get('/subcategories', metricsController.getSubcategories);

module.exports = router;