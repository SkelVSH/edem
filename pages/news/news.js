document.addEventListener('DOMContentLoaded', () => {
  const categories = document.querySelector('.news-tags')
  const allCategoriesButton = categories.querySelector('.news-tags__item#all_categories')
  const categoryButtons = categories.querySelectorAll('.news-tags__item:not(#all_categories)')

  const allChecked = (categoryButtonClicked) => {
    if (categoryButtonClicked) {
      for (let elem of categoryButtons) {
        if (!elem.classList.contains('active')) {
          return
        }
      }
    }

    for (let elem of categoryButtons) {
      elem.classList.remove('active')
    }

    allCategoriesButton.classList.add('active')
  }

  const noneChecked = () => {
    for (let elem of categoryButtons) {
      if (elem.classList.contains('active')) {
        return
      }
    }

    allCategoriesButton.classList.add('active')
  }

  for (let elem of categoryButtons) {
    elem.addEventListener('click', () => {
      if (elem.classList.contains('active')) {
        elem.classList.remove('active')
        noneChecked()
      }
      else {
        elem.classList.add('active')
        allCategoriesButton.classList.remove('active')

        allChecked(true)
      }
    })
  }

  allCategoriesButton.addEventListener('click', () => allChecked(false))
})