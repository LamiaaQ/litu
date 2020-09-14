const mongoose = require('mongoose');
const User = require('../model/users');

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
        new User({
            name:req.body.name,
            age:req.body.age,
            gender:true
        }).save()
        res.locals.redirect = '/users';
        next();
        
    },

    edit:(req,res)=>{
        User.findById({_id:req.params.id}).then(user=>{
            res.locals.user = user;
            res.render('users/edit');
        })
       
    },

    update:(req,res,next)=>{
        User.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            name: req.body.name,
            age: req.body.age
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

    redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if(redirectPath){ res.redirect(redirectPath); 
        }else{ next() }
    }
}