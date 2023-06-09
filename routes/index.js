const express= require("express");
const router=express.Router();
const homeController=require("../controllers/home_controller");
const { route } = require("./sellers");


router.get('/',homeController.home);
router.use('/sellers',require('./sellers'));
router.post('/product/search',homeController.filterProducts);

module.exports=router;