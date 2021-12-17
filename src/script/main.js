// HEADER HANDLER
$(function () {
    const header = $('#header');
    $(window).scroll(function () {
        window.scrollY === 0 ? header.removeClass('show') : header.addClass('show');
    })
})
// ABOUT US HANDLER
$(window).on('load', function () {
    const slideContainer = $('.slide-list')
    let slideItems = $(".slide-item")
    const leftBtn = $('.left-btn');
    const rightBtn = $('.right-btn');
    let index = 1;
    let timerID;
    const duration = 3000;
    // PRETREATMENT ========================
    const firstClone = slideItems[0].cloneNode(true);
    const lastClone = slideItems[slideItems.length - 1].cloneNode(true);
    firstClone.id = 'firstClone';
    lastClone.id = 'lastClone';
    slideContainer.append(firstClone);
    slideContainer.prepend(lastClone);
    const slideWidth = slideItems[0].clientWidth;
    slide();
    autoSlide();
    function slide(isTransition = true) {
        slideContainer.css({
            transform: `translateX(-${slideWidth * index}px)`,
            transition: `${isTransition ? 'all 0.6s ease-out' : 'none'}`
        })
    }
    function autoSlide() {
        timerID = setInterval(() => {
            moveToNextSlide();
        }, duration);
    }
    const updateSlides = () => { slideItems = $(".slide-item") }
    // END TRANSITION HANDLER
    slideContainer[0].addEventListener('transitionend', () => {
        updateSlides();
        const lastItem = slideItems.length - 1;
        if (index >= lastItem || slideItems[index].id === firstClone.id) {
            index = 1;
            slideContainer.css('transition', 'none')
            slide(false);
        }
        if (index < 0 || slideItems[index].id === lastClone.id) {
            index = slideItems.length - 2;
            slideContainer.css('transition', 'none')
            slide(false);
        }
    })
    // CONTROLS HANDLER  ==================== 
    function moveToNextSlide() {
        if (index >= slideItems.length - 1) return;
        updateSlides();
        index++;
        slide();
    }
    function moveToPreviousSlide() {
        if (index <= 0) return;
        updateSlides();
        index--;
        slide();
    }
    rightBtn.click(function () {
        moveToNextSlide();
        clearInterval(timerID);
        autoSlide();
    })
    leftBtn.click(function () {
        moveToPreviousSlide();
        clearInterval(timerID);
        autoSlide();
    })
})