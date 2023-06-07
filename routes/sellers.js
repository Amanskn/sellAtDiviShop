const express= require("express");
const router=express.Router();
const sellersController=require("../controllers/sellers_controller");


router.get('/sign-up',sellersController.signUp);
router.post('/create',sellersController.create);
router.get('/store',sellersController.store);
router.post('/store/create',sellersController.storeCreate);
router.get('/:email',sellersController.addInventoryPage);
router.post('/add-inventory',sellersController.addInventory);
router.post('/create-session',sellersController.createSession);

module.exports=router;