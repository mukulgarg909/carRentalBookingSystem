var mongoose = require('mongoose');
var Car = mongoose.model('Car');// car model sy car structure
// es file sy available cars show hori hai @user login
module.exports.createCar = function(req, res) {
	var name = req.body.name;
	var type = req.body.type;
	var seats = req.body.seats;

	Car.create({
		name: name,
		type: type,
		seats: seats
	}, function(err, data) {
		if (err) {
			console.log('Error');
			res.redirect('http://localhost:3000');
		} else {
			console.log(data);
			res.redirect('http://localhost:3000');
		}
	})
}

module.exports.list = function(req , res) {
	if (req.session.user) {
		Car.find({}, function(err, cars) {
			res.render('index', {title: 'Available Car List', cars: cars, user: req.session.user});
  		});
	} else {
		res.redirect('http://localhost:3000/users/login');
	} 
} 

// module.exports.editCar = function(req, res) {
// 	Car.findOne({'_id': req.params.carid}, function(err, car) { console.log(car);
// 		res.render('editCar', {title: 'Edit Car', car: car});
// 	})
// }

// module.exports.updateCar = function(req, res) {
// 	var name = req.body.name;
// 	var type = req.body.type;
// 	var seats = req.body.seats;

// 	Car.findOne({'_id': req.params.carid}, function(err, car) {
// 		car.name = name;
// 		car.type = type;
// 		car.seats = seats;

// 		car.save(function(err) {
// 			if(err) {
// 				console.log(err);
// 			} else {
// 				res.redirect('http://localhost:3000');
// 			}
// 		})
// 	})
// }