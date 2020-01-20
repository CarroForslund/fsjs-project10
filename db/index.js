const { Sequelize } = require('sequelize');

//Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/library.db'
});

// ?
const db = {
    sequelize,
    Sequelize,
    models: {},
}

//import models
db.models.Book = require('./models/book.js')(sequelize);

module.exports = db;