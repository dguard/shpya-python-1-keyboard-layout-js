"use strict";
define(function(require){
    var layout = require('models/layout'),
        keyboardView = require('views/keyboard');

    var obj = {
        LAYOUT_TYPE_QWERTY: 0,
        LAYOUT_TYPE_COLEMAK: 1,
        LAYOUT_TYPE_DWORAK: 2
    }, items = [];

    var KEY_ENTER = {"text": '\n', "size": keyboardView.SIZE_MEDIUM};
    var KEY_SPACE = {"text": ' ', "size": keyboardView.SIZE_LARGE};

    obj['LIST_LAYOUT_TYPE'] = [
        obj.LAYOUT_TYPE_QWERTY,
        obj.LAYOUT_TYPE_COLEMAK,
        obj.LAYOUT_TYPE_DWORAK
    ];
    items[obj.LAYOUT_TYPE_QWERTY] = layout.create({
        name: 'QWERTY',
        language: layout.LANGUAGE_EN,
        keys: {
            standard: [
                ['`','1','2','3','4','5','6','7','8','9','0','-','='],
                ['q','w','e','r','t','y','u','i','o','p','[',']','\\'],
                ['a','s','d','f','g','h','j','k','l',';','\'', KEY_ENTER],
                ['z','x','c','v','b','n','m',',','.','/'],
                [KEY_SPACE],
            ],
            uppercase: [
                ['~','!','@','#','$','%','^','&','*','(',')','_','+'],
                ['Q','W','E','R','T','Y','U','I','O','P','{','}','|'],
                ['A','S','D','F','G','H','J','K','L',':','"'],
                ['Z','X','C','V','B','N','M','<','>','?']
            ]
        }
    });
    items[obj.LAYOUT_TYPE_COLEMAK] = layout.create({
        name: 'COLEMAK',
        language: layout.LANGUAGE_EN,
        keys: {
            standard: [
                ['`','1','2','3','4','5','6','7','8','9','0','-','='],
                ['q','w','f','p','g','j','l','u','y',';','[',']','\\'],
                ['a','r','s','t','d','h','n','e','i','o','\'', KEY_ENTER],
                ['z','x','c','v','b','k','m',',','.','/'],
                [KEY_SPACE],
            ],
            uppercase: [
                ['~','!','@','#','$','%','^','&','*','(',')','_','+'],
                ['Q','W','F','P','G','J','L','U','Y',':','{','}','|'],
                ['A','R','S','T','D','H','N','E','I','O','"'],
                ['Z','X','C','V','B','K','M','<','>','?']
            ]
        }
    });
    items[obj.LAYOUT_TYPE_DWORAK] = layout.create({
        name: 'DWORAK',
        language: layout.LANGUAGE_EN,
        keys: {
            standard: [
                ['`','1','2','3','4','5','6','7','8','9','0','-','='],
                ['\'',',','.','p','y','f','g','c','r','l','/','=','\\'],
                ['a','o','e','u','i','d','h','t','n','s','-', KEY_ENTER],
                [';','q','j','k','x','b','m','w','v','z'],
                [KEY_SPACE],
            ],
            uppercase: [
                ['~','!','@','#','$','%','^','&','*','(',')','_','+'],
                ['"','<','>','P','Y','F','G','C','R','L','?','+','|'],
                ['A','O','E','U','I','D','H','T','N','S','_'],
                [':','Q','J','K','X','B','M','W','V','Z']
            ]
        }
    });
    obj['items'] = items;
    return obj;
//        LAYOUT_YACUKEN: layout.create({
//            id: 1,
//            language: layout.LANGUAGE_RU,
//            keys: {
//                standard: [
//                    ['ё','1','2','3','4','5','6','7','8','9','0','-','='],
//                    ['й','ц','у','к','е','н','г','ш','щ','з','х','ъ','\''],
//                    ['ф','ы','в','а','п','р','о','л','д','ж','э'],
//                    ['я','ч','с','м','и','т','ь','б','ю','.'],
//                    [' ']
//                ],
//                uppercase: [
//                    ['Ё','!','"','№',';','%',':','?','*','(',')','_','+'],
//                    ['Й','Ц','У','К','Е','Н','Г','Ш','Щ','З','Х','Ъ','/'],
//                    ['Ф','Ы','В','А','П','Р','О','Л','Д','Ж','Э'],
//                    ['Я','Ч','С','М','И','Т','Ь','Б','Ю',','],
//                    [' ']
//                ]
//            }
//        })
//    }
});