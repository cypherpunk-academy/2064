
var url = "https://c2064.org/2064/wp-admin/";

var casper = require('casper').create({
    	//verbose: true,
    	//logLevel: "debug"
	}),
	utils  = require('utils');

if( casper.cli.args.length !== 3 ) {
	utils.dump( casper.cli.args );
	utils.dump( "Usage: casperjs tools/wordpresspublish.js [part] [new text] [wordpress password]" );
	exit(0);
};

casper.start( url + "edit.php?post_type=page", function() {
	if( this.getTitle() !== "‹ Log In" ) {
		this.echo( "Didn't get login page. Title should be: '"+ this.getTitle()+"'" );
		this.exit(1);
	}

    casper.fill('form', { 
		log: "admin", 
		pwd: casper.cli.args[2] 
	}, true);

});

casper.then( function() {
	if( this.getTitle() === "‹ Log In" && this.fetchText( "#login_error" ) !== "" ) {
		utils.dump( "Can't login. Error message: '"+ this.fetchText( "#login_error" ) + "'" );
		this.then( function() {
			wait( 1000 );
			this.exit(2);
		} );
	}
	
	this.wait( 100 );
} );

casper.then( function() {
	var s = "\"數 " + this.cli.args[0] + "\"";
    this.sendKeys( "#post-search-input", s ); 
} );

casper.thenClick( ".search-box #search-submit", function() {
	this.wait( 100, function() {
		var page =  "[aria-label^='“數 " + casper.cli.args[0] + "']"; 
		if( this.exists( page ) ) {
		
			this.thenClick( page, function() {
				this.thenClick( "button.switch-html" , function() {
					this.wait( 500 ); 
					this.then( function() {
						var source = this.cli.args[1];
						casper.evaluate(function( source ) {
							document.querySelector("textarea.wp-editor-area").value = source;
						}, source );
						var text = casper.evaluate(function(){
							return document.querySelector("textarea.wp-editor-area").value;
						});
						this.wait( 500 );
						this.then( function() {
							this.thenClick( "input#publish", function() {
							});
						} );
					} );
				} );
			} );

		} else {
			this.echo( "Seite existiert nicht in Wordpress. Datei nicht aktualisiert." );
/*			this.open( url + "post-new.php?post_type=page" ).then( function() {
				this.thenClick( "a.ci-upload", function() {
					this.wait( 500, function() {
						this.thenClick( "li[aria-label='silmad3']", function() {
							this.thenClick( "button.media-button-insert", function() { 
								this.thenClick( "button.switch-html" , function() {
									this.sendKeys( "input[name='post_title']", "數 " + casper.cli.args[0] );
									this.sendKeys( "textarea.wp-editor-area", this.cli.args[1] );
									this.wait( 500, function() {
										this.click( "input#publish", function() {
										});
									} );
								} );
							});
						});
					});
				});
			});*/
		}
	});
} );

casper.then( function() {
	this.exit(0);
} );

casper.run();

