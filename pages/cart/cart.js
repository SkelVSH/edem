document.addEventListener('DOMContentLoaded', () => {

  const isDesktop = document.documentElement.clientWidth >= 1280

  const data = {  // must be fetched; days count from 1, months count from 0
    'years': [
      {
        'value': 2020,
        'months': [
          {
            'value': 11,
            'days': [8, 9, 10, 11, 12, 13, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
          }
        ]
      },
      {
        'value': 2021,
        'months': [
          {
            'value': 0,
            'days': [1, 2, 3, 4, 5, 7, 8, 9, 10]
          }
        ]
      }
    ]
  };

  (postcardAction = () => {
    const postcard = document.querySelector('.cart-main-postcard')
    const tabs = postcard.querySelectorAll('.cart-main-postcard__tab')
    const accordion = postcard.querySelector('.cart-main-postcard__accordion')
    const textarea = postcard.querySelector('.cart-main-postcard-own-editor__textarea')
    const symbolsLeft = postcard.querySelector('.cart-main-postcard-own__left span')
    const maxTextareaHeight = isDesktop ? 108 : 72
    const saveText = postcard.querySelector('#save_wish')
    const editText = postcard.querySelector('.cart-main-postcard-own-editor__change')
    const addOwnToOrder = postcard.querySelector('#add_own_to_order')
    const addPreparedToOrder = postcard.querySelector('#add_prepared_to_order')
    const switchTabButtons = postcard.querySelectorAll('.switch_tab')
    const postcardItem = document.querySelector('.cart-main-goods-item.postcard')
    const deletePostcard = postcardItem.querySelector('.cart-main-goods-item__delete_postcard')

    accordion.addEventListener('click', () => {
      if (postcard.classList.contains('active')) {
        postcard.classList.remove('active')
        postcard.style.maxHeight = null
        return
      }
      postcard.style.maxHeight = postcard.scrollHeight + 'px'
      postcard.classList.add('active')
    })

    const editPostcard = () => {
      textarea.style.height = textarea.scrollHeight > maxTextareaHeight ? maxTextareaHeight + 'px' : textarea.scrollHeight + 'px'
      if (textarea.scrollHeight > maxTextareaHeight || textarea.value.length > 100) {
        textarea.value = textarea.value.slice(0, textarea.value.length - 1)
      }
      symbolsLeft.innerHTML = 100 - textarea.value.length
    }

    textarea.addEventListener('keydown', editPostcard)
    textarea.addEventListener('keyup', editPostcard)

    saveText.addEventListener('click', () => {
      addOwnToOrder.disabled = false
      textarea.disabled = true
      editText.classList.add('active')
      saveText.disabled = true
    })

    editText.addEventListener('click', () => {
      textarea.disabled = false
      addOwnToOrder.disabled = true
      textarea.focus()
      editText.classList.remove('active')
      saveText.disabled = false
    })

    new Swiper('.cart-main-postcard-prepared-slider', {
      navigation: {
        nextEl: '.cart-main-postcard-prepared-slider__button.next',
        prevEl: '.cart-main-postcard-prepared-slider__button.prev'
      },
      loop: true
    })

    const switchTabs = () => {
      tabs.forEach(tab => {
        if (tab.classList.contains('active')) {
          tab.classList.remove('fade')
          setTimeout(() => {
            tab.classList.remove('active')
          }, 150)
          return
        }

        setTimeout(() => {
          tab.classList.add('active')
          setTimeout(() => {
            tab.classList.add('fade')
          }, 0)
          postcard.style.maxHeight = postcard.scrollHeight + 'px'
          textarea.focus()
        }, 150)
      })
    }

    deletePostcard.addEventListener('click', () => {
      postcardItem.classList.remove('open')
      postcard.classList.remove('close')
    })

    const addToOrder = () => {
      postcardItem.classList.add('open')
      postcard.classList.add('close')
      postcard.classList.remove('active')
      postcard.style.maxHeight = null
    }

    addOwnToOrder.addEventListener('click', addToOrder)
    addPreparedToOrder.addEventListener('click', addToOrder)
    switchTabButtons.forEach(button => button.addEventListener('click', switchTabs))

  })();

  (itemAction = () => {
    const items = document.querySelectorAll('.cart-main-goods-item:not(.postcard)')
    items.forEach(item => {
      const deleteItemButton = item.querySelector('.cart-main-goods-item__delete')

      const returnItem = () => {
        item.classList.remove('disabled')
        deleteItemButton.innerHTML = 'убрать'
      }

      const deleteItem = () => {
        item.classList.add('disabled')
        deleteItemButton.innerHTML = 'вернуть'
      }

      deleteItemButton.addEventListener('click', () => {
        if (item.classList.contains('disabled')) {
          returnItem()
          return
        }
        deleteItem()
      })
    })
  })();

  (pointSmallPopupAction = () => {
    const openPopupLinks = document.querySelectorAll('.open_popup_link')
    const popups = document.querySelectorAll('.point__small_popup')
    const pickupPopup = document.querySelector('.point__small_popup.pickup')
    //const datepickerPopup = document.querySelector('.point__small_popup.datepicker_popup')

    const closePopup = (link) => {
      link.classList.remove('fade')
      setTimeout(() => link.classList.remove('active'), 300)
    }

    const popupLinkClicked = (elem) => {
      if (elem.classList.contains('active')) {
        closePopup(elem)
        return
      }
      elem.classList.add('active')
      setTimeout(() => elem.classList.add('fade'), 0)
    }

    openPopupLinks.forEach(elem => {
      const link = elem.querySelector(':scope > span')
      const arrow = elem.querySelector(':scope > svg')
      link.addEventListener('click', (e) => popupLinkClicked(elem))
      arrow.addEventListener('click', (e) => popupLinkClicked(elem))
    })

    const pickupResult = pickupPopup.parentElement.querySelector(':scope > span')

    pickupResult.nextElementSibling.value = pickupResult.innerHTML
    pickupPopup.addEventListener('click', (e) => {
      if (e.target.classList.contains('c-link')) {
        pickupResult.innerHTML = e.target.innerHTML
        pickupResult.nextElementSibling.value = e.target.innerHTML

        const temp = pickupPopup.querySelector('p').innerHTML
        pickupPopup.querySelector('p').innerHTML = e.target.innerHTML
        e.target.innerHTML = temp
      }
    })

    popups.forEach(popup => {
      popup.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
          popup.parentElement.querySelector(':scope > span').click()
        }
      })
    })
  })();

  (pointTablePopupAction = () => {
    const body = document.querySelector('body')
    const link = document.querySelector('.cart-main-point__table_link')
    const tablePopup = document.querySelector('.cart-main-point__table_popup__wrap')
    const tableOuter = tablePopup.querySelector('.cart-main-point__table_popup__outer')
    const tableClose = tablePopup.querySelector('svg')

    const closeTablePopup = () => {
      tablePopup.classList.remove('fade')
      body.classList.remove('body-fixed')
      setTimeout(() => tablePopup.classList.remove('active'), 300)
    }

    link.addEventListener('click', () => {
      tablePopup.classList.add('active')
      setTimeout(() => tablePopup.classList.add('fade'), 0)
      body.classList.add('body-fixed')
    })

    tableClose.addEventListener('click', closeTablePopup)
    tableOuter.addEventListener('click', closeTablePopup)
  })();

  (stageControl = () => {
    const buttonWrap = document.querySelector('.cart-side-result__footer')
    const nextStageButton = buttonWrap.querySelector('.cart-side-result__order')
    const fastOrderButton = document.querySelector('.cart-side-result__fast_order')
    const clientCardButton = document.querySelector('.cart-side-client_card')

    const steps = document.querySelectorAll('.cart-main-steps-item')
    const tabs = document.querySelectorAll('.cart-main__tab')

    let lastStep = 0

    const switchTab = (i) => {
      tabs.forEach(tab => {
        tab.classList.remove('fade')
        setTimeout(() => {
          tab.classList.remove('active')
        }, 300)
      })
      setTimeout(() => {
        tabs[i].classList.add('active')
      }, 300)
      setTimeout(() => {
        tabs[i].classList.add('fade')
      }, 300)
    }

    const jumpToStep = (stepNum) => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
      for (let i = 0; i < steps.length; i++) {
        steps[i].classList.remove('current')
        steps[i].classList.remove('back')
        steps[i].classList.remove('forth')
        if (steps[i].classList.contains('visited')) {
          if (i < stepNum) {
            steps[i].classList.add('back')
          }
          if (i > stepNum) {
            steps[i].classList.add('forth')
          }
        }
      }
      steps[stepNum].classList.add('current')
      switchTab(stepNum)
    }

    for (let i = 0; i < steps.length; i++) {
      steps[i].addEventListener('click', () => {
        jumpToStep(i)
      })
    }

    nextStageButton.addEventListener('click', () => {
      if (!nextStageButton.classList.contains('validate') || nextStageButton.classList.contains('validate') && nextStageButton.classList.contains('allow')) {
        nextStageButton.classList.remove('allow')
        if (lastStep < steps.length - 1) {
          steps[lastStep].classList.add('done')
          lastStep += 1
          steps[lastStep].classList.add('visited')
          jumpToStep(lastStep)
          switchTab(lastStep)
          steps[lastStep].classList.add('current')
        }
        fastOrderButton.style.display = 'none'
        clientCardButton.style.display = 'none'
      }
    })
  })();

  (radioAccordionsAction = () => {
    const triggers = document.querySelectorAll('.point-accordion_trigger')
    const accordions = document.querySelectorAll('.point-accordion')

    const setDefaults = (accordion) => {
      const inputs = accordion.querySelectorAll('input')
      inputs.forEach(input => {
        input.classList.remove('js-important', 'js-validate', 'js-valid', 'js-invalid')
        /** open default accordions and clear checkboxes */
        if (
          (input.type === 'radio' && input.getAttribute('checked') !== null) ||
          (input.type === 'checkbox' && input.checked)
        ) {
          input.click()
          return
        }
        /** clear text fields */
        if (input.type === 'text') {
          input.value = ''
          if (input.nextElementSibling) input.nextElementSibling.innerHTML = ''
        }
      })
    }

    const setImportant = (accordion) => {
      const inputs = accordion.querySelectorAll('input')
      inputs.forEach(input => {
        if (input.classList.contains('js-important-hidden') && !input.parentElement.parentElement.classList.contains('cart-main-point__not_me')) {
          input.classList.add('js-important')
        }
      })
    }

    const switchAccordion = (name, id) => {
      accordions.forEach(accordion => {
        if (accordion.classList.contains(`${name}_slave`)) {
          if (accordion.classList.contains(`${id}_active`)) {
            accordion.classList.add('point-accordion--active')
            accordion.style.maxHeight = accordion.scrollHeight + 'px'
            setImportant(accordion)
            return
          }
          setDefaults(accordion)
          accordion.classList.remove('point-accordion--active')
          accordion.style.maxHeight = 0
        }
      })
    }

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        if (mutation.target.classList.contains('cart-main-point-input__error')) {
          const parentAccordion = mutation.target.closest('.point-accordion')
          const notMeAccordion = mutation.target.closest('.cart-main-point__not_me')

          if (notMeAccordion) {
            notMeAccordion.style.maxHeight = notMeAccordion.scrollHeight + 'px'
          }

          if (parentAccordion.classList.contains('point-accordion--active')) {
            parentAccordion.style.maxHeight = parentAccordion.scrollHeight + 'px'
            return
          }
          parentAccordion.style.maxHeight = 0
        }
      })
    })

    accordions.forEach(accordion => {
      observer.observe(accordion, { childList: true, subtree: true })
    })

    triggers.forEach(trigger => {
      trigger.addEventListener('change', () => {
        switchAccordion(trigger.name, trigger.id)
      })
    })
  })();

  (checkboxAccordionAction = () => {
    const checkbox = document.querySelector('#not_me')
    const parentAccordion = checkbox.closest('.point-accordion')
    const checkboxAccordion = checkbox.parentElement.nextElementSibling
    const importantInputs = Array.from(checkboxAccordion.querySelectorAll('input')).filter(input => input.classList.contains('js-important-hidden'))
    checkbox.addEventListener('change', () => {
      const observingInterval = setInterval(() => {
        if (parentAccordion.classList.contains('point-accordion--active')) {
          parentAccordion.style.maxHeight = parentAccordion.scrollHeight + 'px'
          return
        }
        parentAccordion.style.maxHeight = 0
      }, 10)
      setTimeout(() => clearInterval(observingInterval), 300)
      if (checkbox.checked) {
        checkboxAccordion.classList.add('active')
        checkboxAccordion.style.maxHeight = checkboxAccordion.scrollHeight + 'px'
        importantInputs.forEach(input => input.classList.add('js-important'))
        return
      }
      checkboxAccordion.querySelectorAll('input').forEach(input => input.value = '')
      checkboxAccordion.classList.remove('active')
      checkboxAccordion.style.maxHeight = null
      importantInputs.forEach(input => input.classList.remove('js-important'))
    })
  })();

  (datepickerAction = () => {
    const displayChosenTime = (chosenInterval) => {
      const resultContainer = document.querySelector('.timepicker__result')
      const event = new Event('keydown')
      resultContainer.value = chosenInterval
      resultContainer.classList.remove('js-invalid')
      resultContainer.classList.add('js-valid')
      resultContainer.dispatchEvent(event)
    }

    const putIntervals = (intervals) => {
      const intervalsWrap = document.querySelector('.point__small_popup.intervals')
      const intervalNode = document.createElement('a')
      intervalNode.classList.add('c-link')
      intervalNode.classList.add('c-p3')
      intervalNode.classList.add('time_interval')
      const intervalElems = []
      intervals.forEach(interval => {
        const clonedElem = intervalNode.cloneNode(true)
        clonedElem.innerHTML = interval
        clonedElem.addEventListener('click', () => {
          intervalElems.forEach(elem => elem.classList.remove('active'))
          clonedElem.classList.add('active')
          displayChosenTime(interval)
        })
        intervalElems.push(clonedElem)
      })
      intervalsWrap.innerHTML = ''
      intervalElems.forEach(elem => intervalsWrap.appendChild(elem))
    }

    const getDatepickerResult = (receivedData) => {
      const datepickerResultContainer = document.querySelector('.datepicker__result')
      const timepicker = document.querySelector('.cart-main-point-accordion__wrap.time')
      timepicker.classList.remove('disabled')
      datepickerResultContainer.classList.remove('js-invalid')
      datepickerResultContainer.classList.add('js-valid')
      timepicker.querySelector(':scope > input').classList.remove('js-valid', 'js-invalid')
      timepicker.querySelector(':scope > input').value = ''

      console.log(receivedData) //change to send data and receive intervals
      const timeData = ['10:00-12:00', '12:00-14:00', '14:00-16:00', '16:00-18:00'] // must be fetched

      putIntervals(timeData)
    }

    const datepicker = new DatePicker({
      'data': data,
      'resultContainerSelector': '.datepicker__result',
      'getResultCallback': getDatepickerResult
    })
  })();

  (addressInputsAction = () => {
    const mainWrap = document.querySelector('.cart-main-point__wrap.address')
    const fields = Array.from(mainWrap.querySelectorAll('.cart-main-point-input.text'))
    const fieldsWithOptions = fields.filter(field => field.classList.contains('with_options'))
    const optionsWraps = Array.from(mainWrap.querySelectorAll('.options__wrap'))
    const cityWrap = optionsWraps.find(wrap => wrap.classList.contains('options_city'))

    const mainData = {
      'city': [
        {
          'short': 'д. Большая тростяница',
          'full': 'Большая тростяница, Веселовский сельсовет'
        },
        {
          'short': 'д. Белое Болото',
          'full': 'Белое Болото, Пригородный сельсовет'
        },
        {
          'short': 'д. Большая Ухолода',
          'full': 'Большая Ухолода, Метченский сельсовет'
        },
        {
          'short': 'д. Большая тростяница',
          'full': 'Большая тростяница, Веселовский сельсовет'
        },
        {
          'short': 'г. Борисов',
          'full': 'Борисов'
        },
      ]
    }

    const mappedData = new Map(Object.entries(mainData))

    const usedAdresses = [ // must be fetched
      {
        'city': {
          'short': 'г. Жодино',
          'full': 'Жодино'
        },
        'street': {
          'short': 'ул. Центральная',
          'full': 'Центральная, улица',
        },
        'house': '3',
        'house_building': '1',
        'flat': '110'
      },
      {
        'city': {
          'short': 'д. Большая тростяница',
          'full': 'Большая тростяница, Веселовский сельсовет'
        },
        'street': {
          'short': 'пер. Школьный',
          'full': 'Школьный, переулок',
        },
        'house': '3'
      }
    ]

    const addressElem = document.createElement('a')
    addressElem.classList.add('c-link', 'c-p5')
    const usedAddressElem = document.createElement('a')
    usedAddressElem.classList.add('c-link', 'c-p4', 'used_address')

    const setValid = (input) => {
      input.classList.remove('js-invalid')
      input.classList.add('js-valid')
      if (input.nextElementSibling && input.nextElementSibling.classList.contains('cart-main-point-input__error')) input.nextElementSibling.innerHTML = ''
    }

    const setInvalid = (input, text) => {
      input.classList.remove('js-valid')
      input.classList.add('js-invalid')
      if (input.nextElementSibling && input.nextElementSibling.classList.contains('cart-main-point-input__error')) input.nextElementSibling.innerHTML = text
    }

    const setClear = (input) => {
      input.classList.remove('js-invalid')
      input.classList.remove('js-valid')
      if (input.nextElementSibling && input.nextElementSibling.classList.contains('cart-main-point-input__error')) input.nextElementSibling.innerHTML = ''
    }

    const buildUsedAddressElem = (address) =>
      (address.city.short ? address.city.short : '') +
      (address.street.short ? ', ' + address.street.short : '') +
      (address.house ? ', д.' + address.house : '') +
      (address.house_building ? ', к.' + address.house_building : '') +
      (address.flat ? ', кв.' + address.flat : '')

    const event = new Event('keydown')

    const writeUsedAddress = (address) => {
      fetchStreetData(address.city.full)
      fetchHouseData(address.city.full, address.street.full)
      hideOptions()
      fields.forEach(field => {
        const input = field.querySelector('input')
        if (input.id === 'city') {
          input.value = address.city.full
          input.dispatchEvent(event)
          setValid(input)
          return
        }
        if (input.id === 'street') {
          input.value = address.street.full
          input.dispatchEvent(event)
          setValid(input)
          return
        }
        if (input.id === 'house') {
          input.dispatchEvent(event)
          input.value = address.house + (address.house_building ? '/' + address.house_building : '')
        }
        if (input.id === 'flat') {
          input.dispatchEvent(event)
          input.value = address.flat || ''
        }
      })
    }

    const forceValidate = (input) => {
      if (input.classList.contains('js-validate') && !input.classList.contains('js-valid')) {
        const errorText = input.value.length === 0 && input.id === 'city' ? 'Выберите населённый пункт' :
          input.value.length === 0 && input.id === 'street' ? 'Выберите улицу' :
            input.id === 'city' ? 'Сюда доставки нет. Выберите населённый пункт из выпадающего списка' :
              input.id === 'street' ? 'Такой улицы в населённом пункте, который вы выбрали, нет.<br>Выберите улицу из выпадающего списка' : ''
        setInvalid(input, errorText)
      }
    }

    usedAdresses.forEach(address => {
      const clonedAddress = usedAddressElem.cloneNode()
      clonedAddress.innerHTML = buildUsedAddressElem(address)
      clonedAddress.addEventListener('click', () => writeUsedAddress(address))
      cityWrap.prepend(clonedAddress)
    })

    const updateList = (e) => {
      const popup = e.target.parentElement.querySelector('.cart-main-point-input-options')
      const list = e.target.parentElement.querySelector('.options__list')
      const input = e.target
      const dataArr = mappedData.get(input.id)
      let popupVisible = false
      let inputCorrect = false

      list.innerHTML = ''
      setClear(e.target)

      if (input.value.length !== 0 && dataArr) {
        dataArr.forEach((elem) => {
          if (elem.full.toLowerCase().includes(input.value.toLowerCase())) {
            const clonedAddress = addressElem.cloneNode()
            clonedAddress.innerHTML = elem.full
            clonedAddress.addEventListener('click', () => {
              input.value = elem.full
              if (input.id === 'city') fetchStreetData(elem.full)
              if (input.id === 'street') fetchHouseData(elem.full)
              setValid(input)
              hideOptions()
            })
            list.appendChild(clonedAddress)
            popupVisible = true
          }
          if (elem.full.toLowerCase() === input.value.toLowerCase()) {
            inputCorrect = true
          }
        })
        if (inputCorrect) {
          setValid(input)
        }
      }
      if (popupVisible) {
        popup.classList.add('active')
        return
      }
      hideOptions()
      forceValidate(input)
    }

    const hideOptions = () => {
      optionsWraps.forEach(wrap => wrap.classList.remove('active'))
    }

    const fetchStreetData = (city) => {
      const streetData = [ // must be fetched
        {
          'short': 'ул. Старая',
          'full': 'Старая, улица',
        },
        {
          'short': 'ул. Столетова',
          'full': 'Столетова, улица',
        },
        {
          'short': 'пр. Столетова',
          'full': 'Столетова, проезд'
        },
        {
          'short': 'ул. Строителей',
          'full': 'Строителей, улица'
        },
        {
          'short': 'пер. Строителей',
          'full': 'Строителей, переулок'
        },
        {
          'short': 'пер. Школьный',
          'full': 'Школьный, переулок',
        },
        {
          'short': 'ул. Центральная',
          'full': 'Центральная, улица',
        }
      ]
      mappedData.set('street', streetData)
    }

    const fetchHouseData = (city, street) => {
      const houseData = [ // must be fetched
        {
          'house': '1'
        },
        {
          'house': '11'
        },
        {
          'house': '12'
        },
        {
          'house': '15'
        },
        {
          'house': '15',
          'house_building': '1'
        }
      ]
      const refactoredArr = []

      houseData.forEach(elem => refactoredArr.push({
        'full': elem.house + (elem.house_building ? '/' + elem.house_building : '')
      }))

      mappedData.set('house', refactoredArr)
    }

    fieldsWithOptions.forEach(field => {
      field.addEventListener('keydown', updateList)
      field.addEventListener('keyup', updateList)
      field.querySelector('input').addEventListener('validate', (e) => forceValidate(e.target))
    })

    document.addEventListener('click', (e) => {
      e.stopPropagation()
      let close = true
      fieldsWithOptions.forEach(field => {
        if (field.contains(e.target) || field === e.target) {
          close = false
        }
      })
      if (close) {
        hideOptions()
      }
    })
  })();

  (enhanceCommentTextarea = () => {
    const textarea = document.querySelector('.cart-main-point-input__text.textarea')

    const changeHeight = () => {
      textarea.style.height = textarea.scrollHeight + 1 + 'px'
    }

    textarea.addEventListener('keydown', changeHeight)
    textarea.addEventListener('keyup', changeHeight)
  })();

  (fastOrderAction = () => {
    const openPopupButton = document.querySelector('.cart-side-result__fast_order')
    const wrap = document.querySelector('.fast_order__wrap')
    const form = wrap.querySelector('.fast_order')
    const closeButtons = wrap.querySelectorAll('.fast_order__close')
    const success = wrap.querySelector('.fast_order__success')
    const dismissButton = success.querySelector('.fast_order__dismiss')
    const outer = wrap.querySelector('.fast_order__outer')
    const sendButton = form.querySelector('.fast_order__send')
    const inputs = form.querySelectorAll('input')

    const openPopup = (popup) => {
      popup.classList.add('active')
      setTimeout(() => popup.classList.add('fade'), 0)
    }

    const closePopup = (popup) => {
      popup.classList.remove('fade')
      setTimeout(() => popup.classList.remove('active'), 300)
    }

    const setDefault = (e) => {
      closePopup(wrap)
      setTimeout(() => {
        closePopup(success)
        openPopup(form)
      }, 300)
    }

    const sendData = () => {
      const mapData = new Map()
      inputs.forEach(input => {
        mapData.set(input.name, input.value)
      })
      const data = Object.fromEntries(mapData)

      console.log(data) // change to send
    }

    sendButton.addEventListener('click', () => {
      sendData()
      closePopup(form)
      setTimeout(() => openPopup(success), 300)
    })
    outer.addEventListener('click', setDefault)
    closeButtons.forEach(button => {
      button.addEventListener('click', setDefault)
    })
    dismissButton.addEventListener('click', setDefault)
    openPopupButton.addEventListener('click', () => openPopup(wrap))
  })();

  (promoValidation = () => {
    const input = document.querySelector('.cart-side-result__input_promo')
    const result = document.querySelector('.cart-side-result__promo_res')

    const clear = (e) => {
      if (input.value.length === 0) {
        input.classList.remove('promo-valid', 'promo-invalid')
        result.innerHTML = ''
      }
    }

    input.addEventListener('keydown', clear)
    input.addEventListener('keyup', clear)

    input.addEventListener('focusout', () => {
      if (input.value.length === 0) {
        return
      }
      console.log(input.value) // change to fetch
      let responseDiscount = 5 // must be fetched
      if (responseDiscount) {
        input.classList.add('promo-valid')
        result.innerHTML = `Ваша скидка &mdash; ${responseDiscount}%`
        return
      }
      input.classList.add('promo-invalid')
      result.innerHTML = 'Такого номера карты клиента или промокода нет.<br>Проверьте данные и попробуйте ещё раз'
    })
  })();

  (inputValidation = () => {
    const emailInputs = document.querySelectorAll('input[name="email"]')
    const nameInputs = document.querySelectorAll('input[name="name"]')
    const phoneInputs = document.querySelectorAll('input[name="phone"]')
    const termsInputs = document.querySelectorAll('input[name="terms_of_use"]')

    const setValid = (input) => {
      input.classList.add('js-valid')
      input.classList.remove('js-invalid')
      input.nextElementSibling.innerHTML = ''
    }

    const setInvalid = (input) => {
      input.classList.add('js-invalid')
      input.classList.remove('js-valid')
    }

    const clearInput = (input) => input.classList.remove('js-valid', 'js-invalid')

    const showError = (input, text) => {
      if (input.nextElementSibling && input.nextElementSibling.classList.contains('cart-main-point-input__error')) {
        input.nextElementSibling.innerHTML = text
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

    const phoneMasking = (event) => {
      const input = event.target
      const matrix = '+375 (__) ___-__-__'
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

    const validateEmail = (e) => {
      e.target.classList.add('js-important')

      const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (e.target.value.length === 0) {
        clearInput(e.target)
        e.target.classList.remove('js-important')
        return
      }

      if (regex.test(e.target.value.toLowerCase())) {
        setValid(e.target)
        return
      }

      if (e.target.classList.contains('js-validate')) {
        setInvalid(e.target)
        showError(e.target, 'Неправильный формат электронной почты. Введите почту по примеру: example@mail.com')
      }
    }

    const validateName = (e) => {
      if (e.target.value.length > 0) {
        setValid(e.target)
        return
      }
      if (e.target.classList.contains('js-validate')) {
        setInvalid(e.target)
        showError(e.target, 'Введите ваше имя')
      }
    }

    const validatePhone = (e) => {
      if (e.target.value.length === 19) {
        setValid(e.target)
        return
      }
      clearInput(e.target)
      if (e.target.classList.contains('js-validate')) {
        if (e.target.value.length === 4) {
          setInvalid(e.target)
          showError(e.target, 'Без телефона мы не сможем с вами связаться, чтобы уточнить детали заказа')
          return
        }
        setInvalid(e.target)
        showError(e.target, 'В номере не хватает одной или нескольких цифр.<br>Мы не сможем дозвониться получателю')
      }
    }

    const validateTerms = (e) => {
      if (!e.target.checked) {
        setInvalid(e.target)
        return
      }
      setValid(e.target)
    }

    phoneInputs.forEach(input => {
      input.addEventListener('keyup', phoneMasking, false);
      input.addEventListener('keydown', phoneMasking, false);
      input.addEventListener('focus', phoneMasking, false);
      input.addEventListener('blur', phoneMasking, false);
      input.addEventListener('keyup', validatePhone)
      input.addEventListener('keydown', validatePhone)
      input.addEventListener('validate', validatePhone)
    })

    emailInputs.forEach(input => {
      input.addEventListener('keydown', validateEmail)
      input.addEventListener('keyup', validateEmail)
    })

    nameInputs.forEach(input => {
      input.addEventListener('keydown', validateName)
      input.addEventListener('keyup', validateName)
      input.addEventListener('validate', validateName)
    })

    termsInputs.forEach(input => input.addEventListener('change', validateTerms));
    termsInputs.forEach(input => input.addEventListener('validate', validateTerms));
  })();

  (mainValidation = () => {
    const cartMainWrap = document.querySelector('.cart-main')
    const orderButton = document.querySelector('.cart-side-result__order')
    const orderButtonWrap = orderButton.parentElement
    const addressBlock = cartMainWrap.querySelector('.cart-main-point__wrap.address').parentElement
    const timepickerBlock = addressBlock.previousElementSibling
    const allInputs = cartMainWrap.querySelectorAll('input[type="text"], input[type="checkbox"]')
    const personalDataBlock = cartMainWrap.querySelector('.personal_data')
    const personalDataInputs = personalDataBlock.querySelectorAll('input')
    const termsOfUseInput = personalDataBlock.querySelector('input[name="terms_of_use"]')
    const validateEvent = new Event('validate')

    const getActiveTab = () => cartMainWrap.querySelector('.cart-main__tab.active')

    const checkAllInputs = (e) => {
      const tab = getActiveTab()
      const importantInputs = tab.querySelectorAll('.js-important')
      let showButton = true
      importantInputs.forEach(input => {
        if(input.type === 'checkbox' && !input.checked || input.value.length === 0) {
          showButton = false
        }
      })
      if (showButton) orderButtonWrap.appendChild(orderButton)
    }

    const gatherInfo = () => {
      let data = new Map()
      const inputs = cartMainWrap.querySelectorAll('input')
      inputs.forEach(input => {
        if (input.type === 'radio') {
          if (!input.checked) return
          data.set(input.name, input.id)
          return
        }
        if (input.type === 'checkbox') {
          data.set(input.id, input.checked)
          return
        }
        data.set(input.id, input.value)
      })
      data = Object.fromEntries(data)
      console.log(data) // change to send
    }

    const completeOrder = () => {
      const paymentWay = cartMainWrap.querySelector('input[name="payment"][checked]').id
      // interaction should be dependent on paymentWay

      //TEMP FOR TESTING
      window.location.href = '/pages/thanksForOrder/thanksWithEmail.html'

      gatherInfo()
    }

    const validateAllInputs = () => {
      const tab = getActiveTab()
      const importantInputs = tab.querySelectorAll('.js-important')
      let unlockButton = true
      importantInputs.forEach(input => {
        input.classList.add('js-validate')
        input.dispatchEvent(validateEvent)
        if (!input.classList.contains('js-valid')) {
          unlockButton = false
          input.scrollIntoView({
            alignToTop: false,
            behavior: 'smooth'
          })
        }
      })
      if (unlockButton && orderButton.classList.contains('finish')) {
        completeOrder()
        return
      }
      if (unlockButton) {
        orderButton.classList.add('allow')
        orderButton.click()
        orderButton.classList.remove('allow')
        if (orderButton.parentElement) orderButtonWrap.removeChild(orderButton)
        orderButton.classList.add('finish')
      }
    }

    allInputs.forEach(input => {
      input.addEventListener('keydown', checkAllInputs)
      input.addEventListener('keyup', checkAllInputs)
      input.addEventListener('change', checkAllInputs)
    })

    const timePickerInputs = timepickerBlock.querySelectorAll('input')

    timePickerInputs.forEach(input => {
      input.addEventListener('validate', () => {
        if (input.value.length === 0) {
          input.classList.add('js-invalid')
          input.classList.remove('js-valid')
        }
      })
    })

    addressBlock.addEventListener('click', () => {
      timePickerInputs.forEach(input => input.dispatchEvent(validateEvent))
    })

    termsOfUseInput.addEventListener('click', () => {
      personalDataInputs.forEach(input => {
        if(input.classList.contains('js-important')) {
          input.classList.add('js-validate')
          input.dispatchEvent(validateEvent)
        }
      })
    })

    orderButton.addEventListener('click', () => {
      if (!orderButton.classList.contains('validate') || orderButton.classList.contains('allow')) {
        orderButton.classList.add('validate')
        orderButtonWrap.removeChild(orderButton)
        return
      }
      if (orderButton.classList.contains('validate')) {
        validateAllInputs()
      }
    })
  })();

  if (isDesktop) {
    (resultBlockPositionFixing = () => {
      const cart = document.querySelector('.cart')
      const resultBlock = document.querySelector('.cart-side-result')
      const clientCard = document.querySelector('.cart-side-client_card')
      resultBlock.style.top = '0px'
      
      document.addEventListener('scroll', () => {
        const customOffset = 50
        const isTouchingTop = window.pageYOffset - cart.offsetTop + customOffset >= 0
        const maxOffset = cart.scrollHeight - customOffset - resultBlock.scrollHeight - clientCard.scrollHeight
        let resultBlockOffset = 0
        if(isTouchingTop) {
          resultBlockOffset = window.pageYOffset - cart.offsetTop + customOffset
          if(resultBlockOffset >= maxOffset) {
            resultBlockOffset = maxOffset
          }
        }
        resultBlock.style.top = resultBlockOffset + 'px'
      })
    })();
  }
})