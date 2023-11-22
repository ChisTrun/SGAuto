const express = require('express');
const path = require('path');
const configViewEngine = require('./configs/viewEngine');
const configStaticResource = require('./configs/staticResrouce');
const webRouter = require('./routes/web.r');
const { NotFound, errHandling } = require('./middlewares/errorsHandlingMW')
const db = require('./database/db');
const passport = require('passport');
const authRouter = require('./routes/auth.r');
const session = require('express-session');
require('dotenv').config();

const app = express();
const port = process.env.PORT;

configViewEngine(app);
configStaticResource(app);

app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: `${process.env.secret}`,
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(webRouter);
app.use(authRouter);


// app.use(NotFound);
// app.use(errHandling);

app.listen(port, () => { console.log(`Server is listening on port number ${port}`) })
