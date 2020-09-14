const router = require('express').Router();
const BugController = require('../controller/bug');
const UserController = require('../controller/user');
const ProgramController = require('../controller/program');

/* show all bugs */
router.get('/',UserController.restrictDev,BugController.index,BugController.indexView);

/* insert bug */
router.get('/new',UserController.restrictDev,ProgramController.index,BugController.new);
router.post('/create',UserController.restrictDev,BugController.create,BugController.redirectView);

/* updating bug info */
router.get('/:id/edit',BugController.edit);
router.put('/:id/update',BugController.update,BugController.redirectView);

/* show bug report*/
router.get('/:id/show',BugController.show);

/* search for a bug */
router.get('/search',BugController.search);
router.post('/search',BugController.search);




/* deleting bug */
router.delete('/:id/delete',BugController.delete,BugController.redirectView);

module.exports= router;