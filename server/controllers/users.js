var mongoose = require('mongoose');
var User = mongoose.model('User');
var Car = mongoose.model('Car');

module.exports.createUser = function(req, res) {
	var name = req.body.name;
	var email = req.body.email;
	var password = req.body.password;

	User.create({
		name: name,
		email: email,
		password: password
	}, function(err, user) {
		if (err) {
			console.log('Error');
			res.redirect('http://localhost:3000');
		} else {
			console.log(user);
			req.session.user = user;
			res.redirect('http://localhost:3000');
		}
	})
}

module.exports.loginUser = function(req, res) {
	email = req.body.email;
	password = req.body.password;
	User.findOne({email: email}, function(err, user) {
		if (user && user.password == password) {
			req.session.user = user;
			console.log(user);
			res.redirect('http://localhost:3000'); 
		} else {	
			console.log('No user exists.');
			res.redirect('http://localhost:3000/users/login');
		}
	})
}

module.exports.signoutUser = function(req, res) {
	req.session.destroy(function(err) {
		res.redirect('http://localhost:3000');
	})
}

module.exports.addCar = function(req, res) {
	User.findById(req.params.userid, function(err, user) {
		Car.findById(req.params.carid, function(err, car) {
			car.isAvailable = false;
			car.bookingDate = new Date();
			car.save(function(err, car) {
				user.cars.push(car);
				user.save(function(err, user) {
					res.redirect('http://localhost:3000');
				})
			})
		})
	})
}

module.exports.listCars = function(req, res) {
	User.findById(req.params.userid, function(err, user) {
		Car.find({_id : user.cars}, function(err, cars) {
			res.render('userCars', {user: user, cars: cars, title: 'Booked Cars'});
		})	
	})
}