const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const cookiemaker = require('./cookiemaker');

const URL = 'mongodb://localhost:27017/vacationsite';
mongoose.connect(URL, {
  useNewUrlParser: true
});
const Vacation = mongoose.model('vacation', new mongoose.Schema({
  destination: String,
  description: String,
  piclink: String,
  following: {
    type: Array(String),
    default: []
  },
  start: String,
  end: String,
  price: Number,
}));


router.get('/', async (_, res) => {
  try {
    const vacations = await Vacation.find().exec();
    vacations.map(vacation => vacation.following.map(follow => cookiemaker.coder(follow)));
    res.send(vacations);
  } catch (e) {
    res.status(400).send(e.message);
  }
});
router.post('/', async (req, res) => {
  const {
    id,
    userid
  } = req.body;
  try {
    const realuser = cookiemaker.decoder(userid);
    const vacation = await Vacation.findOne({
      _id: id
    }).exec();
    if (vacation.following.includes(realuser)) {
      vacation.following = vacation.following.filter(user => user !== realuser);
      vacation.save();
      res.send('removed');
    } else {
      vacation.following.push(realuser);
      vacation.save();
      res.send('added');
    }
  } catch (e) {
    res.send(400).send(e.message);
  }
});

router.post('/new', async (req, res) => {
  const vacation = new Vacation(req.body);
  try {
    await vacation.save();
    res.send('New vacation!');
  } catch (e) {
    res.status(400).send('Not good');
  }
});

router.get('/one/:id', async (req, res) => {
  try {
    const vacation = await Vacation.findOne({
      _id: req.params.id
    }).exec();
    vacations.map(vacation => vacation.following.map(follow => cookiemaker.coder(follow)));
    res.send(vacation);
  } catch (e) {
    res.status(400).send('Not a vacation');
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const vacation = await Vacation.findOneAndDelete({
      _id: req.params.id
    }).exec();
    if (!vacation) {
      res.status(400).send(`Doesn't exist`);
    } else {
      res.send(vacation);
    };
  } catch (e) {
    res.status(400).send(e.message);
  }
});

router.get('/chart', async (_, res) => {
  const vacations = await Vacation.find().exec();
  data = [0];
  names = [''];
  vacations.filter(vacation => vacation.following.length > 0).map(vacation => {
    data.unshift(vacation.following.length);
    names.unshift(vacation.destination);
  });
  res.send({
    data,
    names
  });
});

router.post('/edit/:id', async (req, res) => {
  try {
    const vacation = await Vacation.findOne({
      _id: req.params.id
    });
    keys = [];
    for (key of Object.keys(req.body)) {
      vacation[key] = req.body[key];
      keys.push(key);
    }
    vacation.save();
    res.send({
      updated: keys
    });
  } catch (e) {
    res.status(400).send(e.message);
  }
});

module.exports = router;