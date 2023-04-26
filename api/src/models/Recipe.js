const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "recipe",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      resumenPlato: {
        type: DataTypes.STRING,
      },
      nivelSaludable: {
        type: DataTypes.INTEGER,
        validate: {
          isNumeric: true,
          max: 100,
        },
      },
      pasoApaso: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      imagen: {
        type: DataTypes.STRING,
        // validate:{

        // }
      },
      create: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
