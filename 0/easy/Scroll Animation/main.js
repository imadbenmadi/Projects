const element = document.querySelector(".my-element");
const section = document.querySelector(".my-section");

function isElementInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

function handleScroll() {
  if (isElementInViewport(section)) {
    element.classList.add("visible");
  } else {
    element.classList.remove("visible");
  }
}

window.addEventListener("scroll", handleScroll);
