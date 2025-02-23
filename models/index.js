const { Sequelize, DataTypes } = require('sequelize');
const config = require('../config/config');

const sequelize = new Sequelize(config.development);

sequelize.authenticate()
  .then(() => {
    console.log('Conectado a la base de datos');
  })
  .catch((err) => {
    console.error('No se pudo conectar a la base de datos:', err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Information = require('./information')(sequelize, DataTypes);
db.Category = require('./category')(sequelize, DataTypes);
db.Subcategory = require('./subcategory')(sequelize, DataTypes);
db.InformationSubcategory = require('./informationsubcategory')(sequelize, DataTypes);

db.Category.hasMany(db.Subcategory, {
  foreignKey: 'categoryId',
  as: 'subcategories'
});

db.Subcategory.belongsTo(db.Category, {
  foreignKey: 'categoryId',
  as: 'category'
});

db.Information.belongsToMany(db.Subcategory, {
  through: db.InformationSubcategory,
  foreignKey: 'informationId',
  as: 'subcategories'
});

db.Subcategory.belongsToMany(db.Information, {
  through: db.InformationSubcategory,
  foreignKey: 'subcategoryId',
  as: 'messages'
});

module.exports = db;
