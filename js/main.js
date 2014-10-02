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
    'collections/layout',
    'models/keyboard',
    'models/app',
    'models/analyzer',
    'collections/filter',
    'models/layout'
], function($, layoutCollection, keyboard, app, analyzer, filter, layout) {
    $.get('books/en_madame_bovary.txt').done(function(text){
        var theApp = app.initialize({
            text: text,
            view: { "$container": $('.keyboard-container') }
        });
        analyzer.analyze(text, theApp.keyboard.layout);
        theApp.view.render();
        theApp.view.renderOutput($('.console__output'));
    });
});