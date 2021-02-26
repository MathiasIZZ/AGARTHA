const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const errorHandler = require('errorhandler')

const routing = require('./routes')


require('./database'); // LIEN VERS LA BDD






app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(morgan('tiny'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routing);

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler());
} else {
    app.use( (err, req, res, next) => {

        const code = err.code || 500;

        res.status(err.code || 500).json({
            code: code,
            message: code === 500 ? null : err.message
        })
    })
}


module.exports = app;
