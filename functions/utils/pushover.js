const TOKEN = "auhjycqgrx45fx8uqivmzodk9h4vo5";
const USER = "u5q9b568tpmwyxokt55gzgzrtza397";

exports.pushOver = async (message) => {
	const res = await fetch("https://api.pushover.net/1/messages.json", {
		method: "POST",
		body: JSON.stringify({
			token: process.env.PUSHOVER_TOKEN,
			user: process.env.PUSHOVER_USER,
			message: message,
		}),
		headers: {
			'Content-type': 'application/json; charset=UTF-8',
		},
	});

    // if(res.ok){
    //     const data = await res.json();
    // }
};
