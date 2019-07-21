var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const cookiemaker = require('./cookiemaker');

const URL = 'mongodb://localhost:27017/vacationsite';
mongoose.connect(URL, {
	useNewUrlParser: true
});
const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true
	},
	lastname: {
		type: String,
		trim: true
	},
	username: {
		type: String,
		trim: true,
		required: true
	},
	password: {
		type: String,
		trim: true,
		required: true
	},
	isadmin: {
		type: Boolean
	},
});
const User = mongoose.model('users', userSchema);

router.get('/', async (_, res) => {
	const users = await User.find().exec();
	res.send(users);
});
router.post('/login', async (req, res) => {
	const {
		username,
		password
	} = req.body;
	const user = await User.findOne({
		username,
		password
	}).exec();
	res.send({
		name: user.name,
		id: cookiemaker.coder(user._id.toString()),
		isadmin: user.isadmin
	});
});
router.post('/logbackin', async (req, res) => {
	try {
		const {
			id
		} = req.body;
		const users = await User.find().exec();
		const user = users.filter(currentUser => {
			if (currentUser._id.toString() === cookiemaker.decoder(id)) {
				return currentUser;
			}
		})[0]
		res.send({
			name: user.name,
			isadmin: user.isadmin
		});
	} catch (e) {
		res.status(400).send(e.message);
	}
});
router.post('/new', async (req, res) => {
	const {
		name,
		username,
		lastname,
		password
	} = req.body;
	const user = new User({
		name,
		lastname,
		username,
		password,
		isadmin: false
	});
	const validation = user.validateSync();
	try {
		await user.save();
		res.send(`You're in!`);

	} catch (e) {
		res.status(400).send(e.message);
	}
});


module.exports = router;