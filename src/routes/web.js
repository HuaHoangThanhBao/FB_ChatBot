import express from "express";
import chatbotController from "../controllers/chatbotController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get("/", chatbotController.getHomePage);

    //Setup get started button, whitelisted domain
    router.post('/setup-profile', chatbotController.setupProfile);

    //Setup persistent menu
    router.post('/setup-persistent-menu', chatbotController.setupPersistentMenu);

    router.get("/webhook", chatbotController.getWebHook);
    router.post("/webhook", chatbotController.postWebHook);
    
    router.get("/book-appointment", chatbotController.handleBookAppointment);

    router.post("/book-appointment-ajax", chatbotController.handlePostBookAppointment);

    return app.use("/", router);
}

module.exports = initWebRoutes;