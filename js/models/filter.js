define(function (require) {
    var helper = require('helpers/helper');

    return {
        create: function(options){
            options['run'] && helper.throwError('Не задана функция run');

            return $.extend({
                run: function(){}
            }, options);
        }
    };
});