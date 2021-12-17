$(function () {
    const header = $('#header');
    $(window).scroll(function () {
        window.scrollY === 0 ? header.removeClass('show') : header.addClass('show');
    })
})