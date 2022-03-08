const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoDb = require("./config/mongo");
const { errorHandler, notFound } = require("./middlewares/errorMiddleware");
const userRoute = require("./routes/userRoutes");
const productRoute = require("./routes/productRoutes");

const app = express();
//connect to database
mongoDb();
//middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("API is running successfully"));

//routes
app.use("/user", userRoute);
app.use("/product-enquiry", productRoute);

//Error handler

app.use(notFound);
app.use(errorHandler);

module.exports = app;
