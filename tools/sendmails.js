var exec = require('child_process').exec;
var util = require('util');
var fs = require('fs');

if( process.argv.length < 3 ) {
	console.log( "Usage: node sendmail.js --mailinfo [JSON mailfile]\n" + 
					"\nOptions:\n" +
					"--dryrun, -d:\tTest without sending mails.\n" +
					"--verbose, -v:\tMore console output.");

	process.exit();
}

for( var i=2 ; i<process.argv.length ; i++ ) {
	var a = process.argv[i];
	if( a === "--mailinfo" || a === "-m" ) {
		var mailfile = process.argv[++i];
	}
	if( a === "--dryrun" || a === "-d" ) {
		var dryrun = true;
	}
	if( a === "--verbose" || a === "-v" ) {
		var verbose = true;
	}
	if( a === "--remove" || a === "-r" ) {
		var remove = true;
	}
}

var mailinfo = require( "../" + mailfile );

var today = new Date(),
	mailsProcessed = 0,
	mailsSent = 0;

// Check for publishing day ...
if( mailinfo.weekdays.indexOf( today.getDay() ) === -1 ) {
	console.error( "Today is not a publishing day." );
	process.exit(0);
}

var generateHTML = function( part ) {
	var html = 
		"<head>" +
			"<link href=\"https://fonts.googleapis.com/css?family=Lora\" rel=\"stylesheet\">" +
			"<meta charset='utf-8'>" +
			"<style>" +
				"body {" +
					"font-family: 'Lora', serif;" +
				"}" +
				"hr {" +
					"border-color: lightgrey;" +
					"border-color: lightgrey;" +
					"border-color: lightgrey;" +
				"}" +
				".ende {" +
					"text-align: center;" +
				"}" +
				".em {" +
					"font-style: italic;" +
					"font-size: 0.75em;" +
				"}" +
				"h3.ende {" +
					"margin-bottom: 60px;" +
				"}" +
				"h4.ende {" +
					"margin-top: 120px;" +
				"}" +
				".end-box {" +
					"margin: 20px;" +
					"padding: 10px;" +
					"width: 400px;" +
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
				(part === mailinfo.parts.length-1? 
					"<div class='end-box'>" +
						"<h3 class='ende'>" +
							"<span>* * *  E N D E * * *</span>" +
						"</h3>" +
						"<h4 class='ende'>Vielen Dank an ...</h4>" +
						"<p><div class='ende'>Volker Diels-Grabsch</div><div class='ende'>Maarja Urb</div><div class='ende'>Christian V.</div><div class='ende'>Urte Beer</div><div class='ende'>Christian Schönberger</div><div class='ende em'>für Ideen und Hilfe beim Redigieren.</div></p>" +
						"<p><div class='ende'>Maarja Urb</div><div class='ende em'>für das Titelbild und für die Augen der Sphinx.</div></p>" +
						"<p><div class='ende'>Sabrina von Nuis</div><div class='ende'>Julian Vetten</div><div class='ende'>Dieter Schwartz</div><div class='ende'>Pär Ahlbom</div><div class='ende'>Bernd Fix</div><div class='ende'>Theresia Reinhold</div><div class='ende'>Johanna Tombrock</div><div class='ende'>Noe Lue</div><div class='ende em'>fürs Testlesen und Kommentieren.</div></p>" +
						"<p><div class='ende'>Das Buch <a href='https://en.wikipedia.org/wiki/Cypherpunks_(book)'>Cypherpunks</a> von Julian Assange und<br><a href='https://en.wikipedia.org/wiki/Cloud_Atlas_(film)'>Cloud Atlas</a> der Wachowski-Geschwister</div><div class='ende em'>als Inspriation.</div></p>" +
						"<p><div class='ende'>Die <a href='https://c2064.org/9/'>9 Grundgedanken</a>, die dem Buch zugrunde liegen.</div></p>" +
						"<h4 class='ende'>Mitmachen, Weiterschreiben ...</h4>" +
						"<p><div class='ende'>Das Buch <strong>2064 Die Geschichte der Cypherpunks</strong> und die geplanten Nachfolger <strong>2064 Der Weg in die Dunkelheit</strong> und <strong>2064 Die Verwandlung</strong> sind als Mitmachbücher konzipiert. " +
						"Wer aufgrund von aktuellen Ereignissen etwas ändern möchte, die beschriebene Technik plausibler machen, eine Nebengeschichte erzählen, die Sprache eines Charakters ändern oder irgendetwas anderes, kann das machen. " +
						"2064 ist ein Git-Projekt. Das heißt, offen für eine Zusammenarbeit im Internet und so organisiert, wie Marianne, Paul und Oskar das machen würden. " +
						"Der erste Schritt ins Projekt ist, sich ein Konto bei <a href='https://www.bitbucket.com'>Bitbucket</a> anzulegen und mir (2064@c2064.org) den neuen Benutzernamen zu schicken. " +
						"Ich trage den Namen dann ins Projekt ein und schicke eine Beschreibung, wie man es auf seinem eigenen Computer einrichtet, wie man sich jeweils die neues Version holt und wie man Vorschläge schickt. Willkommen in der Welt der Internet-Zusammenarbeit!</div></p>" +
					"</div>"
				: "" ) +
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

	return html;
}

var generateAscii = function( part ) {
	var ascii = 
		"2064 Die Geschichte der Cypherpunks\n\n" +
		(part+1) + " - " + mailinfo.captions[part] + "\n\t" + mailinfo.parts[part] + "\n\n" +
		"Ältere Folgen\n\n";

	for( var j=part-1 ; j>=0 ; j-- ) {
		ascii += (j+1) + " - " + mailinfo.captions[j] + "\n\t" + mailinfo.parts[j] + "\n\n";

		if( j === 8 ) ascii += "\n--- TEIL 1 ---\n\n";
		if( j === 18 ) ascii += "\n--- TEIL 2 ---\n\n";
	}

	return ascii;
}

var sendmail = function( header, content, subs, part ) {

	exec(	"echo \"" +
			header +
			content +
			"\" " +
			"| sendmail " + subs.email,

		function(error, stdout, stderr) {
			mailsProcessed++;
			if( error ) {
				console.error( "Mail to " + subs.email + " was not sent. (" + stderr + ")" );
			} else {
				if( verbose ) console.log( "Sent part " + (part+1) + " to " + subs.email + ". Ok." );
				mailsSent++;
				subs.sentDate = today.getFullYear() + "-" + ("0"+(today.getMonth()+1)).slice(-2) + "-" + ("0" + today.getDate()).slice(-2);
			}
		}
	);
}

for( var i=0; i<mailinfo.subscribers.length; i++ ) {
	setTimeout( function( i ) {
		var subs = mailinfo.subscribers[i],
			startDate = new Date( subs.startDate ),
			sentDate = new Date( subs.sentDate ),
			days = Math.floor( Math.abs((startDate.getTime() - today.getTime())/(24*60*60*1000)) ),
			weekday = startDate.getDay(),
			part = Math.floor( days / 7 ) * mailinfo.weekdays.length + 1;

		if( mailinfo.weekdays.indexOf( weekday ) === -1 ) {
			console.error( "Start date of '" + subs.email + "' is not a publishing day. Omitting ..." );
			mailsProcessed++;
			return;
		}

		for( var j=0 ; j<days%7 ; j++ ) {
			if( mailinfo.weekdays.indexOf( (weekday + j)%7 ) !== -1 ) {
				part++;
			}
		}

		if( sentDate.getDate() === today.getDate() && sentDate.getMonth() === today.getMonth() ) {
			console.error( "Part " + (part+1) + " was already sent to '" + subs.email + "' today. Omitting ..." );
			mailsProcessed++;
			return;
		}

		if( part >= mailinfo.parts.length ) {
			if( remove ) {
				delete mailinfo.subscribers[i];
				console.log( "Reader '" + subs.email + "' removed from the mail file." );
			} else {
				console.error( "Reader '" + subs.email + "' got all 32 parts already. Use '--remove' option to remove it from the mail file." );
			}
			mailsProcessed++;
			return;
		}

		var header = 
				"From: 2064 Die Geschichte der Cypherpunks <michael@c2064.org>\n" + 
				"To: " + subs.email + "\n" + 
				"Subject: 數 " + (part+1) + "\n" + 
				"Content-Type: text/" + (subs.ascii? "plain" : "html") + "; charset=\"utf-8\"\n" +
				"MIME-Version: 1.0\n\n",
			content = subs.ascii? generateAscii( part ) : generateHTML( part );

		if( !dryrun ) {
			sendmail( header, content, subs, part );
		} else {
			console.log( "Sending part " + (part+1) + " to " + subs.email );
		}
	}, 100*i, i );
}

var timeout = 0;
(function wait () {
	if( verbose ) console.log( mailsProcessed + " messages processed. Should be " + mailinfo.subscribers.length );
	if( mailsProcessed < mailinfo.subscribers.length && timeout < 30000 ) {
		setTimeout(wait, 1000);
		timeout += 1000;
	} else {
		console.log( mailsSent + " mails sent out." );

		// Get rid of deleted addresses
		for( var i=mailinfo.subscribers.length-1; i>=0 ; i-- ) {
			if( !mailinfo.subscribers[i] ) mailinfo.subscribers.splice(i,1);
		}

		fs.writeFile( mailfile + "~", JSON.stringify( mailinfo, null, 4 ), function(err) {
			if(err) {
				console.error(err);
			} else {
				exec( "mv " + mailfile + "~ " + mailfile );
			}
		}); 
	}
})();

