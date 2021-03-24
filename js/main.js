/* ------------------ About Section Tabs -----------------  */
(() => {
    const aboutSection = document.querySelector(".about-section");
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        // if event.target contains 'tab-item' class, but not 'active' class
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")) {
            const target = event.target.getAttribute("data-target");
            // deactivate existing active 'tab-item'
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate new 'tab-item'
            event.target.classList.add("active", "outer-shadow");
            // deactivate exisiting active 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            // activate new 'tab-content'
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

/* ------------------ Portfolio Filter and Pop-Up -----------------  */

(() => {
    const filterContainer = document.querySelector(".portfolio-filter"),
     portfolioItemsContainer = document.querySelector(".portfolio-items"),
     portfolioItems = document.querySelectorAll(".portfolio-item"), 
     popup = document.querySelector(".portfolio-popup"),
     prevBtn = popup.querySelector(".pp-prev"),
     nextBtn = popup.querySelector(".pp-next"),   
     closeBtn = popup.querySelector(".pp-close"),
     projectDetailsContainer = popup.querySelector(".pp-details"),
     projectDetailsBtn = popup.querySelector(".pp-project-details-btn");

    let itemIndex, slideIndex, screenshots;

    /* ------------------ Filter Portfolio Items -----------------  */
    filterContainer.addEventListener("click", (event) => {
        if(event.target.classList.contains("filter-item") && (!event.target.classList.contains("active"))) {
            //Deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // Activate new 'filter Item'
            event.target.classList.add("active","outer-shadow");
            const target = event.target.getAttribute("data-target");
            // console.log(target);
            portfolioItems.forEach((item) => {
                // console.log(item);
                // console.log(item.getAttribute("data-category"));
                if(target === item.getAttribute("data-category") || target == 'all') {
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else {
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            }) 
        }
        
    })
})();