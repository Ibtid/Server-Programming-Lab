const MathOlympiad = require('../models/MathOlympiad.model');

const getMO = (req, res) => {
  res.render('math-olympiad/register.ejs', { error: req.flash('error') });
};

const postMO = (req, res) => {
  const { name, category, contact, email, institution, tshirt } = req.body;
  console.log(name);
  console.log(category);
  console.log(contact);
  console.log(email);
  console.log(institution);
  console.log(tshirt);

  let registrationFee = 0;
  if (category == 'School') {
    registrationFee = 250;
  } else if (category == 'College') {
    registrationFee = 400;
  } else {
    registrationFee = 500;
  }

  const total = registrationFee;
  const paid = 0;
  const selected = false;

  MathOlympiad.findOne({ name: name, contact: contact }).then((participant) => {
    if (participant) {
      error = 'Participant with this name and contact already exists';
      console.log(error);
      req.flash('error', error);
      res.redirect('/MathOlympiad/register');
    } else {
      const participant = new MathOlympiad({
        name,
        contact,
        category,
        email,
        institution,
        paid,
        total,
        selected,
        tshirt,
      });
      participant
        .save()
        .then(() => {
          error = 'Parcitipant has been registered successfully';
          console.log(error);
          req.flash('error', error);
          res.redirect('/MathOlympiad/register');
        })
        .catch(() => {
          error = 'An unknown error occurred';
          console.log(error);
          req.flash('error', error);
          res.redirect('/MathOlympiad/register');
        });
    }
  });
};

const getMOList = (req, res) => {
  let all_participant = [];
  let error = '';
  MathOlympiad.find()
    .then((data) => {
      all_participant = data;
      res.render('math-olympiad/list.ejs', {
        error: req.flash('error'),
        participants: all_participant,
      });
    })
    .catch(() => {
      error = 'Failed to fetch data!';
      res.render('math-olympiad/list.ejs', {
        error: req.flash('error', error),
        participants: all_participant,
      });
    });
};

const deleteMO = (req, res) => {
  let error = '';
  const id = req.params.id;

  MathOlympiad.deleteOne({ _id: req.params.id })
    .then(() => {
      let error = 'Data has been deleted successfully';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    })
    .catch(() => {
      let error = 'Failed to delete data';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    });
};

const paymentDoneMO = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.paid = participant.total;
      participant
        .save()
        .then(() => {
          let error = 'Payment completed successfully';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        })
        .catch(() => {
          let error = 'Data could not be updated';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        });
    })
    .catch(() => {
      let error = 'Data could not be updataed';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    });
};

const selectMO = (req, res) => {
  const id = req.params.id;

  MathOlympiad.findOne({ _id: id })
    .then((participant) => {
      participant.selected = true;
      participant
        .save()
        .then(() => {
          let error = 'Participant has been selected successfully';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        })
        .catch(() => {
          let error = 'Data could not be updated';
          req.flash('error', error);
          res.redirect('/MathOlympiad/list');
        });
    })
    .catch(() => {
      let error = 'Data could not be updataed';
      req.flash('error', error);
      res.redirect('/MathOlympiad/list');
    });
};

module.exports = {
  getMO,
  postMO,
  getMOList,
  deleteMO,
  paymentDoneMO,
  selectMO,
};