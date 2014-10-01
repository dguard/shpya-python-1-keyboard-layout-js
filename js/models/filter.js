"use strict";
define(function (require) {
    var $ = require('jquery'),
        helper = require('helpers/helper');

    return {
        create: function(options){
            return $.extend({
                run: function(keys){
                    var self = this;
                    $.map(keys, function(item, index){
                        keys[index].rate = item['rate'] * self.countMultiplier(item);
                    });
                },
                defaultMultiplier: 0.5,
                listPos: [],
                countMultiplier: function(key){
                    for(var i = 0; i < this.listPos.length; i++) {
                        for(var j = 0; j < this.listPos[i].length; j++) {
                            if(i === key['posY'] && this.listPos[i][j] === key['posX']) {
                                return 1;
                            }
                        }
                    }
                    return this.defaultMultiplier;
                }
            }, options);
        }
    };
});