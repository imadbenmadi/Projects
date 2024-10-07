{
  const nav = document.querySelector(".navbar");
  let Scrollvar = window.scrollY;
  window.addEventListener("scroll", () => {
    if (Scrollvar < 100) nav.classList.add("nav-hidden");
    else {
      nav.classList.remove("nav-hidden");
    }
    Scrollvar = scrollY;
  });
}

//navbar click
let navelements = document.querySelectorAll(".nav-item");

navelements.forEach((element) => {
  element.addEventListener("click", (event) => {
    // Remove the "active" class from the previously active element
    let activeElement = document.querySelector(".nav-item.active");
    activeElement.classList.remove("active");

    // Add the "active" class to the clicked element
    let clickedElement = event.target;
    clickedElement.classList.add("active");
  });
});

//nav bar toogler
let navbtn = document.querySelector(".navbar-toggler");
let navbarContainer = document.querySelector(".navbar-container");
let isVisible = false;
navbtn.addEventListener("click", function () {
  if (isVisible) {
    navbarContainer.style.display = "none";
  } else {
    navbarContainer.style.position = "absolute";
    navbarContainer.style.width = "100%";
    navbarContainer.style.backgroundColor = "#ffffff";
    navbarContainer.style.top = "66px";
    navbarContainer.style.display = "flex";
    navbarContainer.style.justifyContent = "center";
    navbarContainer.style.alignItems = "center";
    navbarContainer.style.flexDirection = "column";
    navbarContainer.style.opacity = "1";
    navbarContainer.style.pointerEvents = "auto";
    navbarContainer.style.boxShadow = "0px 3px 7px 0px #6c757d";
  }
  isVisible = !isVisible;
});
document.addEventListener("scroll", function () {
  if (navbarContainer.style.position == "absolute") {
    navbarContainer.style.display = "none";
  }
});

// showing error message
let send = document.querySelector(".contact-send");
let errorMessage = document.querySelector(".contact-error-message");
let errorMessageExit = document.querySelector(".contact-error-message-exit");
send.addEventListener("click", function () {
  errorMessage.classList.remove("hidden");
});
errorMessageExit.addEventListener("click", function () {
  errorMessage.classList.add("hidden");
});

//Show More and Less Certafications
let showMoreBtn = document.querySelector(".show-more-cert");
let showlessBtn = document.querySelector(".show-less-cert");
let hiddenCert = document.querySelectorAll(".select-cert");

showMoreBtn.addEventListener("click", function () {
  hiddenCert.forEach( (element) =>{
    element.classList.remove("hidden-certaficate");
  });
  showMoreBtn.classList.add("hidden");
  showlessBtn.style.display = "block";
});


showlessBtn.addEventListener("click" , function(){
  hiddenCert.forEach((element) => {
    element.classList.add("hidden-certaficate");
  });
  showMoreBtn.classList.remove("hidden");
  showlessBtn.style.display = "none";
});