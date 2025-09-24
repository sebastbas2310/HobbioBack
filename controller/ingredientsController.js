const { ingredient } = require("../models")

const ingredientController = {

  getIngredient: async (req, res) => {
    try {
      const Ingredient = await ingredient.findAll();
      res.status(200).json(Ingredient);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  addIngredient: async (req, res) => {
    try {
      const dataIngredient = req.body;
      await ingredient.sync();
      const createIngredient = await ingredient.create({
        ingredient_name: dataIngredient.ingredient_name,
        ingredient_type: dataIngredient.ingredient_type,
        ingredient_cant: dataIngredient.ingredient_cant
      });
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Created Ingredient"
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message
      });
    }
  },

  updateIngredient: async (req, res) => {
    try {
      const id = req.params.ingredient_id;
      const dataIngredient = req.body;

      const ingredientExists = await ingredient.findByPk(id);
      if (!ingredientExists) {
        return res.status(404).json({ error: "Ingredient no encontrado" });
      }

      const updateIngredient = await ingredient.update(
        {
          ingredient_name: dataIngredient.ingredient_name,
          ingredient_type: dataIngredient.ingredient_type,
          ingredient_cant: dataIngredient.ingredient_cant,
        },
        {
          where: {
            ingredient_id: id,
          },
        }
      );

      res.status(200).json({
        ok: true,
        status: 200,
        message: "Ingrediente actualizado correctamente",
        body: updateIngredient,
      });
    } catch (error) {
      console.error("Error al actualizar ingrediente:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  // Método para eliminar ingrediente
  deleteIngredient: async (req, res) => {
    try {
      const id = req.params.ingredient_id;
      const ingredientExists = await ingredient.findByPk(id);

      if (!ingredientExists) {
        return res.status(404).json({ error: "Ingrediente no encontrado" });
      }

      await ingredient.destroy({
        where: {
          ingredient_id: id
        }
      });

      res.status(200).json({
        ok: true,
        status: 200,
        message: "Ingrediente eliminado correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

}

module.exports = ingredientController;
