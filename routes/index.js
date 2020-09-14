const router = require('express').Router();
const UserRoutes = require('./user');
const BugRoutes = require('./bugs');
const ProgramRoutes = require('./programs');


router.use('/users', UserRoutes);
router.use('/bugs', BugRoutes);
router.use('/programs', ProgramRoutes);


module.exports = router;