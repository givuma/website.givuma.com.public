const { onRequest } = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const { Resend } = require("resend");
const { pushOver } = require("./utils/pushover.js");

exports.contactGivumaConsulting = onRequest({ timeoutSeconds: 15, cors: true, maxInstances: 10 }, async (req, res) => {
	logger.log(`Print Body: \n\n${JSON.stringify(req.body, null, 2)}`);

	try {
		if (req.method !== "POST") {
			res.status(400).send("Invalid request");
			return;
		}

		// mail.privateemail.com
		// 465
		// info@givumaconsulting.com
		// SSL/TLS
		// Your account password

		const name = req.body.name || "Name Null";
		const company_name = req.body.company_name || "company_name Null";
		const company_address = req.body.company_address || "company_address Null";
		const email = req.body.email || false;
		const phone = req.body.phone || "phone Null";
		const checkbox_1 = req.body.checkbox_1 || "checkbox_1 Null";
		const checkbox_2 = req.body.checkbox_2 || "checkbox_2 Null";
		const checkbox_3 = req.body.checkbox_3 || "checkbox_3 Null";
		const checkbox_4 = req.body.checkbox_4 || "checkbox_4 Null";
		const checkbox_5 = req.body.checkbox_5 || "checkbox_5 Null";
		const checkbox_6 = req.body.checkbox_6 || "checkbox_6 Null";
		const message = req.body.message || "Message Empty";

		const messageTxt = `
			<h1>Request of contact for Givuma Consulting</h1>
			<table>
				<tr><td>name:</td>            <td><strong>${name}</strong></td></tr>
				<tr><td>company_name:</td>    <td><strong>${company_name}</strong></td></tr>
				<tr><td>company_address:</td> <td><strong>${company_address}</strong></td></tr>
				<tr><td>email:</td>           <td><strong>${email}</strong></td></tr>
				<tr><td>phone:</td>           <td><strong>${phone}</strong></td></tr>
				<tr><td>checkbox_1:</td>      <td><strong>${checkbox_1}</strong></td></tr>
				<tr><td>checkbox_2:</td>      <td><strong>${checkbox_2}</strong></td></tr>
				<tr><td>checkbox_3:</td>      <td><strong>${checkbox_3}</strong></td></tr>
				<tr><td>checkbox_4:</td>      <td><strong>${checkbox_4}</strong></td></tr>
				<tr><td>checkbox_5:</td>      <td><strong>${checkbox_5}</strong></td></tr>
				<tr><td>checkbox_6:</td>      <td><strong>${checkbox_6}</strong></td></tr>
				<tr><td>message:</td>         <td><strong>${message}</strong></td></tr>
			<table>`;

		if (email) {
			const resend = new Resend(process.env.RESEND_KEY);

			const data = await resend.emails.send({
				from: "Givuma Consulting <info@email.givumaconsulting.com>",
				reply_to: "info@givumaconsulting.com",
				to: ["info@givumaconsulting.com"],
				subject: "Request of contact for Givuma Consulting",
				html: messageTxt,
			});

			await pushOver(`GivumaConsulting contact from: ${email}`);

			res.redirect(303, "https://givumaconsulting.com/contact/success");
		} else {
			logger.log("After sending email because email missing");
			await pushOver("GivumaConsulting contact from: INVALID EMAIL");
			res.redirect(303, "https://givumaconsulting.com/404");
		}
	} catch (err) {
		await pushOver("GivumaConsulting contact from: GENERIC ERROR");
		logger.error("Err cc: ", JSON.stringify(err));
		res.redirect(303, "https://givumaconsulting.com/404");
	}
});
