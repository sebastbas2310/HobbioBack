'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Plates', {
      plate_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      plate_name: {
        type: Sequelize.STRING,
        allowNull: false, // El nombre del plato es obligatorio
      },
      plate_desc: {
        type: Sequelize.TEXT, // Descripción del plato
        allowNull: true, // Puede ser opcional
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false, // El precio es obligatorio
      },
      plate_img: {
        type: Sequelize.STRING, // URL de la imagen del plato
        allowNull: true,
      },
      plate_cat: {
        type: Sequelize.STRING, // Categoría del plato (ej. "Entrante", "Postre")
        allowNull: true,
      },
      ingredients: {
        type: Sequelize.STRING, // Ingredientes del plato
        allowNull: true,
      },
      is_stock: {
        type: Sequelize.BOOLEAN, // Indica si el plato está en stock
        defaultValue: true, // Por defecto, se asume que está en stock
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('plate');
  },
};