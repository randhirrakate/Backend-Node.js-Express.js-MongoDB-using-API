const express = require('express')
const router = express.Router();

const {getCategoryById} = require("../controller/category.js");
const {createCategory} = require("../controller/category.js");
const {getCategory} = require("../controller/category.js");
const {getAllCategory} = require("../controller/category.js");
const {removeCategory} = require("../controller/category.js");
const {updateCategory} = require("../controller/category.js")

router.param("categoryId", getCategoryById);  // param: parameter

router.post("/category/create/",createCategory);  // http://localhost:3100/api/category/create

router.get("/categorybyid/:categoryId", getCategory)  // http://localhost:3100/api/categorybyid/categoryId

router.get("/category/getallcategories/",getAllCategory); // http://localhost:3100/api/category/getallcategories

router.delete("/removecategory/:categoryId",removeCategory); // http://localhost:3100/api/removecategory/categoryId

router.put("/updatecategory/:categoryId", updateCategory);  // http://localhost:3100/api/updatecategory/categoryId

module.exports = router;