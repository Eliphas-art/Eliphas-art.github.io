function slll(sliders, bull) {
    let slider = sliders,
        sliderList = slider.querySelector('.slider-list'),
        sliderTrack = slider.querySelector('.slider-track'),
        slides = slider.querySelectorAll('.slide'),
        arrows = slider.querySelector('.slider-arrows'),
        prev = arrows.children[0],
        next = arrows.children[1],
        slideWidth = slides[0].offsetWidth,
        slideIndex = 0,
        posInit = 0,
        posX1 = 0,
        posX2 = 0,
        posY1 = 0,
        posY2 = 0,
        posFinal = 0,
        isSwipe = false,
        isScroll = false,
        allowSwipe = true,
        transition = true,
        nextTrf = 0,
        prevTrf = 0,
        lastTrf = --slides.length * slideWidth,
        posThreshold = slides[0].offsetWidth * 0.35,
        trfRegExp = /([-0-9.]+(?=px))/,
        getEvent = function() {
            return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        },
        slide = function() {
            if (transition) {
                sliderTrack.style.transition = 'transform .5s';
            }
            sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;

            prev.classList.toggle('disabled', slideIndex === 0);
            next.classList.toggle('disabled', slideIndex === --slides.length);
        },
        swipeStart = function() {
            let evt = getEvent();

            if (allowSwipe) {

                transition = true;

                nextTrf = (slideIndex + 1) * -slideWidth;
                prevTrf = (slideIndex - 1) * -slideWidth;

                posInit = posX1 = evt.clientX;
                posY1 = evt.clientY;

                sliderTrack.style.transition = '';

                slider.addEventListener('touchmove', swipeAction);
                slider.addEventListener('mousemove', swipeAction);
                slider.addEventListener('touchend', swipeEnd);
                slider.addEventListener('mouseup', swipeEnd);

                sliderList.classList.remove('grab');
                sliderList.classList.add('grabbing');
            }
        },
        swipeAction = function() {

            let evt = getEvent(),
                style = sliderTrack.style.transform,
                transform = +style.match(trfRegExp)[0];

            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;

            posY2 = posY1 - evt.clientY;
            posY1 = evt.clientY;

            if (!isSwipe && !isScroll) {
                let posY = Math.abs(posY2);
                if (posY > 7 || posX2 === 0) {
                    isScroll = true;
                    allowSwipe = false;
                } else if (posY < 7) {
                    isSwipe = true;
                }
            }

            if (isSwipe) {
                if (slideIndex === 0) {
                    if (posInit < posX1) {
                        setTransform(transform, 0);
                        return;
                    } else {
                        allowSwipe = true;
                    }
                }

                // запрет ухода вправо на последнем слайде
                if (slideIndex === --slides.length) {
                    if (posInit > posX1) {
                        setTransform(transform, lastTrf);
                        return;
                    } else {
                        allowSwipe = true;
                    }
                }

                if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                    reachEdge();
                    return;
                }

                sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
            }

        },
        swipeEnd = function() {
            posFinal = posInit - posX1;

            isScroll = false;
            isSwipe = false;

            slider.removeEventListener('touchmove', swipeAction);
            slider.removeEventListener('mousemove', swipeAction);
            slider.removeEventListener('touchend', swipeEnd);
            slider.removeEventListener('mouseup', swipeEnd);

            sliderList.classList.add('grab');
            sliderList.classList.remove('grabbing');

            if (allowSwipe) {
                if (Math.abs(posFinal) > posThreshold) {
                    if (posInit < posX1) {
                        slideIndex--;
                    } else if (posInit > posX1) {
                        slideIndex++;
                    }
                }

                if (posInit !== posX1) {
                    allowSwipe = false;
                    slide();
                } else {
                    allowSwipe = true;
                }

            } else {
                allowSwipe = true;
            }

        },
        setTransform = function(transform, comapreTransform) {
            if (transform >= comapreTransform) {
                if (transform > comapreTransform) {
                    sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
                }
            }
            allowSwipe = false;
        },
        reachEdge = function() {
            transition = false;
            swipeEnd();
            allowSwipe = true;
        };

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    sliderList.classList.add('grab');

    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
    slider.addEventListener('mousedown', swipeStart);
    let interval,setTime;

    interval = setInterval(() => {
        intervalFunc()
    }, 8000);

    arrows.addEventListener('click', function(e) {
        clearInterval(interval);
        clearTimeout(setTime);
        let target = e.target;
        if (target.classList.contains('fa-long-arrow-alt-right')) {

            slideIndex++;
        } else if (target.classList.contains('fa-long-arrow-alt-left')) {
            slideIndex--;
        } else {
            return;
        }
        setTime= setTimeout(()=>{
            interval= setInterval(()=>{
                intervalFunc()
            },8000)
        },2000);
        slide();
    });
    function intervalFunc() {
        slideIndex++;
        slide();
    }

    // arrows.children[0].addEventListener('click', function(e) {
    //     console.log(e.target);
    //     console.log(e.currentTarget);
    //     console.log(arrows.children[0].classList.contains('next'));
    //     if (arrows.children[0].classList.contains('prev')) {
    //         slideIndex--;
    //     } else {
    //         return;
    //     }
    //     slide();
    // });
    // arrows.children[1].addEventListener('click', function(e) {
    //     if (arrows.children[1].classList.contains('next')) {
    //         slideIndex++;
    //     } else {
    //         return;
    //     }
    //     slide();
    // })
}

function sliderBar() {
    const slidersList = document.querySelectorAll(".slider");
    for (let i = 0; i < slidersList.length; i++) {
        slll(slidersList[i], i);
    }
}

sliderBar();
