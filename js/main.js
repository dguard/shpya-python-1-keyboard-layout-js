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
    var theApp = app.initialize({
        view: { "$container": $('.keyboard-container') }
    });
    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    analyzer.analyze(text, theApp.keyboard.layout);
    theApp.view.render();

    theApp.view.renderOutput($('.console__output'), text);
});