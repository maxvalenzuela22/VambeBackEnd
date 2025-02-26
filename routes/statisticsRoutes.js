const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/:name', statisticsController.getStatistics);

router.get('/most-closed-deals/:name', statisticsController.getSubcategoriesWithMostClosedDeals);
router.get('/most-failed-deals/:name', statisticsController.getSubcategoriesWithMostFailedDeals);

module.exports = router;