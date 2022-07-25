document.addEventListener('DOMContentLoaded', () => {
  const findModification = (offerId, params) => {
    const offer = PRICE_TABLE.find(elem => elem.id === Number(offerId))
    const modification = offer.modifications.find(elem => {
      let isCorrect = true
      for (let [key, value] of params.entries()) {
        if (elem[key] !== Number(value)) {
          isCorrect = false
        }
      }
      return isCorrect
    })

    return modification
  }

  document.addEventListener('change', (e) => {
    const modButton = e.target.closest('.snippet-switch__label')
    if (!modButton) {
      return
    }
    const input = modButton.querySelector('input')
    if (!!input.getAttribute('disabled') || !!input.getAttribute('checked')) {
      return
    }
    const snippet = modButton.closest('.snippet')
    const offerId = snippet.dataset.id
    const switches = snippet.querySelectorAll('.js-snippet-switch')
    const params = new Map()
    const buttonBlocks = snippet.querySelectorAll('.js-snippet-buttons')
    switches.forEach(elem => {
      const checkedInput = elem.querySelector('input:checked')
      const checkedInputName = checkedInput.getAttribute('name')
      const checkedInputValue = checkedInput.getAttribute('value')
      params.set(checkedInputName, checkedInputValue)
    })

    const requiredModification = findModification(offerId, params)
    const priceNode = snippet.querySelector('.js-snippet-price')
    const statusNode = snippet.querySelector('.js-snippet-status')
    priceNode.innerHTML = requiredModification.printPrice
    statusNode.innerHTML = requiredModification.printStatus
    const status = input.classList.contains('in_cart') ? "in_cart" : requiredModification.status
    buttonBlocks.forEach(block => block.classList.remove('active'))
    if (status !== "none") {
      snippet.querySelector(`.js-snippet-buttons-${status}`).classList.add('active')
    }
  })

  document.addEventListener('click', (e) => {
    const addToCartButton = e.target.closest('.js-add-to-cart')
    if (!addToCartButton) {
      return
    }

    const snippet = addToCartButton.closest('.snippet')
    const buttonBlocks = snippet.querySelectorAll('.js-snippet-buttons')
    const activeInput = snippet.querySelector('input:checked')
    activeInput?.classList.add('in_cart')
    buttonBlocks.forEach(block => block.classList.remove('active'))
    snippet.querySelector('.js-snippet-buttons-in_cart').classList.add('active')
  })
})