"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sendgrid_service_1 = require("../services/sendgrid.service");
function createSendGridClient(options) {
    const client = new sendgrid_service_1.SendGridService(options);
    return client;
}
exports.createSendGridClient = createSendGridClient;
