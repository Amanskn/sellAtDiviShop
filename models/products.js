const mongoose= require("mongoose");
const productSchema=new mongoose.Schema({
    store:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Store"
    },
    
    category:{
        type:String,
        required:true,
        
    },
    subCategory:{
        type:String,
        required:true
    },
    productName:{
        type:String,
        required:true
    },
    mrp:{
        type:String,
        required:true
    },
    sellingPrice:{
        type:String,
        required:true
    },
    qty:{
        type:String,
        required:true
    },
    productImage:{
        data: Buffer,
        contentType: String,
        
        // required:true
    }
},{
    timestamps:true
});


const Product=mongoose.model('Product',productSchema);
module.exports=Product;