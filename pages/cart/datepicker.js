class DatePicker {
  constructor({ data, resultContainerSelector, getResultCallback }) {
    this.data = data
    this.datepicker = document.querySelector('.datepicker')
    this.monthContainer = this.datepicker.querySelector('.datepicker__month')
    this.prevArrow = this.datepicker.querySelector('.datepicker__arrow.prev')
    this.nextArrow = this.datepicker.querySelector('.datepicker__arrow.next')
    this.resultContainer = document.querySelector(resultContainerSelector)
    this.pageNum = 0
    this.pages = []
    this.monthStrings = []
    this.monthNames = new Map([[0, 'Январь'], [1, 'Февраль'], [2, 'Март'], [3, 'Апрель'], [4, 'Май'], [5, 'Июнь'], [6, 'Июль'], [7, 'Август'], [8, 'Сентябрь'], [9, 'Октябрь'], [10, 'Ноябрь'], [11, 'Декабрь']])
    this.resultMonthNames = new Map([[0, 'января'], [1, 'февраля'], [2, 'марта'], [3, 'апреля'], [4, 'мая'], [5, 'июня'], [6, 'июля'], [7, 'августа'], [8, 'сентября'], [9, 'октября'], [10, 'ноября'], [11, 'декабря']])
    this.chosenDate = {}
    this.getResult = getResultCallback
    this.init()
  }

  init = () => {
    this.createMonthStrings()
    this.createDatePicker()
    this.monthContainer.innerHTML = this.getMonthFullString(0)
    this.pages.forEach((page, j) => {
      if (j === 0) {
        page.html.classList.add('active')
      }
      this.datepicker.appendChild(page.html)
    })

    /** arrows actions */
    this.nextArrow.addEventListener('click', () => {
      const tempNum = this.pageNum + 1
      this.setActivePage(tempNum)
    })

    this.prevArrow.addEventListener('click', () => {
      const tempNum = this.pageNum - 1
      this.setActivePage(tempNum)
    })
  }

  createDatePicker = () => {
    const table = document.createElement('div')
    const dayElemDisabled = document.createElement('span')
    const dayElemActive = document.createElement('a')

    dayElemDisabled.classList.add('datepicker__day')
    dayElemActive.classList.add('datepicker__day', 'datepicker__day--active')
    table.classList.add('datepicker-table', 'datepicker-table__days')

    this.data.years.forEach((year) => {
      year.months.forEach((month) => {
        const clonedTable = table.cloneNode()
        const daysQuantity = 32 - new Date(year.value, month.value, 32).getDate()
        const emptyDays = (new Date(year.value, month.value, 1).getDay() || 7) - 1
        for (let i = 0; i < emptyDays; i++) {
          let emptyDay = dayElemDisabled.cloneNode()
          clonedTable.appendChild(emptyDay)
        }
        for (let i = 1; i <= daysQuantity; i++) {
          let clonedDay
          if (month.days.includes(i)) {
            clonedDay = dayElemActive.cloneNode()
            clonedDay.addEventListener('click', () => this.setResult(year.value, month.value, i))
          }
          else {
            clonedDay = dayElemDisabled.cloneNode()
          }
          clonedDay.innerHTML = i
          clonedTable.appendChild(clonedDay)
        }
        clonedTable.addEventListener('click', (e) => {
          if(e.target.tagName === 'A') {
            this.datepicker.querySelectorAll('.datepicker__day').forEach(elem => elem.classList.remove('active'))
            e.target.classList.add('active')
          }
        })
        this.pages.push({
          'year': year.value,
          'month': month.value,
          'html': clonedTable
        })
      })
    });
  }

  setResult = (year, month, day) => {
    this.chosenDate = {
      'year': year,
      'month': month,
      'day': day
    }
    const event = new Event('keydown')
    this.resultContainer.value = day + ' ' + this.resultMonthNames.get(month)
    this.resultContainer.dispatchEvent(event)
    this.getResult(this.chosenDate)
  }

  getMonthFullString = (chosenPage) => this.monthNames.get(this.pages[chosenPage].month) + ' ' + this.pages[chosenPage].year

  setActivePage = (tempNum) => {
    if (this.pages[tempNum]) {
      this.pageNum = tempNum
      this.pages.forEach(page => page.html.classList.remove('active'))
      this.monthContainer.innerHTML = this.getMonthFullString(this.pageNum)
      this.pages[this.pageNum].html.classList.add('active')
    }
  }

  createMonthStrings = () => {
    this.data.years.forEach(year => {
      year.months.forEach(month => {
        let monthString = this.monthNames.get(month.value)
        monthString += ' '
        monthString += year.value
        this.monthStrings.push(monthString)
      })
    })
  }
}