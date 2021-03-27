const express = require("express");
const router = express.Router();

const {
     createOrder,
     getAllOrder,
     getOrderbyId,
     getOrder,
     removeOrder,
     updateOrder,
//   getOrderStatus,
//   updateStatus
} = require("../controller/orderController");

// Create Order
router.post("/order/create",createOrder);  // http://localhost:3100/api/order/create

//GetAllOrder
router.get("/order/getallorders/",getAllOrder); // http://localhost:3100/api/order/getallorders

router.param("orderId", getOrderbyId); // param : parameter

//Find OrderById
 router.get("/orderbyid/:orderId", getOrder)  // http://localhost:3100/api/orderbyid/

//Remove Order
router.delete("/removeorderbyid/:orderId",removeOrder); // http://localhost:3100/api/removeorderbyid/

//Update Order 
router.put("/updateorderbyid/:orderId", updateOrder); // http://localhost:3100/api/updateorderbyid/

module.exports = router;