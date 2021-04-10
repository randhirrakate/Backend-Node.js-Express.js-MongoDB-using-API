const Product = require("../model/productModel");
// const formidable = require("formidable");
// const _ = require("lodash");
// const fs = require("fs");


exports.createProduct = 
(req, res) =>
 {
 
  const product = new Product(req.body);

  product.photo = req.file.path;  // for upload img

  product.save((err, category) => 
  {
    if (err) 
    {

      if(err.code === 11000 || err.code === 11001)
      {
        return res.status(400).json({
          error: "Duplicate Value " +req.body.name +",Value must be unique",
         
        });
      }
      else
      {
        return res.status(400).json({
          error: "NOT able to save category in DBs",
          messgae : err
         
        });
      }
      }
     
    res.json({ category });
  });
};


exports.getAllProduct =
 (req, res) => 
 {
  Product.find().exec((err, productData) => {
    if (err) {
      return res.status(400).json({
        error: "NO product found"
      });
    }
    
    res.json(productData);
  });
};


// id = 603c72180098e320c0b8e104

exports.getProductById = (req, res, next, id) => 
{
Product.findById(id)
  .populate("category")   // get foregin key data 
 .exec((err, productData) => 
 {
   if (err) {
      return res.status(400).json({
       error: "Product not found"
     });
   }

    req.product = productData;  //global variable 
   next();
    
 });
};


exports.getProduct = (req, res) => 
{
  // req.product.photo = undefined;
     return res.json(req.product);
};


//to remove product byproductId
exports.removeProduct = (req, res) =>
{
 const product = req.product;

 product.remove((err, product) => {
   if (err) {
     return res.status(400).json({
       error: "Failed to delete this product"
     });
   }
   res.json({
     message: "Successfull deleted"
   
   });
 });
};


exports.updateProduct = (req, res) => {
  const product = req.product;

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.category = req.body.category;
  product.stock = req.body.stock;
  product.sold = req.body.sold;
  product.photo = req.body.photo;

  product.save((err, updateProduct) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update product"
    });
  }
  res.json(updateProduct);
  });
};
