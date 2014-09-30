define(function(require){
    var $ = require('jquery'),
        helper = require('helpers/helper');

    return {
        SYMBOLS_LAYOUT_RU: ['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'],
        SYMBOLS_LAYOUT_EN: ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'],
        STANDARD_SYMBOLS: ['`','1','2','3','4','5','6','7','8','9','0','-','=','[',']','\\',';','\'',',','.','/','~','!','@','#','$','%','^','&','*','(',')','_','+','{','}','|',':','"','<','>','?'],

        create: function(options) {
            !options['text'] && helper.throwError('Не задано поле text');

            return $.extend({
                text: '',
                usage: 0,
                usagePercent: 0
            }, options);
        }
    };
});