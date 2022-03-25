document.addEventListener('DOMContentLoaded', () => {
  const forms = document.querySelectorAll('.js-form')

  const getMinLenght = (name) => {
    if (name === 'name') return 2
    if (name === 'phone') return 19
    return 0
  }

  const setValid = (label) => {
    label.classList.add('js-valid')
    label.classList.remove('js-invalid')
  }

  const setInvalid = (label) => {
    label.classList.add('js-invalid')
    label.classList.remove('js-valid')
  }

  const validateInput = (input) => {
    const label = input.parentNode
    const hint = label.querySelector('.form-hint')
    const validLength = getMinLenght(input.getAttribute('name'))

    if (input.value.length === 0) {
      setInvalid(label)
      hint.innerHTML = '*обязательное поле'
      return
    }

    if (input.value.length < validLength) {
      setInvalid(label)
      hint.innerHTML = 'неверное количество символов'
      return
    }

    setValid(label)
  }

  const checkAllValid = (requiredInputLabels, submitButton) => {
    for (let label of requiredInputLabels) {
      if (!label.classList.contains('js-valid')) {
        submitButton.disabled = true
        return
      }
    }
    submitButton.disabled = false
  }

  const validateOnClick = (requiredInputLabels) => {
    for (let label of requiredInputLabels) {
      const input = label.querySelector('input')
      validateInput(input)
    }
  }

  const setCursorPosition = (position, element) => {
    element.focus();
    if (element.setSelectionRange) {
      element.setSelectionRange(position, position);
    }
    else if (element.createTextRange) {
      const range = element.createTextRange();
      range.collapse(true);
      range.moveEnd('character', position);
      range.moveStart('character', position);
      range.select()
    }
  }

  const masking = (event) => {
    const input = event.target
    const matrix = '+375 (__) ___ __ __'
    const def = matrix.replace(/\D/g, '')
    let value = input.value.replace(/\D/g, '')
    let i = 0

    if (def.length >= value.length) {
      value = def;
    }

    input.value = matrix.replace(/./g, (string) => {
      return /[_\d]/.test(string) && i < value.length ? value.charAt(i++) : i >= value.length ? '' : string
    })

    if (event.type === 'blur') {
      if (input.value.length === 2) input.value = ''
    }
    else {
      setCursorPosition(input.value.length, input)
    }
  }

  const addMask = (input) => {
    input.addEventListener('input', masking, false);
    input.addEventListener('focus', masking, false);
    input.addEventListener('blur', masking, false);
  }

  const initPhoneInputs = (labelArr) => {
    for (let label of labelArr) {
      const input = label.querySelector('input')
      if (input.getAttribute('name') === 'phone') {
        addMask(input)
      }
    }
  }

  const initValidation = (requiredInputLabels, submitButton) => {
    for (let label of requiredInputLabels) {
      const input = label.querySelector('input')
      input.addEventListener('focusout', () => validateInput(input))
      input.addEventListener('keyup', () => {
        validateInput(input)
        label.classList.remove('js-invalid')
        checkAllValid(requiredInputLabels, submitButton)
      })
    }
  }

  const gatherData = (inputsArr) => {
    const data = new Map()
    for (let input of inputsArr) {
      data.set(input.getAttribute('name'), input.value)
    }
    return Object.fromEntries(data)
  }

  for (let form of forms) {
    const submitButton = form.querySelector('.form-submit')
    const submitCover = form.querySelector('.form-submit-cover')
    const requiredInputLabels = form.querySelectorAll('.js-required')
    const inputsArr = form.querySelectorAll('.form-input')

    initPhoneInputs(requiredInputLabels)
    initValidation(requiredInputLabels, submitButton)

    submitButton.addEventListener('click', (e) => {
      e.preventDefault()
      const data = gatherData(inputsArr)

      // input data send here
      console.log(data)

    })

    submitCover.addEventListener('click', () => validateOnClick(requiredInputLabels))
  }
})