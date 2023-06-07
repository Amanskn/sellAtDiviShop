const Seller = require("../models/seller")
const Store = require("../models/store");

module.exports.signUp = function (req, res) {
    return res.render("sellers_sign_up", {
        title: "Sign Up"
    })
}



module.exports.create = async function (req, res) {

    try {
            console.log("This is the req.body", req.body)
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
            return res.render("sellers_store_page", {
                title: "Store Page",
                currentSeller:currSeller
            })
        
    } catch (error) {
        console.log("Inside catch of store action and the rror is:-" ,error);
        return;
    }
    
}


module.exports.storeCreate=async function(req,res){
    try {
        console.log("This is the req.body in Store create",req.body,req.cookies.currentSeller);
        let newStore=await Store.create({
            seller:req.cookies.currentSeller,
            address:req.body.address,
            gst:req.body.gst,
            fromTime:req.body.fromTime,
            toTime:req.body.toTime,
            
        });
        let preSeller=await Seller.findByIdAndUpdate(newStore.seller, { store: newStore._id }, { new: true });
        console.log("Store created and the Store is :- ",newStore,"And the preSeller is:- ",preSeller);


        return res.redirect("back");
        
    } catch (error) {
        console.log("Inside catch of storecreate controller and the error is :- ",error);
        return;
    }

}

module.exports.addInventoryPage=function(req,res){
    return res.render("add_inventory_page",{
        title:"Inventory Page"
    })
}

module.exports.addInventory=function(req,res){
    console.log("This is the inventory info :- ",req.body);
    return res.redirect("back");
}

module.exports.createSession = function (req, res) {
    return res.status(200).json({
        message: "Created session"
    })
}