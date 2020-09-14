const mongoose = require('mongoose');
const User = require('../model/users');
const passport = require('passport');

module.exports={
    index: (req,res,next)=>{
        User.find({}).then((users)=>{
            res.locals.users = users;
             next();

        }).catch((error)=>{
            console.log(error);
        })
    },

    indexView:(req,res)=>{
        res.render('users/index');
        //res.send('hi users');
    },

    new: (req,res)=>{
        res.render('users/new');
    },
    
    create:(req,res,next)=>{
        let newUser=new User({
            name:req.body.name,
            DOB:req.body.DOB,
            email:req.body.email,
            gender:true /* must be changed */
        })

        User.register(newUser, req.body.password, (error, user) =>{
    
            if(user){
                req.flash('success', 'تم حفظ البيانات بنجاح');
                res.locals.redirect = '/users'; 
            }else{
                console.log(error)
                req.flash('error', `الرجاء التحقق من البيانات`);
                res.locals.redirect = '/users/new';  
            }
            next()
        });  
    },
    login:(req, res, next) =>{
        res.render('users/login');
    },
    authenticate: passport.authenticate('local',{
        failureRedirect: '/users/login',
        failureFlash: 'الرجاء التحقق من بيانات الدخول',
        successRedirect: '/users',
        successFlash: 'تم تسجيل الدخول بنجاح'
    }),

    edit:(req,res)=>{
        User.findById({_id:req.params.id}).then(user=>{
            res.locals.user = user;
            res.render('users/edit');
        })  
    },

    update:(req,res,next)=>{
        User.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            name: req.body.name,
            email: req.body.email,
            DOB:req.body.DOB,
        }).then(
            ()=>{
              res.locals.redirect = '/users';
              next();  
            }
        ).catch(error=>{
            console.log('Error Occured');
        })
    },

    delete: (req,res,next)=>{
        //console.log('delete Method');
        User.deleteOne({_id: req.params.id},function(err){
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("User has been Deleted "); 
                req.flash('error','user has been deleted')
            } 
            res.locals.redirect='/users';
             next();
        });     
    },
    
    logout: (req, res, next) =>{
        req.logout();
        req.flash('success', 'تم تسجيل الخروج بنجاح');
        res.locals.redirect = '/bugs';
        next();
    },
    restrictDev: (req, res, next) =>{
        if (req.isAuthenticated() && req.user.isDev) {
            next();
        }else if (req.isAuthenticated() && !req.user.isDev) {
            res.send('you are registered but not a developer')
        }else{
            req.flash('loginerror', 'عذراً! يجب أن تكون مطور للدخول الى الصفحة');
            res.render('users/login');
        }
    },

    redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if(redirectPath){ res.redirect(redirectPath); 
        }else{ next() }
    }
}