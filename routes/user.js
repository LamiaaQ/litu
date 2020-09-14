const router = require('express').Router();
const UserController = require('../controller/user');

/* show all users */
router.get('/',UserController.restrictDev,UserController.index,UserController.indexView);

/* insert user */
router.get('/new',UserController.new);
router.post('/create',UserController.create,UserController.redirectView);

/* login */
router.get('/login', UserController.login);
router.post('/login', UserController.authenticate);

/* updating user info */
router.get('/:id/edit',UserController.edit);
router.put('/:id/update',UserController.update,UserController.redirectView);

/* deleting user */
router.delete('/:id/delete',UserController.delete,UserController.redirectView)

module.exports= router;