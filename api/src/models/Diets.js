const sequelize = require('sequelize');
const { DataTypes, UUID, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("diet", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {timestamps: false})
}