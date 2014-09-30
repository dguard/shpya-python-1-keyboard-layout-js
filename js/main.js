require.config({
    baseUrl: 'js',
    paths: {
        jquery: '../vendor/jquery'
    }
});
require(["jquery", 'collections/layout', 'views/keyboard'], function($, layout, keyboard) {
    var kb = keyboard.initialize({
        '$container': $('.keyboard-container'),
        layout: layout.LAYOUT_QWERTY
    }).render('text');

    var text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";
    var $output = $('.console__output');
    highlightKey(text, 0);

    function highlightKey(text, index){
        var $dfd = kb.highlightKey('text', text[index]);
        $dfd.done(function(data){
            $output.append(data.key['text']);
            $output.scrollTop($output[0].scrollHeight - $output.height());
            if(index < text.length-1) {
                highlightKey(text, index+1);
            }
        });
    }
});