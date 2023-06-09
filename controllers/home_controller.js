const Product = require("../models/products");


module.exports.home = async function (req, res) {
    try {
        let allProducts = await Product.find();

        return res.render("home", {
            title: "Home Page",
            allProducts: allProducts
        })

    } catch (error) {
        console.log("Inside catch of homecontroller and the error is :-", error);
        return;
    }

}


module.exports.filterProducts = async function (req, res) {
    try {
        const keyword = req.body.keyWord;
        const regex = new RegExp(keyword, 'i');
        let allProducts = await Product.find({ productName: regex });
        // console.log("Inside filterProducts", req.body);
        return res.render("home", {
            title: "Home Page",
            allProducts: allProducts
        });
    } catch (error) {
        console.log("Inside catch of filterProducts and the error is :-", error);
        return res.status(500).send("Internal Server Error");
    }
}