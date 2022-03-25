document.addEventListener('DOMContentLoaded', () => {
  const accordions = document.querySelectorAll('.terms-list__acc')

  accordions.forEach(accordion => {
    accordion.addEventListener('click', function () {
      this.classList.toggle('acc-active')
      const content = this.nextElementSibling
      if (content.style.maxHeight) {
        content.style.maxHeight = null
      }
      else {
        let marginBottomIncrease = 48  // отступ от конца статьи до следующего аккордеона
        content.style.maxHeight = content.scrollHeight + "px"
        content.style.height = content.scrollHeight + "px"
      }
    })
  })
})