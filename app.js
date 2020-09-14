const express = require('express');
const layouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const connectflash = require('connect-flash');
const router = require('./routes/index');
const User = require('./model/users');

/* express */
app = express(); 
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/lito',{
    useNewUrlParser:true,
    useUnifiedTopology: true
});

app.set('port',process.env.process||3000);
app.set('view engine','ejs');
app.use(layouts);
/*app.use(express.static('public'));*/

app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.use(cookieParser('leave it to us'))
app.use(expressSession ({secret: 'leave it to us'}))


/* Passport */
app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(connectflash());

app.use((req , res , next) => {
    res.locals.flashMessages= req.flash(); 
    res.locals.loggedIn = req.isAuthenticated();
    res.locals.currentUser= req.user;
    next();
})

app.use((req,res,next)=>{
    if(req.session.user){
        console.log(req.session.user)
    }
    next()
})
app.use(methodOverride('_method',{methods:['POST','GET']}));

app.use('/',router);


app.listen(app.get('port'),()=>{ 
      console.log('express has started..!');
});
