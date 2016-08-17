
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
	var s = "數 " + this.cli.args[0];
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
//casper.thenOpen( url, function() {
//    this.echo(this.getTitle());
//});

casper.run();

/*
casper.test.begin('Signup', 15, function suite(test) {

    var i = 0;
	phantom.cookiesEnabled = true;
    (function signup() {

        casper.start(url + "/signup/live-editor", function() {

            test.assertExists(".form-signin-heading", "Header exists");
            test.assertEvalEquals(function() {
                return __utils__.findOne("form button").textContent;
            }, "Konto anlegen", "Header content");

            casper.fill('form', { name: "Admin" }, false);
            casper.fill('form', { password: name + i }, false);
            casper.fill('form', { password2: name + i }, false);
        } );

        ///////////////////////////////////////////////////////////////////
        // Signup 2: Signup with existing accout
        casper.thenClick( "form button", function() {

            test.assertExists( "form.has-error", "Signup with name 'Admin' throws no error." );

            casper.fill('form', { name: name + i }, false);
            casper.fill('form', { password: name }, false);
            casper.fill('form', { password2: name + i }, false);
        } );

        ///////////////////////////////////////////////////////////////////
        // Signup 3: Signup with unmatching passwords
        casper.thenClick( "form button", function() {

            test.assertExists( "form.has-error", "Signup with not matching passwords." );

            casper.fill('form', { name: name + i }, false);
            casper.fill('form', { password: name + i }, false);
            casper.fill('form', { password2: name + i }, false);
            casper.fill('form', { groupcode: "AllesWirdGutt" }, false);
        } );

        ///////////////////////////////////////////////////////////////////
        // Signup 4: Signup with wrong group code
        casper.thenClick( "form button", function() {

            test.assertExists( "form.has-error", "Signup with incorrect Groupcode." );

            casper.fill('form', { name: name + i }, false);
            casper.fill('form', { password: name + i }, false);
            casper.fill('form', { password2: name + i }, false);
            casper.fill('form', { groupcode: "AllesWirdGut" }, false);
        } );

        ///////////////////////////////////////////////////////////////////
        // Signup 5: Signup ok
        casper.thenClick( "form button", function() {

            if( casper.exists( "form.has-error" ) ) {
                utils.dump( "Error-Message:" + casper.evaluate(function( ) {
                    return $( "div.error-message" ).val();
                } ) );

                test.assert(false, "Test user " + (name + i) + "is already defined? (Delete all '"+name+"*' accounts and start again.)")
                test.done();
            }

            casper.thenClick( ".login-area a[href='/logout/live-editor']", function() {
                if( ++i < tester ) signup();
            } );
        } );
    })();

    casper.run(function() {
        test.done();
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Login Test
//
casper.test.begin('Login', 12, function suite(test) {

    var i = 0;
	phantom.cookiesEnabled = true;

    (function login() {

        casper.start(url + "/login/live-editor", function() {

            test.assertExists(".form-login-heading", "Header exists");
            test.assertEvalEquals(function() {
                return __utils__.findOne("form button").textContent;
            }, "Einloggen", "Button label");

            casper.fill('form', { name: name + i }, false);
            casper.fill('form', { password: name }, false);

        });

        ///////////////////////////////////////////////////////////////////
        // Login 2: Login with wrong password
        casper.thenClick( "form button", function() {

            test.assertExists( "form.has-error", "Login with wrong password." );

            casper.fill('form', { name: name + i }, false);
            casper.fill('form', { password: name + i }, false);
        });

        ///////////////////////////////////////////////////////////////////
        // Login 3: Login ok
        casper.thenClick( "form button", function() {

            this.wait(100, function() {
                test.assertExists( ".login-area a[href='/logout/live-editor']", "Logout button." );
                casper.thenClick( ".login-area a[href='/logout/live-editor']", function() {
                    if( ++i < tester ) login();
                } );
            } );
        } );
    })();

    casper.run(function() {
        test.done();
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////
// Live-Editor Test
//
casper.test.begin('Live-Editor', 114, function suite(test) {

    var i = 0;

    ///////////////////////////////////////////////////////////////////
    // 1. Login 
    casper.start(url + "/login/live-editor", function() {

        test.assertExists(".form-login-heading", "Header exists");
        test.assertEvalEquals(function() {
            return __utils__.findOne("form button").textContent;
        }, "Einloggen", "Button label");

        casper.fill('form', { name: name + "0" }, false);
        casper.fill('form', { password: name + "0" }, false);
    });

    casper.thenClick( "form button", function() {

        this.wait(100, function() {
            test.assertExists( ".scratchpad-ace-editor .ace_text-input", "Text input for Ace-Editor (JavaScript)." );
            
            casper.evaluate(function(){
                $("#project-button-textarea-for-testing").val( "ellipse(100, 100, 100, 101);\n\n" ).trigger("set-live-editor");
            });

            this.wait(200, function() {
                test.assertExists( "#project-bar-save", "Save button of project bar" );
            } );
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 2. Save program
    casper.thenClick( "#project-bar-save", function() {

        this.wait(500, function() {
            test.assertExists( "#project-bar-string-input-modal.in input", "Input field of filename input modal" );
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit field of filename input modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "TEST File 001 Long file name" }, false);
        });
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {

        this.wait(100, function() {
            test.assertExists( "#project-bar-new", "Project bar new button" );
        });
    } );

    ///////////////////////////////////////////////////////////////////
    // 3. New file & save again (same filename + don't overwrite)
    casper.thenClick( "#project-bar-new", function() {

        this.wait(500, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .name").textContent;
            }, "unbekannt.pjs", "'unbekannt.pjs' displayed as filename.");
            test.assertExists( "#project-bar-save", "Save button of project bar" );
        } );
    } );

    casper.thenClick( "#project-bar-save", function() {

        this.wait(500, function() {
            test.assertExists( "#project-bar-string-input-modal.in input", "Input field of filename input modal" );
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of filename input modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "TEST File 001 Long file name" }, false);
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {
        this.wait(500, function() {
            test.assertExists( "#project-bar-yes-no-modal.in", "Yes-No-Modal" );

            test.assertExists( "#project-bar-yes-no-modal.in button.modal-no", "Yes-No-Modal: No-Button" );
        } );
    } );

    casper.thenClick( "#project-bar-yes-no-modal.in button.modal-no", function() { 
        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( "// This is a test program\nellipse(100, 100, 100, 102);\n\nrect(50, 50, 50, 50);" ).trigger("set-live-editor");
        });
        //casper.setLiveEditorCode( "// This is a test program\nellipse(100, 100, 100, 102);\n\nrect(50, 50, 50, 50);" );

        this.wait(200, function() {

        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 4. Save again (same filename + overwrite)
    casper.thenClick( "#project-bar-save", function() {

        this.wait(500, function() {
            test.assertExists( "#project-bar-string-input-modal.in input", "Input field of filename input modal" );
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of filename input modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "TEST File 001 Long file name" }, false);
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {
        this.wait(500, function() {
            test.assertExists( "#project-bar-yes-no-modal.in", "Yes-No-Modal" );
            test.assertExists( "#project-bar-yes-no-modal.in button.modal-yes", "Yes-No-Modal: Yes-Button" );
        } );
    } );

    casper.thenClick( "#project-bar-yes-no-modal.in button.modal-yes", function() { 
        this.wait(200, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .name").textContent;
            }, "TEST File 001 Long file name.pjs", "'TEST File 001 Long file name.pjs' displayed as filename.");

            test.assertExists( "#project-bar-save-project", "Save project button of project bar" );
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 5. Save project
    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            test.assertEvalEquals(function() {
                return $("#project-bar-input").val();
            }, "TEST File 001 Long file name", "'TEST File 001 Long file name' displayed as suggested project name.");
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "TEST-Project" }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {
        this.wait(500, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .project").textContent;
            }, "Projekt", "Project label is displayed.");
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 6. New file, some new code and save another project with the same name as the first
    casper.thenClick( "#project-bar-new", function() {

        this.wait(500, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .name").textContent;
            }, "unbekannt.pjs", "'unbekannt.pjs' displayed as filename.");

            casper.evaluate(function(){
                $("#project-button-textarea-for-testing").val( "// This is a second test program\nfill(255,100,100,100);\nellipse(100, 100, 100, 102);\n\nfill(100,100,255,100);\nrect(50, 50, 50, 50);" ).trigger("set-live-editor");
            });

            this.wait(200, function() {
                test.assertExists( "#project-bar-save-project", "Save button of project bar" );
            } );
        } );
    } );

    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "TEST-Project" }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {
        this.wait(200, function() {
            test.assertExists( "#project-bar-ok-modal.in button.btn-primary", "Project exists modal and Ok button");
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 7. Save project again with a new name
    casper.thenClick( "#project-bar-ok-modal.in button.btn-primary", function() {

        this.wait(200, function() {
            casper.fill("#project-bar-string-input-modal", { "string-input": "TEST-Project-2" }, false);
            test.assertExists( "#project-bar-string-input-modal [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal [type='submit']", function() {
        this.wait(500, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .project").textContent;
            }, "Projekt", "Project label is displayed.");
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 8. Change code and save again
    casper.then( function() {

        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( 
                "// This is a second test program\n" +
                "var bild = getImage(\"Spielplatz/Fred_Yeah\");\n" +
                "var sound = getSound(\"Spielplatz/Glas\");\n" +
                "// This is a second test program\n" +
                "fill(255,100,100,100);\n" +
                "ellipse(100, 100, 100, 102);\n\n"+ 
                "fill(100,100,255,100);\n" +
                "rect(50, 50, 50, 50);\n\n" +
                "image( bild, 160, 300 );\n" +
                "playSound( sound );\n"
            ).trigger("set-live-editor");
        } );
    } );

    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "Added an image and a sound." }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {
        this.wait(500, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne("#project-bar-ok-modal.in .modal-title").textContent;
            }, "Live-Editor neu starten", "Modal-Title 'Live-Editor neu starten'");
        });
    });

    casper.thenClick( "#project-bar-ok-modal.in button.btn-primary", function() {
        this.wait(200, function() {

            getLiveEditorCode( function( val ) {
                test.assert( val.search( "TEST-Project-2/Fred_Yeah" ) > -1, "Moved image resources." );
                test.assert( val.search( "TEST-Project-2/Glas" ) > -1, "Moved sound resources." );

                test.assertExists( "#project-bar-open-files li[codefile='TEST-Project.pjs']", "Open first Test-Project again." )
            } );
        });
    });

    ///////////////////////////////////////////////////////////////////
    // 9. Change to first project, open directly

    casper.thenClick( "#project-bar-open-files li[codefile='TEST-Project.pjs']", function() { 
        this.wait(200, function() {

            getLiveEditorCode( function( val ) {
                test.assert( val.search( "This is a test program" ) > -1, "First Test-Project loaded." );

                test.assertExists( "#project-bar-invite", "Invite Tester1 to this project." )
            } );
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 10. Invite Tester1 to project
    casper.thenClick( "#project-bar-invite", function() {

        this.wait(200, function() {
            test.assertExists( "#project-bar-invite-modal.in", "Invite Modal" );

            test.assertExists( "#project-bar-invite-modal.in input[user='Tester1']", "Tester1 in Klasse 11 project" );
        } );
    } ); 

    casper.thenClick( "#project-bar-invite-modal.in input[user='Tester1']", function() {

        this.wait(200, function() {
            test.assertExists( "#project-bar-invite-modal.in button.modal-invite.btn-primary", "Invite Button" );
        } );
    } ); 

    casper.thenClick( "#project-bar-invite-modal.in button.modal-invite.btn-primary", function() {

        this.wait(200, function() {} );
    } ); 


    ///////////////////////////////////////////////////////////////////
    // 11. Change to second project, open via modal
    casper.thenClick( "#project-bar-open-files li[codefile='TEST-Project-2.pjs']", function() { 
        this.wait(200, function() {

            getLiveEditorCode( function( val ) {

                test.assert( val.search( "This is a second test program" ) > -1, "Second Test-Project loaded." );

                test.assertExists( "#project-bar-invite", "Invite Tester1 also to this project." )
            } );
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 12. Invite Tester1 and Tester2 to project
    casper.thenClick( "#project-bar-invite", function() {

        this.wait(200, function() {
            test.assertExists( "#project-bar-invite-modal.in", "Invite Modal" );

            test.assertExists( "#project-bar-invite-modal.in input[user='Tester1']", "Tester1 in Klasse 11 project" );
        } );
    } ); 

    casper.thenClick( "#project-bar-invite-modal.in input[user='Tester1']" );
    casper.thenClick( "#project-bar-invite-modal.in input[user='Tester2']", function() {

        test.assertExists( "#project-bar-invite-modal.in button.modal-invite.btn-primary", "Invite Button" );
    } ); 

    casper.thenClick( "#project-bar-invite-modal.in button.modal-invite.btn-primary", function() {

        test.assertExists( "div.login-area #logout-button", "Logout Button" );
    } ); 

    ///////////////////////////////////////////////////////////////////
    // 13. Logout Tester0, Login Tester1
    casper.thenClick( "div.login-area #logout-button", function() {

        test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Landing page: Title Computer-Spielplatz" );
    } );

    casper.then( function() {
        casper.open(url + "/login/live-editor").then( function() {

            test.assertTitle( "Login - CYPHERPUNK Computer-Spielplatz", "Login: Title Computer-Spielplatz" );

            casper.fill('form', { name: name + "1" }, false);
            casper.fill('form', { password: name + "1" }, false);

            test.assertExists( "form button", "Login button" );
        } );
    });

    casper.thenClick( "form button", function() {

        this.wait(200, function() {
            test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Live-Editor: Title Computer-Spielplatz" );
            test.assertExists( "#project-bar-mail-menu .dropdown-menu li[project-name='TEST-Project']", "Invitation Entry" );
            test.assertExists( "button#project-bar-mail", "Mail menu Button" );
    
            //test.done();
        });
    });

    // 1 unbekannt in codeFileList
    // 2 TEST-Project-2.pjs bleibt beim Ausloggen in Dateiliste
    ///////////////////////////////////////////////////////////////////
    // 14. New file with name "Test-Project-2" & save
    casper.thenClick( "#project-bar-new", function() {

        utils.dump( "One step too far." );
        this.wait(200, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .name").textContent;
            }, "unbekannt.pjs", "'unbekannt.pjs' displayed as filename.");
            test.assertExists( "#project-bar-save", "Save button of project bar" );
        } );
    } );

    casper.thenClick( "#project-bar-save", function() {

        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in input", "Input field of filename input modal" );
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of filename input modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "TEST-Project-2" }, false);
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in [type='submit']", function() {
        this.wait(200, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .name").textContent;
            }, "TEST-Project-2.pjs", "'TEST-Project-2.pjs' displayed as filename.");
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 15. Read project invitation 1 and decline
    casper.thenClick( "button#project-bar-mail", function() {
        this.wait(100, function() {
            test.assertExists( "#project-bar-mail-menu.open", "Mail menu open" );
        } );        
    });

    casper.thenClick( "#project-bar-mail-menu .dropdown-menu li[project-name='TEST-Project']", function() {
        this.wait(200, function() {
            test.assertExists( "#project-bar-yes-no-modal.in", "Invitation Yes-No-Modal" );
            test.assertEvalEquals(function() {
                return __utils__.findOne("#project-bar-yes-no-modal.in .modal-title").textContent;
            }, "Einladung zu \"TEST-Project\"", "Invitation Text.");
        } );
    });

    casper.thenClick( "#project-bar-yes-no-modal.in button.btn-default", function() {
        test.assertDoesntExist( "#project-bar-mail-menu .dropdown-menu li[project-name='TEST-Project']", "Invitation Entry gone" );
        test.assertExists( "#project-bar-mail-menu .dropdown-menu li[project-name='TEST-Project-2']", "Invitation Entry 2" );
    });


    ///////////////////////////////////////////////////////////////////
    // 16. Read project invitation 2 and accept / check if conflicting filename was changed
    casper.thenClick( "#project-bar-mail-menu .dropdown-menu li[project-name='TEST-Project-2']", function() {
        this.wait(200, function() {
            test.assertExists( "#project-bar-yes-no-modal", "Invitation Yes-No-Modal" );
            test.assertEvalEquals(function() {
                return __utils__.findOne("#project-bar-yes-no-modal .modal-title").textContent;
            }, "Einladung zu \"TEST-Project-2\"", "Invitation Text.");
        } );
    });

    casper.thenClick( "#project-bar-yes-no-modal button.btn-primary", function() {
        this.wait(200, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .points").textContent;
            }, "..", "Two project points.");

            test.assertExists( ".project-bar-open-file[codefile='TEST-Project-2..pjs']", "Renamed conflicting filename to TEST-Project-2..pjs" );
            test.assertExists( "#project-bar-save-as-up", "Save as menu entry button" );
        } );        
    });

    ///////////////////////////////////////////////////////////////////
    // 17. Change project and save it
    casper.then( function() {

        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( 
                "// This is a second test program\n" +
                "var bild = getImage(\"Spielplatz/Fred_Yeah\");\n" +
                "var sound = getSound(\"Spielplatz/Glas\");\n" +
                "// This is a second test program\n" +
                "fill(255,255,100,100);\n" +
                "ellipse(100, 100, 100, 102);\n\n"+ 
                "fill(100,100,255,100);\n" +
                "rect(50, 50, 50, 50);\n\n" +
                "image( bild, 60, 300 );\n" +
                "playSound( sound );\n"
            ).trigger("set-live-editor");
        } );
    } );

    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "Changed ellipse color and image position." }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 18. Make some more changes and write locally
    casper.thenClick( "#project-bar-string-input-modal.in button.btn-primary", function() {
        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( 
                "// This is a second test program\n" +
                "var bild = getImage(\"Spielplatz/Fred_Yeah\");\n" +
                "var sound = getSound(\"Spielplatz/Glas\");\n" +
                "// This is a second test program\n" +
                "fill(255,0,255,100);\n" +
                "ellipse(100, 100, 100, 102);\n\n"+ 
                "fill(100,100,255,100);\n" +
                "rect(50, 50, 50, 50);\n\n" +
                "image( bild, 60, 200 );\n" +
                "playSound( sound );\n"
            ).trigger("set-live-editor");
        } );
    } );

    casper.thenClick( "#project-bar-save", function() {
        this.wait( 200 );
    } );

    ///////////////////////////////////////////////////////////////////
    // 19. Save file as TEST-File
    casper.thenClick( "#project-bar-save-as-up", function() {
        this.wait(100, function() {
            test.assertExists( "#project-bar-save-as", "Save as command button" );
            test.assertDoesntExist( "#project-bar-select-list option[value='Spielplatz'", "Spielplatz is not a SaveAs option for Tester1")
        } );        
    });

    casper.thenClick( "#project-bar-save-as", function() {
        this.wait(100, function() {
            test.assertExists( "#project-bar-save-as", "Save as command button" );
            casper.fill("#project-bar-string-input-modal", { "string-input": "TEST-File" }, false);
        } );        
    });

    casper.thenClick( "#project-bar-string-input-modal [type='submit']", function() {
        this.wait(200, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .name").textContent;
            }, "TEST-File.pjs", "'TEST-File.pjs' displayed as filename.");

            test.assertEvalEquals(function() {
                return __utils__.findOne(".big-filename .project").textContent;
            }, "", "File is no Project.");
        } );
    } );

    ///////////////////////////////////////////////////////////////////
    // 19. Logout Tester1 and login Tester0 again
    casper.thenClick( "div.login-area #logout-button", function() {

        test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Landing page: Title Computer-Spielplatz" );
    } );

    casper.then( function() {
        casper.open(url + "/login/live-editor").then( function() {

            test.assertTitle( "Login - CYPHERPUNK Computer-Spielplatz", "Login: Title Computer-Spielplatz" );

            casper.fill('form', { name: name + "0" }, false);
            casper.fill('form', { password: name + "0" }, false);

            test.assertExists( "form button", "Login button" );
        } );
    });

    casper.thenClick( "form button", function() {

        this.wait(200, function() {
            test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Live-Editor: Title Computer-Spielplatz" );
        });
    });

    ///////////////////////////////////////////////////////////////////
    // 20. Check if changes of Tester1 are there
    casper.then( function() {
        getLiveEditorCode( function( val ) {

            test.assert( val.search( "fill\\(255,255" ) > -1, "Changed ellipse color to yellow." );
            test.assert( val.search( "image\\( bild, 60, 300 \\);" ) > -1, "Moved image to the left." );
        } );
    })

    ///////////////////////////////////////////////////////////////////
    // 21. Make some changes and save project
    casper.then( function() {

        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( 
                "// This is a second test program\n" +
                "var bild = getImage(\"Spielplatz/Fred_Yeah\");\n" +
                "var sound = getSound(\"Spielplatz/Glas\");\n" +
                "// This is a second test program\n" +
                "fill(0,255,255,100);\n" +
                "ellipse(100, 100, 100, 102);\n\n"+ 
                "fill(100,100,255,100);\n" +
                "rect(50, 50, 50, 50);\n\n" +
                "image( bild, 60, 100 );\n" +
                "playSound( sound );\n"
            ).trigger("set-live-editor");
        } );
    } );

    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "Changed ellipse color and image position again." }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in button.btn-primary", function() {
        this.wait( 200 );
    } );

    ///////////////////////////////////////////////////////////////////
    // 22. Logout Tester0 and login Tester1 again
    casper.thenClick( "div.login-area #logout-button", function() {

        test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Landing page: Title Computer-Spielplatz" );
    } );

    casper.then( function() {
        casper.open(url + "/login/live-editor").then( function() {

            test.assertTitle( "Login - CYPHERPUNK Computer-Spielplatz", "Login: Title Computer-Spielplatz" );

            casper.fill('form', { name: name + "1" }, false);
            casper.fill('form', { password: name + "1" }, false);

            test.assertExists( "form button", "Login button" );
        } );
    });

    casper.thenClick( "form button", function() {

        this.wait(200, function() {
            test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Live-Editor: Title Computer-Spielplatz" );
        });
    });

    ///////////////////////////////////////////////////////////////////
    // 23. Open test file 2 and confirm that changes are NOT there (due to own local changes)
    casper.thenClick( "#project-bar-open-files li[codefile='TEST-Project-2.pjs']", function() { 

        this.wait( 200 );
    } );

    casper.then( function() {

        getLiveEditorCode( function( val ) {

            test.assert( val.search( "fill\\(0,255,255,100\\);" ) === -1, "Ellipse color not changed." );
            test.assert( val.search( "image\\( bild, 60, 100 \\);" ) == -1, "Image not moved up." );
        } );
    })

    ///////////////////////////////////////////////////////////////////
    // 24. Save Project and check code conflicts
    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "Changed ellipse color and image position once again." }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in button.btn-primary", function() {
        this.wait(200, function() {
            test.assertEvalEquals(function() {
                return __utils__.findOne("#project-bar-ok-modal.in h4.modal-title").textContent;
            }, "Quelltext-Konflikt", "There are conflicts in the code.");
        });
    } );

    casper.thenClick( "#project-bar-ok-modal.in button.btn-primary", function() {

        this.wait(200, function() {
            getLiveEditorCode( function( val ) {

                test.assert( val.search( "<<<<<<< HEAD" ) > -1, "Git marked conflicts." );
                test.assert( val.search( "fill\\(255,0,255,100\\);" ) > -1, "fill, version 1" );
                test.assert( val.search( "fill\\(0,255,255,100\\);" ) > -1, "fill, version 2" );
                test.assert( val.search( "image\\( bild, 60, 200 \\);" ) > -1, "image, version 1" );
                test.assert( val.search( "image\\( bild, 60, 100 \\);" ) > -1, "image, version 2" );
            } );
        } );
    })

    ///////////////////////////////////////////////////////////////////
    // 25. Resolve conflicts and save project
    casper.then( function() {

        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( 
                "// This is a second test program\n" +
                "var bild = getImage(\"Spielplatz/Fred_Yeah\");\n" +
                "var sound = getSound(\"Spielplatz/Glas\");\n" +
                "// This is a second test program\n" +
                "fill(255,0,255,100);\n" +
                "ellipse(100, 100, 100, 102);\n\n"+ 
                "fill(100,100,255,100);\n" +
                "rect(50, 50, 50, 50);\n\n" +
                "image( bild, 60, 100 );\n" +
                "playSound( sound );\n"
            ).trigger("set-live-editor");
        } );
    } );

    casper.thenClick( "#project-bar-save-project", function() { 
        this.wait(200, function() {
            test.assertExists( "#project-bar-string-input-modal.in", "String-Input-Modal" );
            casper.fill("#project-bar-string-input-modal.in", { "string-input": "Final compromize." }, false);
            test.assertExists( "#project-bar-string-input-modal.in [type='submit']", "Submit button of projectname input modal" );
        } );
    } );

    casper.thenClick( "#project-bar-string-input-modal.in button.btn-primary", function() {
        this.wait(200);
    } );

    ///////////////////////////////////////////////////////////////////
    // 26. Logout Tester1 and login Tester0 again
    casper.thenClick( "div.login-area #logout-button", function() {

        test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Landing page: Title Computer-Spielplatz" );
    } );

    casper.then( function() {
        casper.open(url + "/login/live-editor").then( function() {

            test.assertTitle( "Login - CYPHERPUNK Computer-Spielplatz", "Login: Title Computer-Spielplatz" );

            casper.fill('form', { name: name + "0" }, false);
            casper.fill('form', { password: name + "0" }, false);

            test.assertExists( "form button", "Login button" );
        } );
    });

    casper.thenClick( "form button", function() {

        this.wait(200, function() {
            test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Live-Editor: Title Computer-Spielplatz" );
        });
    });

    ///////////////////////////////////////////////////////////////////
    // 27. Confirm that changes are there
    casper.then( function() {

            getLiveEditorCode( function( val ) {

            test.assert( val.search( "fill\\(255,0,255,100\\);" ) > -1, "Ellipse color compromize." );
            test.assert( val.search( "image\\( bild, 60, 100 \\);" ) > -1, "Image position compromize." );
        } );
    });

    ///////////////////////////////////////////////////////////////////
    // 28. Session-Storage TEST / First logout
    casper.thenClick( "div.login-area #logout-button", function() {

        test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Landing page: Title Computer-Spielplatz" );
    } );

    ///////////////////////////////////////////////////////////////////
    // 29. 
    casper.then( function() {

        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( "// Empty program\n" ).trigger( "set-live-editor" );
        } );
    } );    

    ///////////////////////////////////////////////////////////////////
    // 30. Reload page and check if text is still there
    casper.then( function() {
        this.reload( function( ) {
            this.wait(200, function() {
                getLiveEditorCode( function( val ) {
                    test.assert( val.search( "// Empty program" ) > -1, "Session storage with no user logged in." );
                } );
            });
        });
    });

    ///////////////////////////////////////////////////////////////////
    // 31. Login Tester2 and change text
    casper.then( function() {
        casper.open(url + "/login/live-editor").then( function() {

            test.assertTitle( "Login - CYPHERPUNK Computer-Spielplatz", "Login: Title Computer-Spielplatz" );

            casper.fill('form', { name: name + "2" }, false);
            casper.fill('form', { password: name + "2" }, false);

            test.assertExists( "form button", "Login button" );
        } );
    });

    casper.thenClick( "form button", function() {

        this.wait(200, function() {
            test.assertTitle( "Live-Editor - CYPHERPUNK Computer-Spielplatz", "Live-Editor: Title Computer-Spielplatz" );
        });
    });
    casper.then( function() {

        casper.evaluate(function(){
            $("#project-button-textarea-for-testing").val( "// Second empty program\n" ).trigger( "set-live-editor" );
            test.assertExists( "a[href='graphics-animation']", "Graphics-animation button." );
        } );
    } );


    ///////////////////////////////////////////////////////////////////
    // 32. Jump to graphics editor and back and look if text is still there
    casper.thenClick( "a[href='graphics-animation']", function() {
        test.assertExists( "#cpg-graphics-editor-pages", "Graphics editor loaded." )
        test.assertExists( "a[href='live-editor']", "Live-editor button." );
    } );

    casper.thenClick( "a[href='live-editor']", function() {
        test.assertExists( ".cpg-live-editor-pages", "Live editor loaded." )
    } );

    casper.then( function() {
        this.wait(200, function() {
            getLiveEditorCode( function( val ) {
                test.assert( val.search( "// Second empty program" ) > -1, "Session storage with no user logged in." );
            } );
        });
    });


    ///////////////////////////////////////////////////////////////////
    // 33. Logout and Login Tester1 and change text + save

    ///////////////////////////////////////////////////////////////////
    // 34. Logout and Login Tester2 and look if there was nothing coming from session storage


    casper.run(function() {
        test.done();
    });

});



var getLiveEditorCode = function( cb ) {

    var val;

    casper.evaluate(function(){
        $("#project-button-textarea-for-testing").trigger("get-live-editor");
    } );            

    casper.then( function() {
        this.wait(200, function() {

            cb( casper.evaluate(function( ) {
                return $("#project-button-textarea-for-testing").val();
            } ) );
        } );            
    } );
}
*/;
