const mongoose = require('mongoose');
const Program = require('../model/programs');

module.exports={
    index: (req,res,next)=>{
        Program.find({}).then((programs)=>{

            res.locals.programs = programs;
             next();

        }).catch((error)=>{

            console.log(error);
        })
    },

    indexView:(req,res)=>{
        res.render('programs/index');
    },

    new: (req,res)=>{
        res.render('programs/new');
    },
    
    create:(req,res,next)=>{
        new Program({
            title:req.body.title,
            description:req.body.description
        }).save()
        res.locals.redirect = '/programs';
        next();
        
    },

    edit:(req,res)=>{
        Program.findById({_id:req.params.id}).then(program=>{
            res.locals.program = program;
            res.render('programs/edit');
        })
       
    },

    update:(req,res,next)=>{
        Program.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            title: req.body.title,
            description: req.body.description
        }).then(
            ()=>{
              res.locals.redirect = '/programs';
              next();  
            }
        ).catch(error=>{
            console.log('Error Occured In Updating a program info:'+error);
        })
    },

    show:(req,res)=>{
        Program.findById({_id:req.params.id}).then(program=>{
            res.locals.program = program;
            res.render('programs/show');
        })
    },
    delete: (req,res,next)=>{
        //console.log('delete Method');
        Program.deleteOne({_id: req.params.id},function(err){
            if (err){ 
                console.log(err) 
            } 
            else{ 
                console.log("program has been Deleted "); 
                req.flash('error','تم حذف البرنامج')
            } 
            res.locals.redirect='/programs';
             next();
        });     
    },

    redirectView:(req,res,next)=>{
        let redirectPath = res.locals.redirect;
        if(redirectPath){ res.redirect(redirectPath); 
        }else{ next() }
    }
}