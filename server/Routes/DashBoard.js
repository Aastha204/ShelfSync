const express=require('express');
const router=express.Router();
const dashboardController=require('../Controllers/DasdBoardController')

router.get('/', dashboardController.getDashboardData);

module.exports = router;