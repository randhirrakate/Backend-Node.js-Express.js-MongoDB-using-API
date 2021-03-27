const express = require("express");
const router = express.Router();

const {
        getProductById,
        createProduct,
        getProduct,
        getAllProduct,
        removeProduct,
        updateProduct
} = require("../controller/productController");


router.param("productId", getProductById); // param : parameter

router.post("/product/create/",createProduct);  // http://localhost:3100/api/product/create

router.get("/product/:productId", getProduct)  // http://localhost:3100/api/product/productId

router.get("/product",getAllProduct); // http://localhost:3100/api/product

router.delete("/removeproduct/:productId",removeProduct); // http://localhost:3100/api/removeproduct/productId

router.put("/updateproduct/:productId", updateProduct);  // http://localhost:3100/api/updateproduct/productId

module.exports = router;