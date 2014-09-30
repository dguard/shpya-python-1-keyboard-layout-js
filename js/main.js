require.config({
    baseUrl: 'js',
    paths: {
        jquery: '../vendor/jquery'
    }
});
require(["jquery", 'collections/layout', 'views/keyboard'], function($, layout, keyboard) {
    var kb = keyboard.initialize({
        '$container': $('.keyboard-container'),
        layout: layout.LAYOUT_YACUKEN
    }).render('text');

    var text = "Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации \"Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст..\" Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам \"lorem ipsum\" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).";
    var $output = $('.console__output');
    highlightKey(text, 0);

    function highlightKey(text, index){
        var $dfd = kb.highlightKey('text', text[index]);
        $dfd.done(function(data){
            if(data.key) {
                $output.append(data.key['text']);
                $output.scrollTop($output[0].scrollHeight - $output.height());
            }
            if(index < text.length-1) {
                highlightKey(text, index+1);
            }
        });
    }
});