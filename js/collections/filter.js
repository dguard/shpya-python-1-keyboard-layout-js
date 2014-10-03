"use strict";
define(function(require){
    var $ = require('jquery'),
        filter = require('models/filter');

    var obj = {
        FILTER_TYPE_MIDDLE_ROW: 0,
        FILTER_TYPE_LONG_FINGER: 1,
        FILTER_TYPE_UNNAMED_FINGER: 2,
        FILTER_TYPE_CENTER_ACTIVITY: 3,
        FILTER_TYPE_CHANGE_HANDS: 4,
        FILTER_TYPE_RIGHT_HAND: 5,
        FILTER_TYPE_THUMB_FINGER: 6
    }, items = [];

    obj['LIST_FILTER_TYPE'] = [
        obj.FILTER_TYPE_MIDDLE_ROW,
        obj.FILTER_TYPE_LONG_FINGER,
        obj.FILTER_TYPE_UNNAMED_FINGER,
        obj.FILTER_TYPE_CENTER_ACTIVITY,
        obj.FILTER_TYPE_CHANGE_HANDS,
        obj.FILTER_TYPE_RIGHT_HAND,
        obj.FILTER_TYPE_THUMB_FINGER
    ];
    items[obj.FILTER_TYPE_MIDDLE_ROW] = filter.create({
        name: 'Пальцы редко убегают из среднего ряда',
        countMultiplier: function(key){
            if(key['posY'] === 2) {
                return 1;
            } else {
                return 0.5;
            }
        }
    });
    items[obj.FILTER_TYPE_LONG_FINGER] = filter.create({
        name: 'Работают указательные пальцы',
        listPos: [
            [4,5,6,7,8],
            [3,4,5,6],
            [3,4,5,6],
            [2,3,4,5,6],
            []
        ]
    });
    items[obj.FILTER_TYPE_UNNAMED_FINGER] = filter.create({
        name: 'Работают безымянные пальцы',
        listPos: [
            [1,10],
            [1,8],
            [1,8],
            [1,8],
            []
        ]
    });
    items[obj.FILTER_TYPE_CENTER_ACTIVITY] = filter.create({
        name: 'Наибольшая активность сосредоточена в центре клавиатуры',
        listPos: [
            [],
            [2,3,4,5,6,7],
            [2,3,4,5,6,7],
            [2,3,4,5,6,7],
            []
        ]
    });
    items[obj.FILTER_TYPE_RIGHT_HAND] = filter.create({
        name: 'Правая рука задействована чуть больше, чем левая',
        defaultMultiplier: 0.8,
        listPos: [
            [7,8,9,10,11,12],
            [5,6,7,8,9,10,11,12],
            [5,6,7,8,9,10,11],
            [5,6,7,8,9],
            [0]
        ]
    });
    items[obj.FILTER_TYPE_CHANGE_HANDS] = filter.create({
        name: 'Эффективное чередование рук',
        defaultMultiplier: 0.8,
        leftHand: [
            [0,1,2,3,4,5,6],
            [0,1,2,3,4],
            [0,1,2,3,4],
            [0,1,2,3,4],
            []
        ],
        rightHand: [
            [7,8,9,10,11,12],
            [5,6,7,8,9,10,11],
            [5,6,7,8,9,10],
            [5,6,7,8,9],
            []
        ],
        handsAreChanged: function(previousKey, currentKey){
            var isRightHand = this.isRightHand(previousKey);
            var isLeftHand = this.isLeftHand(currentKey);
            return (isRightHand && isLeftHand) || (!isRightHand && !isLeftHand);
        },
        isRightHand: function(key){
            for(var i = 0; i < this.rightHand.length; i++) {
                for(var j = 0; j < this.rightHand[i].length; j++) {
                    if(i === key.posY && this.rightHand[i][j] === key.posX) {
                        return true;
                    }
                }
            }
            return false;
        },
        isLeftHand: function(key){
            for(var i = 0; i < this.leftHand.length; i++) {
                for(var j = 0; j < this.leftHand[i].length; j++) {
                    if(i === key.posY && this.leftHand[i][j] === key.posX) {
                        return true;
                    }
                }
            }
            return false;
        }
    });
    items[obj.FILTER_TYPE_THUMB_FINGER] = filter.create({
        name: 'Работают большие пальцы',
        defaultMultiplier: 0.8,
        listPos: [
            [],
            [],
            [],
            [],
            [0]
        ]
    });
    obj['items'] = items;
    return obj;
});