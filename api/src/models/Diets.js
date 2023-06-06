const sequelize = require('sequelize');
const { DataTypes, UUID, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define("diet", {
        id: {
            type: DataTypes.UUID,
            defaultValue: UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {timestamps: false})
}