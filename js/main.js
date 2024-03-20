// start color
let mainColor = localStorage.getItem("color_option");
if(mainColor !== null){
    document.documentElement.style.setProperty("--main-color", mainColor);

    document.querySelectorAll(".colors-list li").forEach(ele => {
        ele.classList.remove("active");

        if(ele.dataset.color === mainColor){
            ele.classList.add("active");
        }
    });
}
let settingBox = document.querySelector(".settings-box");
let icon = document.querySelector(".toggle-settings");
let spin = document.querySelector(".settings-box .icon");
icon.onclick = function(){
    spin.classList.toggle("fa-spin");
    settingBox.classList.toggle("open");
};
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach((li) => {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // Save Color LocalStorage
        localStorage.setItem("color_option", e.target.dataset.color);
        //
        handelActive(e);
    });
});
// end color

// start background_option
let backgroundOption = true;
let backgroundInterval;
let backgroundLocalItem = localStorage.getItem("background_option");

if(backgroundLocalItem !== null){

    if(backgroundLocalItem === 'true'){

        backgroundOption = true;
    
    }else{
    
        backgroundOption = false;
    
    }
    
    document.querySelectorAll(".random-backgrounds span").forEach(ele => {
    
        ele.classList.remove("active");
    
    });

    
    if(backgroundLocalItem === 'true'){
    
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    
    }else{
    
        document.querySelector(".random-backgrounds .no").classList.add("active");
    
    }
}

const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach((span) => {
    span.addEventListener("click", (e) => {
        handelActive(e);

        if(e.target.dataset.background === 'yes'){
            backgroundOption = true;
            randomizeImg();
            localStorage.setItem("background_option", true);
        }else{
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }

    });
});
// end background_option

//start backgroundImages
let landingPage = document.querySelector(".landing-page");
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
function randomizeImg(){
    backgroundInterval = setInterval(() => {
        let randomNumber = Math.floor(Math.random() * imgsArray.length);
        landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] +'")';
    }, 1000);
};
//end backgroundImages

// start skill sellector
let ourSkills = document.querySelector(".skills");

let spans = document.querySelectorAll(".skills span");

window.onscroll = function(){
    if(window.scrollY >= ourSkills.offsetTop - 10){
        spans.forEach(span => {
            span.style.width = span.dataset.progress;
        })
    }
}
// end skills
//start gallery
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        //creat overlay
        let overlay = document.createElement("div");
        overlay.className = "popup-overlay";
        document.body.appendChild(overlay);

        //creat popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        if(img.alt !== null){
            //creat heading
            let imgHeading= document.createElement("h3")
            let imgText = document.createTextNode(img.alt);
            imgHeading.appendChild(imgText);
            popupBox.appendChild(imgHeading);
            document.body.appendChild(popupBox);
        }

        //creat img
        let popupImg = document.createElement("img");
        //set img src
        popupImg.src = img.src;
        popupBox.appendChild(popupImg);
        document.body.appendChild(popupBox);

        // craet close span 
        let closeButton = document.createElement("span");
        closeButton.className = "close-button";
        let closeButtonText = document.createTextNode("X");
        closeButton.appendChild(closeButtonText);
        popupBox.appendChild(closeButton);
    });
});
// colse Popup
document.addEventListener("click", (e) => {
    if(e.target.className == "close-button"){
        // remove current popup
        e.target.parentNode.remove();
        // remove overlay
        document.querySelector(".popup-overlay").remove();
    }
});
//end gallery

// start function scroll 
function scrollToSomewhere(elements){
    elements.forEach(ele => {
        ele.addEventListener("click", e => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
// end function scroll 

// start function active
function handelActive(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(ele => {
        ele.classList.remove("active");

    });
    ev.target.classList.add("active");  
}
// end function active

// start bullets
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
scrollToSomewhere(allBullets);
// end bullets

// start links
let allLinks = document.querySelectorAll(".links a");
scrollToSomewhere(allLinks);
// end links

// start bullets option 
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");
if(bulletLocalItem !== null){
    bulletsSpan.forEach(span => {
        span.classList.remove("active");
    });
    if(bulletLocalItem === 'block'){
        bulletsContainer.style.display = 'block';
        document.querySelector(".bullets-option .yes").classList.add("active");
    }else{
        bulletsContainer.style.display = 'none';
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", e => {
        if(span.dataset.display === 'show'){
            bulletsContainer.style.display ='block'
            localStorage.setItem("bullets_option", "block")
        }else{
            bulletsContainer.style.display ='none'
            localStorage.setItem("bullets_option", "none");
        }
        handelActive(e);
    });
});
// end bullets option 

// start reset
document.querySelector(".settings-box .reset-option").onclick = function(){
    localStorage.removeItem("bullets_option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    
    window.location.reload();
} 
// end reset 

// start menu
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");
toggleBtn.onclick = function(e){
    e.stopPropagation();
    this.classList.toggle("menu-active");
    tLinks.classList.toggle("open");
}  
document.addEventListener("click", e => {
    if(e.target !== toggleBtn && e.target !== tLinks){
        if(tLinks.classList.contains("open")){
            toggleBtn.classList.toggle("menu-active");
            tLinks.classList.toggle("open");
        }
    }
});

tLinks.onclick = function (e){
    e.stopPropagation();
}
// end menu 


