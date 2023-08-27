const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const mailjet = require("node-mailjet");
const { pushOver } = require("./utils/pushover.js");

exports.contactGivuma = onRequest({ timeoutSeconds: 15, cors: true, maxInstances: 10 }, async (req, res) => {
	if (req.method !== "POST") {
		res.status(400).send("Invalid request");
		return;
	}

	try {
		const email = req.body.email || "Null";
		const message = req.body.message || "Empty";
		const company = req.body.company || "Not Defined";

		const mailjetSender = mailjet.apiConnect(
			process.env.MAILJETSENDER_KEY_PUBLIC,
			process.env.MAILJETSENDER_KEY_PRIVATE,
		);
		
		const request = await mailjetSender.post("send", { version: "v3.1" }).request({
			Messages: [
				{
					From: {
						Email: "info@givuma.com",
						Name: "Givuma Website Contact",
					},
					To: [
						{
							Email: "info@givuma.com",
							Name: "Givuma",
						},
					],
					Subject: `Givuma: ${company} contact form`,
					TextPart: `From: ${email}\nMessage: ${message}`,
					HTMLPart: `From: ${email} <br />Message: ${message}`,
				},
			],
		});

		await pushOver(`Givuma contact from: ${email}`);
		logger.log("Givuma contact data: ", result);

		res.redirect(303, "https://givuma.com");
	} catch (err) {
		// console.log("err.statusCode", JSON.stringify(err.statusCode));
		res.redirect(303, "https://givuma.com/404");
	}
});
