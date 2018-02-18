/** Main application file to start the client side single page app (only a stub for Ü4)
 *
 * @author Johannes Konert
 * @licence  CC BY-SA 4.0
 */

requirejs.config({
    baseUrl: "js",
    paths: {
        jquery: '_lib/jquery-1.11.3',
        underscore: '_lib/underscore-1.8.3',
        backbone: '_lib/backbone-1.2.3',
        pin: 'models/pin',
        pinview: 'views/pinView',
        pinlistview: 'views/pinList'
    },
    shim: {
        underscore: {
            exports: "_"
        },
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        pin: {
            exports: 'Pin'
        }
    }
});


//require(['backbone', 'pin'], function(Backbone) {
//onsole.log("test message"); 

// });


// AMD conform require as provided by require.js
require(['jquery','backbone', 'pin', 'pinview', 'pinlistview'],
    function($, Backbone, Pin, PinView, PinListView) {

    // TODO your first code steps here
    console.log("JavaScript is running! OK, test.");
    // see this console.log in Browser window (developer console, F12)

    var PC = new Pin.Collection();

    var AR = Backbone.Router.extend(
    {
        routes: {
            "head": "head_click",
            "pins": "pins_view"
        },

        head_click: function() {
            alert("KK");
        },

        pins_view: function() {
            PC.fetch({
                success: function( items, response) {
                    console.log("Loaded.");
                    var PLV = new PinListView(
                                {   
                                    collection: items
                                });
                    console.log(PLV.render().el);
                    console.log("Collection size: " + PC.length);

                },
                error: function() {
                    console.log("Failed");
                }
            });
        }
    });

    var app = new AR();

    // finally start tracking URLs to make it a SinglePageApp (not really needed at the moment)
    Backbone.history.start({pushState: true}); // use new fancy URL Route mapping without #

    // jquery add event on id=head
    $('#head').on("click",
    function() {
     // navigates to 'head' backbone route
        app.navigate("head", true);
    });

    $('#more').on("click",
    function() {
        app.navigate("pins", true);
    });

});
