
window.onload = () => {
    const mapTabs = document.querySelector('.delivery__infoTabs');
    const mapTabContent = document.querySelector('.delivery__mapTabContent');
    const pageTabs = document.querySelector('.delivery__placeTabs');
    const minskPage = document.querySelector('.page-minsk')
    const borisovPage = document.querySelector('.page-borisov')

    const mapTabClick = (e) => {
        if (e.target.classList.contains("delivery__tab") && !e.target.classList.contains("delivery__tab-active")) {
            mapTabs.querySelector('.delivery__tab-active').classList.remove("delivery__tab-active");
            e.target.classList.add("delivery__tab-active")

            mapTabContent.classList.contains('delivery__mapTabContent-map')
            ?
            mapTabContent.classList.replace('delivery__mapTabContent-map', 'delivery__mapTabContent-table')
            :
            mapTabContent.classList.replace('delivery__mapTabContent-table', 'delivery__mapTabContent-map')
        }
    }

    const pageTabClick = (e) => {
        if (e.target.classList.contains("delivery__tab") && !e.target.classList.contains("delivery__tab-active")) {
            pageTabs.querySelector('.delivery__tab-active').classList.remove("delivery__tab-active");
            e.target.classList.add("delivery__tab-active")
            
            if (e.currentTarget.classList.contains('delivery__placeTabs-borisov')) {
                e.currentTarget.classList.replace('delivery__placeTabs-borisov', 'delivery__placeTabs-minsk')
                minskPage.style.display = 'block';
                borisovPage.style.display = 'none';
            } else {
                e.currentTarget.classList.replace('delivery__placeTabs-minsk', 'delivery__placeTabs-borisov')
                minskPage.style.display = 'none';
                borisovPage.style.display = 'block';
            }
        }
    }

    pageTabs.addEventListener('click', pageTabClick);
    mapTabs.addEventListener('click', mapTabClick);
}