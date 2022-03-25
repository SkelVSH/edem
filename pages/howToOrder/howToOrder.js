document.addEventListener('DOMContentLoaded', () => {
  const floatingBlock = document.querySelector('.howToOrder-float')
  const wrap = document.querySelector('.howToOrder')

  if(document.documentElement.clientWidth >= 768) {
    document.addEventListener('scroll', () => {
      if(document.documentElement.scrollTop < wrap.scrollHeight - floatingBlock.scrollHeight) {
        floatingBlock.style.top = document.documentElement.scrollTop + 'px'
      }
    })
  }
})