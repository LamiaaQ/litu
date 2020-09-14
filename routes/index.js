const router = require('express').Router();
const UserRoutes = require('./user');
/*const DevRoutes = require('./dev');*/


router.use('/users', UserRoutes);
/*router.use('/dev', DevRoutes);*/


module.exports = router;