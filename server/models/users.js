var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
	email: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String,
		required: true
	},
	password: String,
	cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Car' }],
	isAdmin: {type: Boolean, default: false}
});

mongoose.model('User', userSchema);