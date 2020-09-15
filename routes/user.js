const router = require('express').Router();
const { body } = require('express-validator');
const UserController = require('../controller/user');

/* show all users */
router.get('/',UserController.restrictDev,UserController.index,UserController.indexView);

/* insert user */
router.get('/new',UserController.new);
router.post('/create',[body('name').isLength({min:2,max:25})],UserController.validator,UserController.create,UserController.redirectView);

/* login */
router.get('/login', UserController.login);
router.post('/login', UserController.authenticate);

/* logout */
router.get('/logout', UserController.logout,UserController.redirectView);

/* updating user info */
router.get('/:id/edit',UserController.edit);
router.put('/:id/update',UserController.inputValidation,UserController.validator,UserController.update,UserController.redirectView);

/* deleting user */
router.delete('/:id/delete',UserController.delete,UserController.redirectView)

module.exports= router;