var mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
	name: String,
	type: String,
	seats: Number,
	bookingDate: Date,
	isAvailable: {type: Boolean, default: true},
})

mongoose.model('Car', carSchema);
//let Car = module.exports=mongoose.model('Car', carSchema);
// a.col-sm-offset-1.btn.btn-default.delete-car(href="#", data-id=car._id) Delete