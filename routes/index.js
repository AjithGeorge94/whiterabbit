//Routing entry point
var express = require('express');
var router = express.Router();

var user_controller = require('../controllers/userController');

const { emailValidator } = require('../middlewares/emailValidator')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WhiteRabbit UserForm' });
});

// GET request for list of all Users.
router.get('/users', user_controller.user_get);

// Post request for creating users.
router.post('/create', emailValidator, user_controller.user_create);

// Post request for details of particular user.
router.post('/userDetails', user_controller.user_details_get);

// Post request for details of particular user.
router.get('/userdetes/:id', user_controller.user_data_get);


module.exports = router;
