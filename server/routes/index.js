var express = require('express');
var router = express.Router();
var userController = require('../controllers/users');
var carController = require('../controllers/cars');
var mongoose = require('mongoose');
var Car = mongoose.model('Car');
//var Car = require('./server/models/cars');
var methodOverride = require('method-override') // use this module to update car using put req
//use methodOverride() because most of the browser dont support put() and delete() method as we need put() to update user record

router.use(methodOverride('X-HTTP-Method-Override'));

/* GET home page. */
router.get('/',  carController.list);

router.get('/users/signup', function(req, res) {
	res.render('signup', {title: 'New User'})
})

router.get('/users/login', function(req, res) {
	res.render('login', {title: 'User login'})
})

router.get('/cars/new', function(req, res) {
	res.render('car', {title: 'New Car'})
})

router.get('/users/signout', userController.signoutUser);

router.get('/user/:userid/listcars', userController.listCars);

router.post('/users/signup', userController.createUser);
router.post('/users/login', userController.loginUser);
router.post('/cars/new', carController.createCar);
router.get('/user/:userid/car/:carid', userController.addCar);

// Update on clicking must render the template file editCars.js
router.get('/cars/edit/:carid', function(req, res){
	res.render('editCars', {Car: req.carId}); // copied
});
// in update method // 1st para is the Objid // 2nd para is everything you want to update // 3rd an err callback function
router.put('/cars/edit/:carid' , function(req, res){
	Car.update({_id: req.params.id}, 
	
				{
						name : req.body.name,
						type : req.body.type,
						seats : req.body.seats
				}, function(err){
					if(err) res.joson(err);
					else res.redirect('/'); // usi page meh redirect kr taki we can see the updated values
				});
			
});

// The below param router fetches all the user in the db and asigned to it req.carId
router.param('carid', function(req, res, next, id){
	Car.findById(id, function(err, docs){
		if(err) res.joson(err);
		else
		{
			req.carId = docs; // copy all the results to the Car object
			next();
		}
	});
});

// delete car
router.get('/cars/delete/:id', function(req, res){
	Car.remove({_id:req.params.id}, function(err){
		if(err) res.joson(err);
		else res.redirect('/');
	})
})

// catch 404 and forward to error handler
router.use(function(req, res, next) {
  next(createError(404));
});

// error handler
router.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = router;
