const Category = require("../model/category.js")

// to create category
exports.createCategory = (req, res) => 
{
  const category = new Category(req.body); //object
  
  category.save((err, backend_category) =>
   {
     if (err)
     {
     if(err.code === 11000 || err.code === 11001)
     {
       return res.status(400).json({
         error: "Duplicate value " +req.body.name +",  category name must be unique",
        
       });
     }
     else
     {
       return res.status(400).json({
        error: "Not able to save category"
      });
     }
    
    }
     res.json({ backend_category });
  });

};


// to read all category 
exports.getAllCategory = (req, res) => 
{
  
  Category.find().exec((err, categories) => 
  {
    if (err) {
      return res.status(400).json({
        error: "NO categories found"
      });
    }

    res.json(categories);
  });
};


exports.getCategoryById = (req, res, next, id) => 
{
Category.findById(id)
.exec((err, categoryData) => 
{
 if (err) {
    return res.status(400).json({
     error: "Category not found"
   });
 }

  req.category = categoryData;  //global variable 
 next();
  
});
};


//to read category byId
exports.getCategory = (req, res) => 
{
    return res.json(req.category);
 
};


exports.removeCategory = (req, res) => {
  const category = req.category;

  category.remove((err, category) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this category"
      });
    }
    res.json({
      message: "Successfull deleted"
    });
  });
};


exports.updateCategory = (req, res) => {
  const category = req.category;

  category.name = req.body.name;

  category.save((err, updateCategory) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to update category"
    });
  }
  res.json(updateCategory);
  });
};