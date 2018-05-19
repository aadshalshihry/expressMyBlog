const LocalStrategy = require('passport-local').Strategy;
import User from './models/user.model';


const passportConfig = (passport) => {

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            const {id, name, username, email} = user;
            const result = {id, name, username, email};
            done(err, result);
        });
    });

    localLogin(passport);
    localSignup(passport);

};

const localLogin = (passport) => {
    passport.use('local-login', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, password, done) => {
        process.nextTick(() => {
            User.findOne({'username': username}, (err, user) => {
                if(err) return done(err);
                if(!user) return done(null, false, req.flash('loginMessage', 'Username is not exists!!'));
                if(!user.isValidPassword(password))
                    return done(null, false, req.flash('loginMessage', 'password is not correct'));
                return done(null, user);
            });
        });
    }));
};

const localSignup = (passport) => {
    passport.use('local-signup', new LocalStrategy({
        passReqToCallback: true
    }, (req, username, passport, done) => {
        process.nextTick(() => {
            User.findOne({username}, (err, user) => {
                if(err) return done(err);
                else if(user) return done(null, false, req.flash('signupMessage', 'User exist'));
                else {
                    const {name, username, email} = req.body;
                    const newUser = new User({name, username, email});
                    newUser.setPassword(req.body.password);
                    newUser.save((err) => {
                        if(err) throw err;
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
};

export default passportConfig;