require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const passport = require('passport');
const express = require('express');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const User = require('./models/User');
require('./config/passport')(passport);
const { checkAuthenticated, checkNotAuthenticated } = require('./config/auth');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
.then(app.listen(process.env.PORT))
.catch(err => console.log(err));

app.get('/', checkNotAuthenticated, (req, res) => {
    res.render('login', { gender: '' });
});
app.get('/dashboard', checkAuthenticated, (req, res) => {
    res.render('dashboard', { name: req.user.firstName });
});
app.post('/', (req, res) => {
    const { firstName, lastName, email, password, gender } = req.body;

    User.findOne({ email })
    .then(user => {
        if(user) {
            res.render('login', { firstName, lastName, email, password, gender, 
                show: 'show', opacity: 'opacity', bgColor: 'bgColor', border: 'add-border' });
        } else {
            const newUser = new User({ firstName, lastName, email, password, gender });
            bcrypt.genSalt(10, (err, salt) => 
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err;
                    newUser.password = hash;

                    newUser.save()
                    .then(res.redirect('/'))
                    .catch(err => console.log(err));
            }));
        }
    })
});
app.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err) console.log(err);
        if(!user) {
            req.flash('error', info.message);
            return res.render('login', { gender: '', email: req.body.email });
        };
        
        req.logIn(user, (err) => {
            if(err) console.log(err);
            return res.redirect('/dashboard');
        }); 
    })(req, res, next);
});
app.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});