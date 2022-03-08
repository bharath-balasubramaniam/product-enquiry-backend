const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");

// getall Products
const allProducts = asyncHandler(async (req, res) => {
  const qStatus = req.query.status;
  let products;
  try {
    if (qStatus) {
      products = await Product.find({ status: qStatus });
      return res.status(200).json(products);
    } else {
      products = await Product.find({});
      return res.status(200).json(products);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//  get a product
const getProduct = asyncHandler(async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//  create a product
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    contact,
    productName,
    productQuantity,
    productDescription,
    remarks,
  } = req.body;
  try {
    if (
      !name ||
      !email ||
      !contact ||
      !productName ||
      !productDescription ||
      !productQuantity
    ) {
      res.status(400);
      throw new Error("Please fill all the fields");
    }
    // check if enquiry exist
    const enquiry = await Product.findOne({ name, productName });
    if (enquiry) {
      res.status(400);
      throw new Error("This Enquiry already exist");
    }
    let product = await Product.create({
      name,
      email,
      contact,
      productName,
      productDescription,
      productQuantity,
      remarks,
    });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});
//  update product
const updateProduct = asyncHandler(async (req, res) => {
  const { status, remarks } = req.body;
  try {
    let product = await Product.findByIdAndUpdate(req.params.id, {
      status,
      remarks,
    });
    return res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

//  delete product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    let product = await Product.findByIdAndDelete(req.params.id);
    return res.status(204).json("product is deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});
module.exports = {
  allProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
