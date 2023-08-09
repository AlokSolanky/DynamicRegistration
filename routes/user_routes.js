const express = require('express');
const user = require('../controllers/users');

const router = express.Router();

router.get('/api/appointments',user.getAppointments);

router.post("/api/appointments", user.postAppointment);

router.delete(`/api/appointments/:id`, user.deleteAppointment);

module.exports = router;