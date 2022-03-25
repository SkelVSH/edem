document.addEventListener('DOMContentLoaded', () => {
  const slider = new Swiper('.blog-slider', {
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
      nextEl: '.blog-slider__arrow.next',
      prevEl: '.blog-slider__arrow.prev'
    }
  })
})