window.onload = () => {
    const filterItems = document.querySelectorAll('.filterItem');
    const filterModalOutside = document.querySelector('.filterMenu__modalOutside')
    const filterButton = document.querySelector('.filterButton');
    const filterModalMobile = document.querySelector('.modal-filter__wrap');

    const updateFilterCount = (container) => {
        const count = container.querySelectorAll('input:checked').length;
        if (count > 0) {
            container.querySelector('.selectedFiltersCount').innerHTML = count;
            container.querySelector('.selectedFiltersCount').style.opacity = 1;
        } else {
            container.querySelector('.selectedFiltersCount').style.opacity = 0;   
        }
        container.querySelector('.selectedFiltersCount').style.display = Number(container.querySelector('.selectedFiltersCount').innerHTML) > 0 ? 'flex' : 'none';
    }

    const filterToggleDesktop = (e) => {
        const filterModal = e.currentTarget.children[e.currentTarget.children.length - 1];
        const activeModal = document.querySelector('.filterModal-active');
         (e.currentTarget);
        
        if (!(e.target.parentNode.classList.contains('filterItem-menuBlock') || e.target.classList.contains('filterItem-menuBlock'))) {
            updateFilterCount(e.currentTarget);
            return;
        }
        
        if (activeModal == filterModal) {
            activeModal.classList.remove('filterModal-active');
            filterModalOutside.classList.remove('filterMenu__modalOutside-activeModal');
            e.currentTarget.classList.remove('filterItem-active')
            return;
        } else if (activeModal) {
            document.querySelector('.filterItem-active').classList.remove('filterItem-active')
            activeModal.classList.remove('filterModal-active');
            filterModalOutside.classList.remove('filterMenu__modalOutside-activeModal');
        }
        
        e.currentTarget.classList.add('filterItem-active')
        filterModalOutside.classList.add('filterMenu__modalOutside-activeModal');
        filterModal.classList.add('filterModal-active');
        updateFilterCount(e.currentTarget);
    }
    
    const closeActiveFilterModal = (e) => {
         (e.target);
        if (e.target == filterModalOutside) {
            const activeModal = document.querySelector('.filterModal-active');
            document.querySelector('.filterItem-active').classList.remove('filterItem-active')
            activeModal.classList.remove('filterModal-active');
            filterModalOutside.classList.remove('filterMenu__modalOutside-activeModal');
        }
    }

    const itemModClick = (e) => {
        if (e.target.classList.contains('catalog__card-modBlockItem')) {
            e.currentTarget.querySelector('.catalog__card-modBlockItem-active').classList.remove('catalog__card-modBlockItem-active')
            e.target.classList.add('catalog__card-modBlockItem-active')
        }
    }
    
    document.querySelectorAll('.catalog__card-modBlock').forEach((item) => item.addEventListener('click', itemModClick))
    filterModalOutside.addEventListener('click', closeActiveFilterModal)
    filterItems.forEach((item) => item.addEventListener('click', filterToggleDesktop))


    if (window.screen.width < 1280) {
        const mobileFilterBtn = document.querySelector('#mobileFilterBtn');
        const submitFiltersBtn = document.querySelector('#submitFiltersBtn');
        const filterTitles = document.querySelectorAll('.sideMenu__filterItem-title');
        const sideMenuCross = document.querySelector('.sideMenu__cross');

        const sideMenuFilterClick = (e) => {
            if (e.target.tagName == 'INPUT') {
                const filterCount = e.currentTarget.parentNode.parentNode.querySelector('.selectedFiltersCount');
                filterCount.innerHTML = e.target.checked ? Number(filterCount.innerHTML) + 1 :  Number(filterCount.innerHTML) - 1;
                filterCount.style.display = Number(filterCount.innerHTML) > 0 ? 'flex' : 'none';
            }
        }

        const toggleFilters = (e) => {
            e.currentTarget.parentNode.querySelector('.sideMenu__filterList').classList.toggle('sideMenu__filterList-open')
        }

        sideMenuCross.addEventListener('click', () => document.querySelector('.sideMenuWrapper').style.display = 'none');
        filterTitles.forEach((item) => item.addEventListener('click', toggleFilters))
        
        mobileFilterBtn.addEventListener('click', () => {
            document.querySelector('.sideMenuWrapper').style.display = 'initial';
        })
        
        submitFiltersBtn.addEventListener('click', () => {
            document.querySelector('.sideMenuWrapper').style.display = 'none';
        })
        filterModalMobile.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal-filter__wrap')) {
                e.target.style.display = 'none';
            }
        })
        filterButton.addEventListener('click', (e) => {
            let modal = document.querySelector('.modal-filter__wrap');
            modal.style.display = modal.style.display == 'block' ? 'none' : 'block';
        })
        const filterItems = document.querySelectorAll('.sideMenu__filter').forEach(item => item.addEventListener('click', sideMenuFilterClick));
    }
}