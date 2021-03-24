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

function bodyScrollingToggle () {
    document.body.classList.toggle("hidden-scrolling");
}

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
                if(target === item.getAttribute("data-category") || target === 'all') {
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

    portfolioItemsContainer.addEventListener("click", (event) => {
        // console.log(event.target);
        // console.log(event.target.closest(".portfolio-item-inner"))
        if(event.target.closest(".portfolio-item-inner")) {
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            // console.log(portfolioItem);
            //get the portfolioItem index
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            // console.log(itemIndex);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img").getAttribute("data-screenshots");
            //console.log(screenshots);
            //Convert screenshots into array
            screenshots = screenshots.split(",");
            //console.log(screenshots);
            if(screenshots.length === 1) {
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }
            else {
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideShow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () => {
        popupToggle();
    })

    function popupToggle() {
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    
    function popupSlideShow() {
        const imgSrc = screenshots[slideIndex];
        // console.log(imgSrc);
        const popupImg = popup.querySelector(".pp-img");
        // Activate loader until the popupImg loaded
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () => {
            // deactivate loader after the popImg loaded
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex + 1) + " of " + screenshots.length;
    }
    // Next Slide
    nextBtn.addEventListener("click", () => {
        if(slideIndex === screenshots.length - 1) {
            slideIndex = 0;
        }
        else {
            slideIndex++;
        }
        popupSlideShow();
        //console.log("SlideIndex: " + slideIndex);
    })

    // Prev Slide 
    prevBtn.addEventListener("click", () => {
        if(slideIndex === 0) {
            slideIndex = screenshots.length - 1;
        }
        else {
            slideIndex--;
        }
        popupSlideShow();
        //console.log("SlideIndex: " + slideIndex);
    })

    function popupDetails() {
        // if portfolio-item-details not exists
        if(!portfolioItems[itemIndex].querySelector(".portfolio-item-details")) {
            projectDetailsBtn.style.display = "none";
            return; //end function execution
        }

        projectDetailsBtn.style.display = "block";
        // Get the project details
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        // Set the Project Details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // Get the project title
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        //console.log(title);
        // Set the project title
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        //console.log(category);
        // Set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    })
    
    function popupDetailsToggle() {
        if(projectDetailsContainer.classList.contains("active")) {
            //console.log("True");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else {
            //console.log("False");
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }
})();