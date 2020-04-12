'use strict';
const Sequelize = require('sequelize');

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
            validate: {
                notNull: {
                    msg: 'Please provide a value for "author"',
                },
                notEmpty: {
                    msg: 'Please provide a value for "author"',
                }
            },
        },
        genre: {
            type: Sequelize.TEXT,
        },
        year: {
            type: Sequelize.INTEGER,
        },
        updatedAt: {
            type: Sequelize.DATE,
            allowNull: false,
        }

    },
    { 
        sequelize 
    });
    
    return Book;
};