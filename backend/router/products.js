const express = require("express")
const router = express.Router()
const productController = require("../controller/products")

router.post("/set",productController.insert)
router.get("/get",productController.list)
router.get("/sortByPrice/:value",productController.sortByPrice)
router.get("/sortByTime/:value",productController.sortByTime)
router.get("/getById/:id",productController.findById)
router.delete("/delete/:id",productController.delete)

module.exports = router

