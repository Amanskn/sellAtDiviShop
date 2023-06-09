require('dotenv').config()
const express=require("express");
const cookieParser = require('cookie-parser')
const app=express();
const port=3000;
const expressLayouts=require('express-ejs-layouts');
const DB=require('./config/mongoose')
app.use(cookieParser());
app.use(express.urlencoded({extended:false}))
app.set('view engine',"ejs");
app.set('views',"./views");

// using the expressLayout
app.use(expressLayouts);

// extract styles and scripts from sub pages into the layout
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);

app.use("/",require("./routes"));
app.listen(port,(err)=>{
    if(err){
        console.log("Error in running the server and the error is:-",err);
        return;
    }
    console.log(`Server is running on port :- ${port}`)
})