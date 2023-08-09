// const db = require('../database/database');
const Appointment = require('../models/appointement');
module.exports.postAppointment = (req, res) => {
  const { name, email, phone } = req.body;
  const appointment = { name, email, phone };
  Appointment.create({
    name: name,
    email: email,
    phone: phone,
  })
    .then((result) => {
      res.json({ id: result.insertId, ...appointment });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getAppointments = (req, res) => {
  Appointment.findAll().then((result) => {
    res.json(result);
  });
};

module.exports.deleteAppointment = (req, res) => {
  const appointmentId = req.params.id;

  Appointment.destroy({where:{id:appointmentId}});
};
