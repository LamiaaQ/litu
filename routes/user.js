const router = require('express').Router();
const { body } = require('express-validator');
const UserController = require('../controller/user');

/* show all users */
router.get('/',UserController.restrictDev,UserController.index,UserController.indexView);

/* insert user */
router.get('/new',UserController.new);
router.post('/create',[body('name').isLength({min:2,max:25}),body('password').isLength({min:6}),body('department').notEmpty()],UserController.validator,UserController.create,UserController.redirectView);

/* login */
router.get('/login', UserController.login);
router.post('/login', UserController.authenticate);

/* logout */
router.get('/logout', UserController.logout,UserController.redirectView);

/* show logged in user info */
router.get('/show',UserController.profile);

/* updating user info */
router.get('/:id/edit',UserController.edit);
router.put('/:id/update',[body('name').isLength({min:2,max:25})
,body('email').isEmail()
],UserController.validator,UserController.update,UserController.redirectView);

/* deleting user */
router.delete('/:id/delete',UserController.delete,UserController.redirectView)

module.exports= router;