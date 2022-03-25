document.addEventListener('DOMContentLoaded', () => {
  const body = document.querySelector('body')
  const imagesWrap = body.querySelector('.documents')
  const popup = body.querySelector('.documents_popup__wrap')
  const closePopupButton = popup.querySelector('.documents_popup__close')
  const popupImage = popup.querySelector('.documents_popup__img')
  const mobileFooter = body.querySelector('.bottomMenu')

  const closePopup = () => {
    mobileFooter.classList.remove('hide_borders')
    popup.classList.remove('fade')
    body.classList.remove('body--fixed')
    setTimeout(() => {
      popup.classList.remove('show_popup')
    }, 300)
  }

  const openPopup = (imageSource) => {
    mobileFooter.classList.add('hide_borders')
    body.classList.add('body--fixed')
    popupImage.setAttribute('src', imageSource)
    popup.classList.add('show_popup')
    setTimeout(() => {
      popup.classList.add('fade')
    }, 0)
  }

  popup.addEventListener('click', (e) => {
    if (e.target === popup || e.target === closePopupButton) {
      closePopup()
    }
  })

  imagesWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('documents-item__img')) {
      openPopup(e.target.getAttribute('src'))
    }
  })
})