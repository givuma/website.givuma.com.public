const { initializeApp } = require("firebase-admin/app");
initializeApp();

const { contactGivuma } = require("./contactGivuma.js");
const { contactGivumaConsulting } = require("./contactGivumaConsulting.js");

exports.contactGivuma = contactGivuma;
exports.contactGivumaConsulting = contactGivumaConsulting;