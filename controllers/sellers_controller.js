const Seller = require("../models/seller")
const Store = require("../models/store");
const Product = require("../models/products");
const fs=require('fs');
const path=require('path');




var multer = require('multer');
 
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});
 
module.exports.upload = multer({ storage: storage });

module.exports.signUp = function (req, res) {
    return res.render("sellers_sign_up", {
        title: "Sign Up"
    })
}



module.exports.create = async function (req, res) {

    try {
            // console.log("This is the req.body", req.body)
            // if password and confirm password do not match then redirect to the sign up page
            if (req.body.password != req.body.confirmPassword) {
                // alert("Password and confirm password do not match");
                return res.redirect('back');
            }

            // finding the seller in the database if exist previously
            let preSeller = await Seller.findOne({ email: req.body.email });

            if (!preSeller) {
                let currentSeller=await Seller.create(req.body);
                res.cookie('currentSeller', currentSeller._id);
                // after creation of the user redirect to the sign in page
                return res.redirect('/sellers/store');
                // return res.render("sellers_store_page", {
                //     title: "Store Page",
                //     currentSeller:currentSeller

                // })
            }

            // if seller is found then redirect back to the sign up page
            else {
                return res.redirect('back');
            }



    } catch (error) {
        console.log("Inside catch block and the error is :-",error);

        return res.status(200).json({
            message:"Internal server error occured",
            ErrorIs:error
        })


    }
}


module.exports.store =async  function (req, res) {

    try {
            let currSeller= await Seller.findById(req.cookies.currentSeller);
            // console.log("This is the req.cookies.cuurentUser",req.cookies.currentSelle);
            // console.log("This is seller fetched",currSeller);
            if(currSeller.store){
                return res.render("sellers_store_page", {
                    title: "Store Page",
                    currentSeller:currSeller,
                    store:true
                })    
            }

            return res.render("sellers_store_page", {
                title: "Store Page",
                currentSeller:currSeller,
                store:false
            })
        
    } catch (error) {
        console.log("Inside catch of store action and the rror is:-" ,error);
        return;
    }
    
}


module.exports.storeCreate=async function(req,res){
    try {
        // console.log("This is the req.body in Store create",req.body,req.cookies.currentSeller);
        let newStore=await Store.create({
            seller:req.cookies.currentSeller,
            address:req.body.address,
            gst:req.body.gst,
            fromTime:req.body.fromTime,
            toTime:req.body.toTime,
            logo:{
                data: fs.readFileSync(path.join(__dirname ,'../uploads/' + req.file.filename)),
                contentType: 'image/png'

            }
            
        });
        let preSeller=await Seller.findByIdAndUpdate(newStore.seller, { store: newStore._id }, { new: true });
        // console.log("Store created and the Store is :- ",newStore,"And the preSeller is:- ",preSeller);


        return res.redirect("back");
        
    } catch (error) {
        console.log("Inside catch of storecreate controller and the error is :- ",error);
        return;
    }

}

module.exports.addInventoryPage= async function(req,res){
    try {
        let seller=await Seller.findOne({email:req.params.email});
        let store=await Store.findById(seller.store);
        let productsOfTheSeller= await Product.find({ _id: { $in: store.products } });
        return res.render("add_inventory_page",{
            title:"Inventory Page",
            sellerEmail:req.params.email,
            storeInfo:store,
            productsOfTheSeller:productsOfTheSeller
        })
        
    } catch (error) {
        console.log("Inside catch of addInventoryPage and the error is :- ",error);
        return;
    }
    
}

module.exports.addInventory=async function(req,res){
    try {
        // console.log("This is the seller email",req.body.sellerEmail,req.body);
        let seller=await Seller.findOne({email:req.body.sellerEmail});
        let newProduct=await Product.create(req.body);
        newProduct.productImage={
            data: fs.readFileSync(path.join(__dirname ,'../uploads/' + req.file.filename)),
            contentType: 'image/png'

        };
        await newProduct.save();
        // console.log("Before new Product",newProduct);
        let store=await Store.findById(seller.store);
        store.products.push(newProduct);
        await store.save();

        // console.log("THis is seller.store",seller.store,seller)
        newProduct.store=seller.store;
        await newProduct.save();
        // console.log("After new Product",newProduct)

        return res.redirect("back");
        

        
    } catch (error) {
        console.log("Inside catch of add inventory and the error is :- ",error);
        return;
    }
    
}

module.exports.createSession = function (req, res) {
    return res.status(200).json({
        message: "Created session"
    })
}