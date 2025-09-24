'use strict';
const { Sequelize,  Model, DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  class Table extends Model {
    static associate(models) {
      //Table.hasMany(models.Table, { foreignKey: "tableFk", as: "table" });
    }
  }
  Table.init({
    table_id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
  },
  table_size:{
      type: DataTypes.INTEGER,
      allowNull:false
  },
  table_disp:{
      type: DataTypes.BOOLEAN,
      allowNull:false
  }
  }, {
    sequelize,
    modelName: 'Table',
    tableName: "Table",
    timestamps: true,
  },
);
  return Table;
};