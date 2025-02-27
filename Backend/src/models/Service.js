// models/Service.js
import { DataTypes } from "sequelize";
import { sequelize } from "../database/index.js"; // your sequelize instance

export const Service = sequelize.define("Service", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    // You can use DataTypes.TEXT if descriptions are long
    type: DataTypes.STRING,
    allowNull: false,
  },
  features: {
    // Store features as JSON string; use getter and setter for conversion
    type: DataTypes.TEXT,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue("features");
      return rawValue ? JSON.parse(rawValue) : [];
    },
    set(value) {
      this.setDataValue("features", JSON.stringify(value));
    },
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  time: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
