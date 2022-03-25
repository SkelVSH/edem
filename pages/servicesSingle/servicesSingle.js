document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.order_call')
  const sendButton = form.querySelector('.send_button')
  const successMessageWrap = document.querySelector('.send_success__wrap')
  const successMessageCloseButtons = successMessageWrap.querySelectorAll('.dismiss_button')
  const inputs = form.querySelectorAll('.form_input')

  const showSuccessMessage = () => {
    successMessageWrap.classList.add('active')
    setTimeout(() => {
      successMessageWrap.classList.add('fade')
    }, 0)
  }

  const dismissSuccessMessage = () => {
    successMessageWrap.classList.remove('fade')
    setTimeout(() => {
      successMessageWrap.classList.remove('active')
    }, 300)
  }

  //сделать реальную проверку
  const handleInput = (e) => {
    sendButton.classList.remove('disabled')
  }
  
  for (let elem of inputs) {
    elem.onkeydown = elem.onkeyup = handleInput
  }

    for (let elem of successMessageCloseButtons) {
      elem.addEventListener('click', (e) => {
        e.preventDefault()
        dismissSuccessMessage()
      })
    }

  sendButton.addEventListener('click', (e) => {
    e.preventDefault()
    //добавить проверку
    //добавить отправку
    if (!sendButton.classList.contains('disabled')) {
      showSuccessMessage()
    }
  })

  successMessageWrap.addEventListener('click', (e) => {
    if (e.target.classList.contains('send_success__wrap')) {
      dismissSuccessMessage()
    }
  })

})