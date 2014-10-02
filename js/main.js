"use strict";
require.config({
    baseUrl: 'js',
    paths: {
        "jquery": '../vendor/jquery',
        "localStorage": '../vendor/jquery.localStorage'
    }
});
require([
    "jquery",
    'models/app',
], function($, app) {
    $.get('books/en_madame_bovary.txt').done(function(text){
        var theApp = app.initialize({
            text: text,
            view: { "$container": $('.keyboard-container') }
        });
        theApp.run();
    });
});