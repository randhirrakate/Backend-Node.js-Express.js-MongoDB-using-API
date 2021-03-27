const { Order, ProductCart } = require("../model/orderModel");

exports.createOrder = (req, res) => 
{
const order = new Order(req.body);

  order.save((err, orderData) => 
  {
    if (err) 
    {
      return res.status(400).json({
        error: "Failed to save your order in DB"
      });
    }
    res.json(orderData);
  });

};

// to read all order
exports.getAllOrder = (req, res) => 
{
  Order.find().exec((err, orderData) => 
  {
    if (err) {
      return res.status(400).json({
        error: "No order found"
      });
    }
    res.json(orderData);
  });
};

 //to find order
  exports.getOrderbyId = (req, res, next, id) => 
   {
      Order.findById(id) 
      .exec((err, orderData) => 
          {
              if (err) {
              return res.status(400).json({
              error: "Order not found"
          });
    }

    req.order = orderData;  //global variable 

    next();
  
  });
};

//to find order byId
exports.getOrder = (req, res) => 
{
  return res.json(req.order);

};

// to remove order byuserId
   exports.removeOrder = (req, res) =>
    {
      const order = req.order;

       order.remove((err, order) => {
   if (err) {
     return res.status(400).json({
       error: "Failed to delete this order"
     });
   }
   res.json({
     message: "Successfull deleted"
   
   });
 });
};

//to update order
 exports.updateOrder = (req, res) => 
 {
    const order = req.order;
    order.products = req.body.products
    order.product = req.body.product
    order.name = req.body.name;
    order.count = req.body.count;
    order.price = req.body.price;
    order.amount = req.body.amount;
    order.address = req.body.address;
    order.user = req.body.user;

       order.save((err, updatedOrder) => {
         if(err) {
           return res.status(400).json({
             error: "Failed to update order"
           });
         }
         res.json(updatedOrder);
     
     
        });
    };