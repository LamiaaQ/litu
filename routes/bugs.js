const router = require('express').Router();
const BugController = require('../controller/bug');
const UserController = require('../controller/user');
const ProgramController = require('../controller/program');

/* show all bugs */
router.get('/',UserController.restrictDev,BugController.index,BugController.indexView);

/* insert bug */
router.get('/new',UserController.isAuth,ProgramController.index,BugController.new);
router.post('/create',UserController.isAuth,BugController.create,BugController.redirectView);

/* updating bug info */
router.get('/:id/edit',BugController.edit);
router.put('/:id/update',BugController.update,BugController.redirectView);

/* show bug report*/
router.get('/:id/show',BugController.show);

/* closing a bug report*/
router.get('/:id/close',BugController.closeBug,BugController.redirectView);
/* assigning a bug */
router.get('/:id/assign',BugController.assignBug,BugController.redirectView);

/* search for a bug */
router.get('/search',BugController.search);
router.post('/search',BugController.search);

/* filter bugs*/ //why order matters??
router.get('/:status',UserController.restrictDev,BugController.showfilteredBugs,BugController.indexView);

/* search for bug assigned to the dev*/
router.get('/assigned',UserController.restrictDev,BugController.assignedToMe,BugController.indexView);

/*  find bug issued by specific user*/
router.get('/issuedBy/:id',UserController.restrictDev,BugController.issuedBy,BugController.indexView);

/* deleting bug */
router.delete('/:id/delete',BugController.delete,BugController.redirectView);

module.exports= router;