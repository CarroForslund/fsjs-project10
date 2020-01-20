const express = require('express'); 
const { Sequelize } = require('sequelize');
const db = require('./db');
const { Book, Patron, Loan } = db.models;

//Passing parameters separately (sqlite)
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'db/library.db'
});

// async IIFE (Immediately Invoked Function Expression)
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        const bookById = await Book.findByPk(1);
        console.log(bookById.toJSON());
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            console.error('Validation errors: ', errors);
        } else {
            throw error;
        }
    }
})();

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

const mainRoutes = require('./routes');
const bookRoutes = require('./routes/books');
const patronRoutes = require('./routes/patrons');
const loanRoutes = require('./routes/loans');

app.use(mainRoutes);
app.use('/books', bookRoutes);
app.use('/patrons', patronRoutes);
app.use('/loans', loanRoutes);

app.listen(3000, () => console.log('App is running on localhost 3000.'));