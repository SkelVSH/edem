
window.onload = () => {
    const sliderSm = document.querySelector('.slider__smImg-wrap');
    const sliderBig = document.querySelector('.slider__bigImg-wrap');
    const sliderContent = document.querySelector('.slider__content-wrap');
    slide(sliderBig, 'slide__big', {}, {});
    slide(sliderSm, 'slide__sm' , {}, {});
    slide(sliderContent, 'slider__content-item' , {}, {});
}


function slide(container, slideClassName , prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        slides = container.getElementsByClassName(slideClassName),
        slideSize = slides[0].offsetWidth,
        firstSlide = slides[0],
        lastSlide = slides[slides.length - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        threshold = slides[0].offsetWidth / 2,
        index = 0,
        slidesLength = slides.length;
        allowShift = true;

    container.appendChild(cloneFirst);
    container.insertBefore(cloneLast, firstSlide);

    setInterval(() => shiftSlide(1), 5000);

    // prev.addEventListener('click', function () { shiftSlide(-1) });
    // next.addEventListener('click', function () { shiftSlide(1) });

    container.addEventListener('transitionend', checkIndex);

    function dragStart (e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = container.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction (e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }

        container.style.left = (container.offsetLeft - posX2) + "px";
    }

    function dragEnd (e) {
        posFinal = container.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            container.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }

    function shiftSlide(dir = 1, action) {
        container.classList.add('shifting');

        if (allowShift) {
            if (!action) { posInitial = container.offsetLeft; }

            if (dir == 1) {
                container.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                container.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        };

        // allowShift = false;
    }

    function checkIndex (){
        container.classList.remove('shifting');

        if (index <= -1) {
            container.style.left = -(slidesLength * (slideSize)) + "px";
            index = slidesLength - 1;
        }

        if (index >= slidesLength) {
            container.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}