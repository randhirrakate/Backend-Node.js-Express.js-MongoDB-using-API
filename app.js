const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 3100

mongoose.connect('mongodb+srv://wisdomsprouts:wisdomsprouts@cluster0.5puws.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
 {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=> {
    console.log("DB CONNECTED")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const OrderRoutes = require("./routes/orderRoutes");

app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", OrderRoutes);

// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
app.listen(process.env.PORT || 3000, () => console.log(`Example app listening at http://localhost:${port}`))