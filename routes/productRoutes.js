const express = require("express");
const router = express.Router();
var multer  = require('multer');

const storage = multer.diskStorage({
        destination: function(req, file, cb) {
          cb(null, './uploads/');
        },
        filename: function(req, file, cb) {
          cb(null,file.originalname);
        }
      });
      
      var upload = multer({ storage: storage })

const {
        getProductById,
        createProduct,
        getProduct,
        getAllProduct,
        removeProduct,
        updateProduct
} = require("../controller/productController");


router.param("productId", getProductById); // param : parameter

// router.post("/product/create/",createProduct);  // http://localhost:3100/api/product/create

router.post("/product/create",upload.single('productImage'),createProduct);  // for upload img  

router.get("/product/:productId", getProduct)  // http://localhost:3100/api/product/productId

router.get("/product",getAllProduct); // http://localhost:3100/api/product

router.delete("/removeproduct/:productId",removeProduct); // http://localhost:3100/api/removeproduct/productId

router.put("/updateproduct/:productId", updateProduct);  // http://localhost:3100/api/updateproduct/productId

module.exports = router;