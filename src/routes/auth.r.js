const passport = require('passport');
const LocalStrategy = require('passport-local');
const express = require('express');
const User = require('../models/user.m');

const router = express.Router();

passport.serializeUser((user, done) => {
    done(null, user);
})
passport.deserializeUser((user, done) => {
    if (user.role == 'admin') {
        User.findAdmin(user.username, user.password, (err, result) => {
            if (err) {
                done(err);
            } else {
                done(null, result[0]);
            }
        })
    } else if (user.role == 'user') {
        User.findUser(user.username, user.password, (err, result) => {
            if (err) {
                done(err);
            } else {
                done(null, result[0]);
            }
        })
    }
});


passport.use('user-login', new LocalStrategy(
    async function (username, password, done) {
        await User.findUser(username, password, (err, result) => {
            if (err) {
                done(err);
            } else {
                done(null, result[0]);
            }
        });
    }
))
passport.use('admin-login', new LocalStrategy(
    async function (username, password, done) {
        await User.findAdmin(username, password, (err, result) => {
            if (err) {
                done(err);
            } else {
                done(null, result[0]);
            }
        });
    }
))


router.post('/login/user',
    passport.authenticate('user-login', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/');
});

router.post('/login/admin',
    passport.authenticate('admin-login', { failureRedirect: '/login' }),
    function (req, res) {
        res.redirect('/admin')
    });

router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

module.exports = router;