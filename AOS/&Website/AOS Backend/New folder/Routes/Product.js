const express = require("express");
const router = express.Router();
const ProductController = require("../Controllers/ProductController");

router.get("/", ProductController.getAllProducts);

router.get("/categories", ProductController.getAllCategorys);
router.get("/categories/:category", ProductController.getProductByCategory);
router.get("/filter", ProductController.FilterProducts);
router.get("/search/:search", ProductController.searchProduct);
router.get("/:productId", ProductController.getProduct);
module.exports = router;
