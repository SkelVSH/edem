document.addEventListener('DOMContentLoaded', () => {
  const copyReqsButton = document.querySelector("#copy_reqs")
  copyReqsButton.addEventListener('click', (e) => {
    e.preventDefault()
    navigator.clipboard.writeText('Частное торговое унитарное предприятие «МАГВИР» (ЧУП «МАГВИР»); Республика Беларусь, Минская обл., г. Борисов, ул. Строителей, 45а, 222511 УНП 690316639 ОКПО 292485256000; Расчётный счёт BY42 BAPB 3012 3177 9001 0000 0000 в ОАО «Белагропромбанк», г. Минск, пр-т Жукова, 3; BIC BAPBBY2X')
  })
})