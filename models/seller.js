const mongoose= require("mongoose");
const sellerSchema=new mongoose.Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store"
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    businessName:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
});


const Seller=mongoose.model('Seller',sellerSchema);
module.exports=Seller;