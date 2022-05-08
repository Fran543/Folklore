//////////////ARROWS ///////////////////
///////////////////////////////
$('.rightContainer').on('click', () => {
    $('.stories').addClass('col-md-6')
    $('.stories').css('margin-left', '-50%')
    $(".second").animate({
        marginLeft: '-100%'
    }, 500);
});

$('.leftContainer').on('click', () => {
    $('.blogs').addClass('col-md-6')
    $(".blogs").animate({
        marginRight: '50%'
    }, 500);
});


//////////////INFO H1_TITLE ///////////////////
///////////////////////////////
$('.rightContainer').on('mouseover', () => {
    $('.info').html('Interactive stories')
});
$('.leftContainer').on('mouseover', () => {
    $('.info').html('Blogs')
});
$('.first').on('mouseover', () => {
    $('.info').html('My posts')
});