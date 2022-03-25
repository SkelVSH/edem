window.onload = () => {
    const burger = document.querySelector('#burger');
    const search = document.querySelector('#search');
    const menuWrapper = document.querySelector('.modalWrapper-menu')
    const menu = document.querySelector('.menu');
    const bottomMenuWrapper = document.querySelector('.bottomMenuWrapper');
    const modalWrap = document.querySelector('.modal');
    const clearPageInput = document.querySelector('#clearPageInput')
    const searchInput = document.querySelector('.pageInput')
    const requisites = document.querySelector('#requisites')
    const placeButton = document.querySelector('.header__placeBlock');

    const placeModal = document.querySelector('.modal-placement__wrap');
    const fullCartPopup = document.querySelector('.header__cart.full')
    const cartPopupItemWrap = fullCartPopup.querySelector('.header__cart-popup-goods')
    const removeItemButtons = fullCartPopup.querySelectorAll('.header__cart-popup-goods-item-desc__remove')

    if(fullCartPopup) {
        removeItemButtons.forEach(button => {
            button.addEventListener('click', () => {
                const cartItem = button.parentElement.parentElement
                if(cartItem.classList.contains('disabled')) {
                    button.innerHTML = 'убрать'
                    cartItem.classList.remove('disabled')
                    return
                }
                button.innerHTML = 'вернуть'
                cartItem.classList.add('disabled')
            })
        })
        
        if(cartPopupItemWrap.children.length > 3) {
            let maxHeight = 0
            for(let i = 0; i < 3; i++) {
                maxHeight += cartPopupItemWrap.children[i].scrollHeight
            }
            cartPopupItemWrap.style.maxHeight = maxHeight + 'px'
        }
        
    }

    const clearMenu = () => {
        const activeList = document.querySelector('.menu__list-active')
        if (activeList) {
            document.querySelector('.menu__list-active').classList.remove('menu__list-active');
        }
    }

    const clearInput = () => {
        searchInput.value = '';
        document.querySelector('#clearPageInput').style.display = 'none';
        closeModal();
    }


    const closeMenu = () => {
        burger.classList.replace('icon-cross', 'icon-burger')
        menu.classList.remove('menu-active');
        menuWrapper.style.display = 'none'
        clearMenu();
    }
    
    const openMenu = () => {
        burger.classList.replace('icon-burger', 'icon-cross')
        menu.classList.add('menu-active');
        menuWrapper.style.display = 'block';
    }

    const burgerClickHandler = () => {
        menu.classList.contains('menu-active') ? closeMenu() : openMenu();
    }

    const menuItemClickHandler = (e) => {
        if(e.target.classList.contains('menu-title') || e.target.tagName == 'IMG') {
            if (e.currentTarget.classList.contains('menu__list-active')) {
                e.currentTarget.classList.remove('menu__list-active');
            } else {
                clearMenu();
                e.currentTarget.classList.add('menu__list-active');
            }
        }
    }

    const searchClickHandler = () => {
        const menuList = document.querySelector('.navMenu__list');
        const navContainer = document.querySelector('.navMenu');
        menuList.style.display = 'none';
        navContainer.classList.add('navMenu-activeInput');
    }

    const openBottomTab = (tabClass) => () => {
        
        if (menuWrapper.style.display == 'block') {
            closeMenu();
        }

        const activeTab = document.querySelector('.bottomMenu-activeTab')
        const targetItem = document.querySelector(`.${tabClass}`);
        if (targetItem.classList.contains('bottomMenu-activeTab')) {
            targetItem.classList.remove('bottomMenu-activeTab');
            bottomMenuWrapper.classList.remove('bottomMenuWrapper-active')
        } else if(activeTab) {
            activeTab.classList.remove('bottomMenu-activeTab');
            targetItem.classList.add('bottomMenu-activeTab');
        } else {
            targetItem.classList.add('bottomMenu-activeTab');
            bottomMenuWrapper.classList.add('bottomMenuWrapper-active')
        }
    }

    const closeBottomTab = () => {
        const activeTab = document.querySelector('.bottomMenu-activeTab')
        activeTab.classList.remove('bottomMenu-activeTab');
        bottomMenuWrapper.classList.remove('bottomMenuWrapper-active')
    }

    const closeModal = () => {
        const activeTab = document.querySelector('.modal-active')
        const body = document.getElementsByTagName('body')[0];
        if (activeTab) {
            activeTab.classList.remove('modal-active');
            body.classList.remove('stop-scroll');
            modalWrap.classList.remove('modalWrap-active');
        }
    }
    
    const openModal = (modalClass) => (e) => {
        const activeTab = document.querySelector('.modal-active')
        const targetItem = document.querySelector(`.${modalClass}`);
        const body = document.getElementsByTagName('body')[0];

        if (menuWrapper.style.display == 'block') {
            closeMenu();
        }
        if (targetItem.classList.contains('modal-active')) {
            targetItem.classList.remove('modal-active');
            modalWrap.classList.remove('modalWrap-active');
            modalWrap.style.opacity = 0;
        } else if(activeTab) {
            activeTab.classList.remove('modal-active');
            targetItem.classList.add('modal-active');
        } else {
            body.classList.add('stop-scroll');
            targetItem.classList.add('modal-active');
            modalWrap.classList.add('modalWrap-active');
        }
    }

    const searchHandler = (e) => {
        if (searchInput.value.length > 0) {
            document.querySelector('#clearPageInput').style.display = 'block'
        } else {
            document.querySelector('#clearPageInput').style.display = 'none';
        }

        if (
            searchInput.value.length === 1 && e.inputType == 'insertText'
            ||
            searchInput.value.length > 1 && !document.querySelector('.modal-search').classList.contains('modal-active')
            ) {
            openModal('modal-search')();
        }

        if (searchInput.value.length === 0) {
            modalWrap.click();
        }
    }

    if (window.screen.width < 768) {
        const menuItems = document.querySelectorAll('.menu__list');
        
        menuItems.forEach((item) => item.addEventListener('click', menuItemClickHandler));
    }
    
    
    if (window.screen.width < 1280) {
        const menuInput = document.querySelector('.menu__searchBlock-input');
        const bottomCatalog = document.querySelector('#bottomCatalog');
        const bottomPlace = document.querySelector('#bottomPlace')
        const requisitesMobile = document.querySelector('#requisitesMobile');
        
        document.querySelectorAll('.closeModal').forEach((item) => item.addEventListener('click', closeBottomTab))
        document.querySelectorAll('.btn-submitReqCall').forEach((item) => item.addEventListener('click', openBottomTab('bottomMenu__requestCall-success')))
        document.querySelectorAll('.btn-requestCall').forEach((btn) => btn.addEventListener('click', openBottomTab('bottomMenu__requestCall')))
        requisitesMobile.addEventListener('click', openBottomTab('bottomMenu__requisites'))
        bottomCatalog.addEventListener('click', openBottomTab('bottomMenu__catalog'))
        bottomPlace.addEventListener('click', openBottomTab('bottomMenu__place'))
        bottomMenuWrapper.addEventListener('click', (e) => {
            if (e.target == bottomMenuWrapper) {
                document.querySelector('.bottomMenu-activeTab').classList.remove('bottomMenu-activeTab');
                bottomMenuWrapper.classList.remove("bottomMenuWrapper-active")
            }
        })
        menuInput.addEventListener('focus', () => {
            document.querySelector('.menu__searchBlock-loop').style.display = 'none';
        })
        menuInput.addEventListener('focusout', () => {
            if(menuInput.value.length === 0) document.querySelector('.menu__searchBlock-loop').style.display = 'block';
        })

        menuInput.addEventListener('input', (e) => {
            if (e.target.value.length > 0) {
                 ( e.currentTarget.parentNode.parentNode);
                e.currentTarget.parentNode.parentNode.querySelectorAll('.menu__list').forEach((list) => list.style.display = "none")
                e.currentTarget.parentNode.parentNode.querySelector('.searchResult__container').style.display = 'flex';
            } else {
                e.currentTarget.parentNode.parentNode.querySelectorAll('.menu__list').forEach((list) => list.style.display = "flex")
                e.currentTarget.parentNode.parentNode.querySelector('.searchResult__container').style.display = 'none';
            }
        })
    }


    modalWrap.addEventListener('click', (e) => {
        if (e.target == modalWrap) {
            modalWrap.classList.remove('modalWrap-active')
            document.querySelector('.modal-active').classList.remove('modal-active')
            document.querySelector('.stop-scroll').classList.remove('stop-scroll')
        }
    })

    if (window.screen.width >= 1280) {
        document.querySelectorAll('.closeModal').forEach((item) => item.addEventListener('click', closeModal))
        document.querySelectorAll('.btn-submitReqCall').forEach((item) => item.addEventListener('click', openModal('modal-requestCall-success')))
        document.querySelectorAll('.btn-requestCall').forEach((item) => item.addEventListener('click', openModal('modal-requestCall')))
    }


    placeModal.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-placement__wrap')) {
            e.target.style.display = 'none';
        }
    })
    placeButton.addEventListener('click', (e) => {
         (document.querySelector('.modal-placement__wrap'));
        let modal = document.querySelector('.modal-placement__wrap');
        modal.style.display = modal.style.display == 'block' ? 'none' : 'block';
    })
    clearPageInput.addEventListener('click', () => {
        const menuList = document.querySelector('.navMenu__list');
        const navContainer = document.querySelector('.navMenu');
        modalWrap.click();
        searchInput.value = "";
        menuList.style.display = 'flex';
        navContainer.classList.remove('navMenu-activeInput');
    })
    searchInput.addEventListener('focus', (e) => document.querySelector('.navMenu__inputBlock').style.zIndex = 20)
    searchInput.addEventListener('focusout', (e) => document.querySelector('.navMenu__inputBlock').style.zIndex = 6)
    searchInput.addEventListener('input', searchHandler);
    requisites.addEventListener('click', openModal('modal-requisites'))
    menuWrapper.addEventListener('click', (e) => e.target == menuWrapper && closeMenu());
    search.addEventListener('click', searchClickHandler)
    burger.addEventListener('click', burgerClickHandler)
}