// models/comunity.js
import { Model } from "sequelize";

export default (sequelize, DataTypes) => {
  class Community extends Model {
    static associate(models) {
      // Aquí puedes definir relaciones si es necesario
    }
  }

  Community.init(
    {
      community_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      community_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      community_status: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      community_members:{
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
      },
      community_description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      community_image: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          isUrl: true,
        },
      },
      community_publications:{
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
      },
        community_admins:{
        type: DataTypes.ARRAY(DataTypes.UUID),
        allowNull: false,
        defaultValue: []
      },
    },
      {
      sequelize,
      modelName: "Community",  // mayúscula para coincidir con la clase
      tableName: "community",
      timestamps: true,
    }
  );

  return User;
};
