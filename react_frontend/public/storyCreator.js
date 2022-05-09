$("#btnDelete").click(function () {
    var answer = window.confirm("By countinuing your progress will be lost? Plese confirm:");
    if (answer) {
        $('.cont').css('display', 'block');
        $('.home').css('background-color', 'rgba(255, 107, 129,.2)');
        $('#content').css('background-color', 'rgba(255, 107, 129,.2)');
        setTimeout(function () {
            $('.cont').css('display', 'none');
            $('.home').css('background-color', '#E4E9F7');
            $('#content').css('background-color', 'white');
        }, 5000)
    }
});