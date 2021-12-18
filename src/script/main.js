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
// Playlist handler =============
$(function () {
    (function () {
        const songs = [
            {
                name: 'Savage Love',
                songSRC: './assets/musics/SavageLove.mp3',
                thumbSRC: './assets/images/song_savage-love.jpg',
                singer: 'BTS',
            },
            {
                name: 'Heartbeat',
                songSRC: './assets/musics/Heartbeat.mp3',
                thumbSRC: './assets/images/song_heart-beat.PNG',
                singer: 'BTS',
            },
            {
                name: 'Dream Glow',
                songSRC: './assets/musics/DreamGlow.mp3',
                thumbSRC: './assets/images/song_dream-glow.PNG',
                singer: 'BTS',
            },
            {
                name: 'Waste it on me',
                songSRC: './assets/musics/WasteItOnMe.mp3',
                thumbSRC: './assets/images/song_waste-it-on-me.jpg',
                singer: 'BTS',
            },
        ];
        // VARIABLES
        const audio = $('#main-audio');
        const thumb = $('.playlist-ctls-thumb');
        const ctlThumbIMG = thumb.children('img');
        const ctlName = $('.playlist-ctls-name');
        const playBtn = $('.play-btn');
        const pauseBtn = $('pause-btn');
        const progressBar = $('.playlist-ctls-duraction');
        const ctlSinger = $('.playlist-ctls-singer');
        const playlist = $('.play-list');
        const items = $('.play-list .item');
        const animate = thumb[0].animate([
            { transform: 'rotate(360deg)' },
        ], {
            duration: 20000,
            iterations: Infinity
        });
        animate.pause();
        progressBar[0].value = 0;
        return {
            index: 0,
            activeItem() {
                return $('.item.active');
            },
            items() {
                return $('.play-list .item');
            },
            renderSong() {
                const htmls = songs.reduce((acc, item, index) => {
                    return acc + `
                      <div class="item ${this.index == index ? "active" : ""}" data-index="${index}">
                  <div class="item-head">
                    <div class="item-thumb">
                      <img src="${item.thumbSRC}" alt="" />
                    </div>
                    <div class="song-name">${item.name}</div>
                  </div>
                  <div class="song-singer">${item.singer}</div>
                  <div class="song-duration">3:20</div>
                  <div class="song-heart">
                    <i class="fas fa-heart"></i>
                  </div>
                </div>
                    `;;
                }, '')
                playlist[0].innerHTML = htmls;

            },
            renderCtl() {
                const activeSong = songs[this.index];
                ctlThumbIMG.attr('src', activeSong.thumbSRC);
                ctlName.text(`${activeSong.name}`);
                ctlSinger.text(`${activeSong.singer}`);
                audio.attr('src', activeSong.songSRC);
            },
            mainHandler() {
                const _this = this;
                this.items().click(function () {
                    _this.index = $(this)[0].dataset.index;
                    _this.activeItem().removeClass('active');
                    $(this).hasClass('active') || $(this).addClass('active');
                    _this.renderCtl();

                    audio[0].play();
                    animate.play();
                    playBtn.hasClass('playing') || playBtn.addClass('playing');

                })
                // PLAY CLICKED
                playBtn.click(function () {
                    $(this).toggleClass('playing');
                    if ($(this).hasClass('playing')) {
                        audio[0].play()
                        animate.play();
                    } else {
                        audio[0].pause()
                        animate.pause();
                    }
                })
            },
            run() {
                this.renderSong();
                this.renderCtl();
                this.mainHandler();
            }
        }
    })().run();
})