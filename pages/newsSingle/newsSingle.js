document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.news-slider', {
    slidesPerView: 'auto',
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    breakpoints: {
      0: {
        spaceBetween: 30
      },
      768: {
        spaceBetween: 40
      },
      1280: {
        spaceBetween: 50
      }
    },
    navigation: {
      nextEl: '.news-slider__arrow.next',
      prevEl: '.news-slider__arrow.prev'
    }
  })
})