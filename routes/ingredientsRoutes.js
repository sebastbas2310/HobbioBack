const express = require("express");
const router = express.Router();
const ingredientController = require("../controller/ingredientsController");

router.post("/addIngredient", ingredientController.addIngredient);
router.get("/", ingredientController.getIngredient);
router.put("/updateIngredient/:ingredient_id", ingredientController.updateIngredient);
router.delete("/deleteIngredient/:ingredient_id", ingredientController.deleteIngredient);

module.exports = router;
