const router = require('express').Router();
const UserRoutes = require('./user');



router.use('/users', UserRoutes);



module.exports = router;