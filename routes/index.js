const router = require('express').Router();
const UserRoutes = require('./user');
const BugRoutes = require('./bugs');


router.use('/users', UserRoutes);
router.use('/bugs', BugRoutes);


module.exports = router;