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

/* deleting bug */
router.delete('/:id/delete',BugController.delete,BugController.redirectView)

module.exports= router;