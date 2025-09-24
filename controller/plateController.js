const { plate } = require("../models");

const PlateController = {

  getPlate: async (req, res) => {
    try {
      const Plate = await plate.findAll();
      res.status(200).json(Plate);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  addPlate: async (req, res) => {
    await plate.sync();
    try {
      const dataPlate = req.body;
      const createPlate = await plate.create({
        plate_name: dataPlate.plate_name,
        plate_desc: dataPlate.plate_desc,
        price: dataPlate.price,
        plate_img: dataPlate.plate_img,
        plate_cat: dataPlate.plate_cat,
        ingredients: dataPlate.ingredients,
        is_stock: dataPlate.is_stock
      });
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Created product"
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message
      });
    }
  },

  updateTable: async (req, res) => {
    try {
      const id = req.params.Plate_id;
      const dataPlate = req.body;
      const updatePlate = await plate.update(
        {
          Plate_name: dataPlate.Plate_name,
          Plate_desc: dataPlate.Plate_desc,
          price: dataPlate.price,
          Plate_img: dataPlate.Plate_img,
          Plate_cat: dataPlate.Plate_cat,
          ingredients: dataPlate.ingredients,
          is_stock: dataPlate.is_stock
        },
        {
          where: {
            Plate_id: id,
          },
        }
      );
      res.status(200).json({
        ok: true,
        status: 200,
        body: updatePlate,
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        message: error.message,
      });
    }
  },

  deletePlate: async (req, res) => {
    try {
      const id = req.params.plate_id;

      // Verificar si el plato existe
      const plateExists = await plate.findByPk(id);
      if (!plateExists) {
        return res.status(404).json({ ok: false, message: "Plato no encontrado" });
      }

      // Eliminar el plato
      await plate.destroy({
        where: {
          plate_id: id
        }
      });

      res.status(200).json({
        ok: true,
        message: "Plato eliminado correctamente"
      });
    } catch (error) {
      res.status(500).json({
        ok: false,
        message: error.message
      });
    }
  }

};

module.exports = PlateController;
