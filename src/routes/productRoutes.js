const express = require("express");
const {
  allProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productControllers");

const { ifAuth } = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", ifAuth, allProducts);
router.get("/:id", ifAuth, getProduct);
router.post("/",createProduct);
router.patch("/:id", ifAuth, updateProduct);
router.delete("/:id", ifAuth, deleteProduct);

module.exports = router;
