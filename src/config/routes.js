const controller = require('./../controller');

const validate = require('./../middleware/validate');

router.get('/createnewuser', [validate], controller.userRoute.createUser);

module.exports = router;