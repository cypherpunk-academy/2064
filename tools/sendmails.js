var exec = require('child_process').exec;
var util = require('util');
var mailinfo = require( process.argv[2] );

var today = new Date(),
	mailsSent = 0,
	mailsSentOk = 0;

// Check for publishing day ...
if( mailinfo.weekdays.indexOf( today.getDay() ) === -1 ) {
	console.error( "Today is not a publishing day." );
	process.exit(0);
}

for( var i=0; i<mailinfo.subscribers.length; i++ ) {
	var subs = mailinfo.subscribers[i],
		startDate = new Date( subs.startDate ),
		days = Math.floor( Math.abs((startDate.getTime() - today.getTime())/(24*60*60*1000)) ),
		weekday = startDate.getDay(),
		part = Math.floor( days / 7 ) * mailinfo.weekdays.length + 1;

	if( mailinfo.weekdays.indexOf( weekday ) === -1 ) {
		console.error( "Start date of '" + subs.email + "' is not a publishing day. Omitting ..." );
		continue;
	}

	for( var j=0 ; j<days%7 ; j++ ) {
		if( mailinfo.weekdays.indexOf( (weekday + j)%7 ) !== -1 ) {
			part++;
		}
	}

	if( part >= mailinfo.parts.length ) {
		console.error( "Part " + (part+1)  + " is not available for '" + subs.email + "'. Omitting ..." );
		continue;
	}

	var header = 
			"From: 2064 Die Geschichte der Cypherpunks <michael@c2064.org>\n" + 
			"To: " + subs.email + "\n" + 
			"Subject: 數 " + (part+1) + "\n" + 
			"Content-Type: text/html; charset=\"utf-8\"\n" +
			"MIME-Version: 1.0\n\n",
		html = 
			"<head>" +
				"<link href=\"https://fonts.googleapis.com/css?family=Lora\" rel=\"stylesheet\">" +
				"<meta charset='utf-8'>" +
				"<style>" +
					"body {" +
						"font-family: 'Lora', serif;" +
					"}" +
					"hr {" +
						"border-color: lightgrey;" +
					"}" +
				"</style>" +
					"" +
			"</head>" +
			"<body>" +
				"<div>" +
					"<h3>2064 Die Geschichte der Cypherpunks</h3>" +
					"<h4>" + (part+1) + " - " +
						"<a href='" + mailinfo.parts[part] + "'>" + mailinfo.captions[part] + "</a>" +
					"</h4>" +
					"<hr>" +
					"<h4>Ältere Folgen</h4>" +
						"" +
						"";

	for( var j=part-1 ; j>=0 ; j-- ) {
		html += "<p>" + (j+1) + " - " +
			"<a href='" + mailinfo.parts[j] + "'>" + mailinfo.captions[j] + "</a>" +
		"</p>";

		if( j === 8 ) html += "<h4>--- TEIL 1 ---</h4>";
		if( j === 18 ) html += "<h4>--- TEIL 2 ---</h4>";
	}

	html +=		"</div>" +
			"</body>";

	exec(	"echo \"" +
			header +
			html +
			"\" " +
			"| sendmail " + subs.email,

		function(error, stdout, stderr) {
			mailsSent++;
			if( error ) {
				console.error( "Mail to " + subs.email + " was not sent. (" + strerr + ")" );
			} else {
				mailsSentOk++;
			}
		}
	);

	subs.sentDate = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate();
}

(function wait () {
	if( mailsSent < mailinfo.subscribers.length ) setTimeout(wait, 1000);
	else console.log( mailsSentOk + " mails sent out." + JSON.stringify( mailinfo ) );
})();

