var util = require('util');
var fs = require('fs');
var exec = require('child_process').exec;

var target = "email";
for( var i=2 ; i<process.argv.length ; i++ ) {
	var a = process.argv[i];
	if( a === "--mailinfo" || a === "-m" ) {
		var mailfile = process.argv[++i];
	}
	if( a === "--address" || a === "-a" ) {
		var address = process.argv[++i];
	}
	if( a === "--target" || a === "-t" ) {
		switch( process.argv[++i] ) {
		case "email":
			var target = "email";
			break
		case "whatsapp":
			var target = "whatsapp";
			break;
		case "facebook":
			var target = "facebook";
			break;
		default:
			console.error( "Target not implemented. Currently only 'email'." );
			process.exit();
		}
	}
}

var mailinfo = require( "../" + mailfile );

if( !mailinfo ) {
	console.error( "Couldn't load mail info file. Exiting." );
	process.exit();
}

var startDate = new Date();

// Check for next publishing day ...
for( var i = 0 ; i < 7 ; i++ ) {
	if( mailinfo.weekdays.indexOf( startDate.getDay() ) > -1 ) {
		break;
	} else {
		startDate.setDate(startDate.getDate() + 1);
	}
}

if( i === 7 ) {
	console.error( "Couldn't find a start date. Exiting." );
	process.exit();
}

mailinfo.subscribers.push( {
	email: address,
	startDate: startDate.getFullYear() + "-" + ("0"+(startDate.getMonth()+1)).slice(-2) + "-" + ("0" + startDate.getDate()).slice(-2),
	target: target,
} );


fs.writeFile( mailfile + "~", JSON.stringify( mailinfo, null, 4 ), function(err) {
	if(err) {
		console.error(err);
	} else {
		exec( "mv " + mailfile + "~ " + mailfile );
	}
}); 

