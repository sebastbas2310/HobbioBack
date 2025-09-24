'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ingredient extends Model {
    static associate(models) {
     // ingredient.hasMany(models.Plate, { foreignKey: "ingredientFk", as: "ingredient" });

    }
  }
  ingredient.init({
    ingredient_id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        ingredient_name:{
            type: DataTypes.STRING,
            allowNull:false
        },
        ingredient_type:{
            type: DataTypes.STRING,
            allowNull:false
        },
        ingredient_cant:{ 
            type: DataTypes.FLOAT(10,2),
            allowNull:false
        }
  }, {
    sequelize,
    modelName: 'ingredient',    
  });
  return ingredient;
};