const express = require('express');
const multer = require('multer');
const uploadConfig = require('./config/upload');
const SessionController = require('./controllers/Sessioncontroller');
const SpotsController = require('./controllers/SpotsController');
const DashboardController = require('./controllers/DashboardController');
const bookingController = require('./controllers/bookingController');
const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/sessions',SessionController.store);

routes.post('/spots', upload.single('thumbnail'),SpotsController.store);
routes.post('/spots/:spot_id/bookings', bookingController.store);
routes.get('/dashboard', DashboardController.show);
routes.get('/spots', SpotsController.index);

module.exports = routes;