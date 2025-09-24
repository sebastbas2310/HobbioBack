// models/worker.js
'use strict';
const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  class Worker extends Model {
    static associate(models) {
      // Aquí puedes definir relaciones si es necesario
    }
  }

  Worker.init(
    {
      worker_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      worker_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      worker_status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      worker_rol: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      salary: {
        type: DataTypes.FLOAT(10, 2),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true, // Valida que sea un correo válido
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [10, 15], // Opcional: para que el número tenga entre 10 y 15 caracteres
        },
      },
    },
    {
      sequelize,
      modelName: 'worker',
      tableName: 'worker', // Asegúrate de que coincida con tu base de datos
      timestamps: true,    // createdAt y updatedAt automáticos
    }
  );

  return Worker;
};
