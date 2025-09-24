'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('worker', {
      worker_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      worker_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      worker_status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      worker_rol: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      salary: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true, // Asegura que el email sea único
        validate: {
          isEmail: true, // Valida que el valor sea un email válido
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false, // El password no puede ser nulo
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false, // El phone_number no puede ser nulo
        validate: {
          len: [10, 15], // Asegura que el teléfono tenga entre 10 y 15 caracteres
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('worker');
  }
};
