const tabs = document.querySelectorAll('.filterItem');


const tabClick = (e) => {
    if (!e.currentTarget.classList.contains('filter-active') && !e.currentTarget.classList.contains('filter-disabled')) {
        document.querySelector('.catalog__container-active').classList.remove('catalog__container-active');
        document.querySelector('.filter-active').classList.remove('filter-active');
        e.currentTarget.classList.add('filter-active');
        document.querySelector(`.${e.currentTarget.id}`).classList.add('catalog__container-active');
    }
}


tabs.forEach((tab) => tab.addEventListener('click', tabClick))