const { Router } = require("express");

const SessionsController = require('../controllers/SessionsController');
const Route = require("express/lib/router/route");
const Sessionscontroller = new SessionsController();

const sessionsRoutes = Router();
sessionsRoutes.post("/", Sessionscontroller.create);

module.exports = sessionsRoutes;