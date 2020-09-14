const mongoose = require('mongoose');
const Bug = require('../model/bug');

module.exports={
    index: (req,res,next)=>{
        Bug.find({}).then((bugs)=>{

            res.locals.bugs = bugs;
             next();

        }).catch((error)=>{

            console.log(error);
        })
    },

    indexView:(req,res)=>{
        res.render('bugs/index');
        //res.send('hi users');
    },

    new: (req,res)=>{
        res.render('bugs/new');
    },
    
    create:(req,res,next)=>{
        new Bug({
            title:req.body.title,
            description:req.body.description,
            image:req.body.image,
            priority:req.body.priority,
            status:req.body.status,
            themeId:mongoose.Types.ObjectId(req.body.themeId)
        }).save()
        res.locals.redirect = '/bugs';
        next();
        
    },

    edit:(req,res)=>{
        Bug.findById({_id:req.params.id}).then(bug=>{
            res.locals.bug = bug;
            res.render('bugs/edit');
        })
       
    },

    update:(req,res,next)=>{
        Bug.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            title: req.body.title,
            description: req.body.description,
            priority:req.body.priority,
        }).then(
            ()=>{
              res.locals.redirect = '/bugs';
              next();  
            }
        ).catch(error=>{
            console.log('Error Occured In Updating a bug info:'+error);
        })
    },

    delete: (req,res,next)=>{
        //console.log('delete Method');
        Bug.deleteOne({_id: req.params.id},function(err){
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("Bug has been Deleted "); 
                req.flash('error','تم حذف المشكلة')
            } 
            res.locals.redirect='/bugs';
             next();
        });     
    },

    redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if(redirectPath){ res.redirect(redirectPath); 
        }else{ next() }
    }
}