const router = require('express').Router();
const ProgramController = require('../controller/program');

/* show all programs */
router.get('/',ProgramController.index,ProgramController.indexView);

/* insert program */
router.get('/new',ProgramController.new);
router.post('/create',ProgramController.create,ProgramController.redirectView);

/* updating program info */
router.get('/:id/edit',ProgramController.edit);
router.put('/:id/update',ProgramController.update,ProgramController.redirectView);

/* show program info*/
router.get('/:id/show',ProgramController.show);

/* deleting program */
router.delete('/:id/delete',ProgramController.delete,ProgramController.redirectView);

module.exports= router;