const { engine } = require('express-handlebars');
const path = require('path');

const configViewEngine = (app) => {
    app.engine('hbs', engine({extname: ".hbs"}));
    app.set('view engine', 'hbs');
    app.set('views',path.join('./src','views'));
}

module.exports = configViewEngine;