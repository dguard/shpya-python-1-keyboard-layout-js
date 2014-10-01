"use strict";
define(function(){
    return {
        throwError: function(message) {
            throw new Error(message);
        },
        rtrimNulls: function(number, count){
            return (number*1).toFixed(count).replace(/\.?0*$/, '');
        }
    };
});