let mybtn = document.querySelector("button");
window.onscroll = function () {
  if (window.scrollY >= 600) {
    mybtn.style.display = "block";
  } else {
    mybtn.style.display = "none";
  }
};
mybtn.onclick = function () {
  window.scrollTo({
    left: 0,
    top: 0,
    behavior: "smooth",
  });
};
