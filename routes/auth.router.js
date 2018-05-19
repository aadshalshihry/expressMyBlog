// const express = require('express');
// const router = express.Router();
// const passport = require('passport');

const router = (app, passport) => {

    /**
     * Render login pange
     */
    app.get('/login', isUserNotLoggedIn, function(req, res) {
        res.render('login', {
            title: 'Log-in',
            message: req.flash('loginMessage'),
            currentPage: "login"
        });
    });

    /**
     * process login method
     */
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    }));

    /**
     * Render signup page
     */
    app.get('/signup', isUserNotLoggedIn, function(req, res) {
        res.render('signup', {
            title: 'Sign-up',
            message: req.flash('signupMessage'),
            currentPage: "signup"
        });
    });

    /**
     * Process signup method
     */
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    /**
     * signout
     */
    app.get('/signout', isUserLoggedIn, (req, res) => {
        req.logout();
        res.redirect('/');
    });
};

export const isUserLoggedIn = (req, res, next) => {
    if(!req.session.passport.user){
        res.redirect('/');
    } else {
        next();
    }
};

export const isUserNotLoggedIn = (req, res, next) => {
    if(req.session.passport && req.session.passport.user){
        res.redirect('/');
    } else {
        next();
    }
};

export default router;