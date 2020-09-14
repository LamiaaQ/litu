const router = require('express').Router();
const BugController = require('../controller/bug');

/* show all bugs */
router.get('/',BugController.index,BugController.indexView);

/* insert bug */
router.get('/new',BugController.new);
router.post('/create',BugController.create,BugController.redirectView);

/* updating bug info */
router.get('/:id/edit',BugController.edit);
router.put('/:id/update',BugController.update,BugController.redirectView);

/* show bug report*/
router.get('/:id/show',BugController.show);

/* search for a bug */
/*
router.get('/search',BugController.search);
router.post('/search',BugController.search);
*/



/* deleting bug */
router.delete('/:id/delete',BugController.delete,BugController.redirectView);

module.exports= router;