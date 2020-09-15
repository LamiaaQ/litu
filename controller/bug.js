const mongoose = require('mongoose');
const Bug = require('../model/bug');
// const program = require('./program');
// const user = require('./user');

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
            status:'open',
            issuedUserId:mongoose.Types.ObjectId(req.user._id),
            programId:mongoose.Types.ObjectId(req.body.project)
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
            priority:req.body.priority
        }).then(
            ()=>{
              res.locals.redirect = '/bugs';
              next();  
            }
        ).catch(error=>{
            console.log('Error Occured In Updating a bug info:'+error);
        })
    },

    show:(req,res)=>{
        Bug.findById({_id:req.params.id}).populate('issuedUserId').exec(function(err,bug){
            if(err){
                console.log(`error in show bug function: ${err}`);
            }else{
                res.locals.bug = bug;
                res.render('bugs/show');
            };
        })
    },
    closeBug:(req,res,next)=>{

        Bug.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            status: 'closed',
            devId: req.user._id,
            closedDate: new Date()
        }).then(
            ()=>{
                req.flash('success','تم إغلاق المشكلة بنجاح')
                res.locals.redirect ='/bugs';
              next();  
            }
        ).catch(error=>{
            console.log(`Error Occured In assigned bug: ${error}`);
        })
    },

    assignBug:(req,res,next)=>{

        Bug.updateOne({_id: mongoose.Types.ObjectId(req.params.id)},{
            status: 'assigned',
            devId: req.user._id
        }).then(
            ()=>{
                req.flash('success','تم حجز المشكلة بنجاح')
                res.locals.redirect ='/bugs';
              next();  
            }
        ).catch(error=>{
            console.log('Error Occured In closing a bug:'+error);
        })
    },

    searchForm:(req,res)=>{
            res.render('bugs/search');
    },
    search:(req,res)=>{
        Bug.find({title:req.body.title}).then((bugs)=>{
            res.locals.bugs = bugs;
            res.render('bugs/search');
        }).catch((error)=>{
            console.log(error);
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