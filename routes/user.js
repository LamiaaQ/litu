const router = require('express').Router();
const UserController = require('../controller/user');


router.get('/',UserController.index,UserController.indexView);

module.exports= router;