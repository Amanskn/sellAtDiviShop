const mongoose= require("mongoose");
const storeSchema=new mongoose.Schema({
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Seller"
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product'
        }
    ],
    address:{
        type:String,
        required:true,
        unique:true
    },
    gst:{
        type:String,
        required:true
    },
    logo:{
        type:String,
        // required:true
    },
    fromTime:{
        type:String,
        required:true
    },
    toTime:{
        type:String,
        required:true
    }
},{
    timestamps:true
});


const Store=mongoose.model('Store',storeSchema);
module.exports=Store;