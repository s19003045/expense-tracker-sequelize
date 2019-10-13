'use strict';
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define('Record', {
    name: DataTypes.STRING,
    category: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    unitPrice: DataTypes.INTEGER,
    merchant: DataTypes.STRING,
    date: DataTypes.DATE,
    itemTotalPrice: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
      // get() {
      //   const unitPrice = this.getDataValue('unitPrice');
      //   const amount = this.getDataValue('amount')
      //   return unitPrice * amount
      // },
    }
  }, {
    hooks: {
      beforeSave: (record) => {
        console.log('success!!!!!!!!!!!!!!')
        record.itemTotalPrice = record.unitPrice * record.amount
      }
    }
  });

  Record.associate = function (models) {
    Record.belongsTo(models.User)
  };
  return Record;
};
