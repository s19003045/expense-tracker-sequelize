'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    merchant: DataTypes.STRING,
    date: DataTypes.DATE
  }, {});
  Record.associate = function (models) {
    Record.belongsTo(models.User)
  };
  return Record;
};
