'use strict';
const Sequelize = require('sequelize');

// CREATE TABLE books (
    //id INTEGER PRIMARY KEY AUTOINCREMENT,
    //title TEXT UNIQUE NOT NULL, 
    //author TEXT NOT NULL, 
    //genre TEXT, 
    //first_published INTEGER)

module.exports = (sequelize) => {
    class Book extends Sequelize.Model {}
    Book.init({
        // Set custom primary key column
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please provide a value for "title"',
                },
                //notEmpty: true,
                notEmpty: {
                    // custom error message
                    msg: 'Please provide a value for "title"',
                }
            },
        },
        author: {
            type: Sequelize.TEXT,
            allowNull: false,
        },
        genre: {
            type: Sequelize.TEXT,
        },
        first_published: {
            type: Sequelize.INTEGER,
        }
    }, { sequelize }); //same as { sequelize: sequelize }
    
    return Book;
};