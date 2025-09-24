const { Table } = require("../models");

const tableController = {

  getTable: async (req, res) => {
    try {
      const table = await Table.findAll();
      res.status(200).json(table);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  addTable: async (req, res) => {
    await Table.sync();
    try {
      const dataTable = req.body;
      const createTable = await Table.create({
        table_size: dataTable.table_size,
        table_disp: dataTable.table_disp  
      });
      res.status(201).json({
        ok: true,
        status: 201,
        message: "Mesa creada correctamente"
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  updateTable: async (req, res) => {
    try {
      const id = req.params.table_id;
      const dataTable = req.body;

      const tableExists = await Table.findByPk(id);
      if (!tableExists) {
        return res.status(404).json({ error: "Mesa no encontrada" });
      }

      const updateTable = await Table.update(
        {
          table_size: dataTable.table_size,
          table_disp: dataTable.table_disp
        },
        {
          where: { table_id: id },
        }
      );

      res.status(200).json({
        ok: true,
        status: 200,
        message: "Mesa actualizada correctamente",
        body: updateTable,
      });
    } catch (error) {
      console.error("Error al actualizar mesa:", error);
      return res.status(500).json({ error: error.message });
    }
  },

  deleteTable: async (req, res) => {
    try {
      const id = req.params.table_id;

      const table = await Table.findByPk(id);
      if (!table) {
        return res.status(404).json({ error: "Mesa no encontrada" });
      }

      await table.destroy();

      res.status(200).json({
        ok: true,
        status: 200,
        message: "Mesa eliminada correctamente",
      });
    } catch (error) {
      console.error("Error al eliminar mesa:", error);
      return res.status(500).json({ error: error.message });
    }
  }

};

module.exports = tableController;
