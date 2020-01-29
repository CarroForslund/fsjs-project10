const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { Sequelize } = require('sequelize');
const db = require('./db');
const { Book, Patron, Loan } = db.models;

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const loansRouter = require('./routes/loans');
const patronsRouter = require('./routes/patrons');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/loans', loansRouter);
app.use('/patrons', patronsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

// const express = require('express'); 
// const { Sequelize } = require('sequelize');
// const db = require('./db');
// const { Book, Patron, Loan } = db.models;

// //Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//     dialect: 'sqlite',
//     storage: 'db/library.db',
// });

// // async IIFE (Immediately Invoked Function Expression)
// (async () => {
//     try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         const bookById = await Book.findByPk(1);
//         console.log(bookById.toJSON());
//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//         if (error.name === 'SequelizeValidationError') {
//             const errors = error.errors.map(err => err.message);
//             console.error('Validation errors: ', errors);
//         } else {
//             throw error;
//         }
//     }
// })();

// const app = express();

// app.use('/static', express.static('public'));

// app.set('view engine', 'pug');

// const mainRoutes = require('./routes');
// const bookRoutes = require('./routes/books');
// const patronRoutes = require('./routes/patrons');
// const loanRoutes = require('./routes/loans');

// app.use(mainRoutes);
// app.use('/books', bookRoutes);
// app.use('/patrons', patronRoutes);
// app.use('/loans', loanRoutes);

// app.listen(3000, () => console.log('App is running on localhost 3000.'));