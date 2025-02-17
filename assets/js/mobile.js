// Mobile Menu
const menu = document.querySelector(".menu");
const openBtn = document.querySelector(".mobile-menu");
const closeBtn = document.querySelector(".close-menu");

function handleMenu() {
  menu.classList.toggle("open");

  if (menu.classList.contains("open")) {
    openBtn.style.display = "none";
    closeBtn.style.display = "block";
  } else {
    openBtn.style.display = "block";
    closeBtn.style.display = "none";
  }
}

openBtn.addEventListener("click", handleMenu);
closeBtn.addEventListener("click", handleMenu);

// Filter Menu
const filterContainer = document.querySelector(".filters");
const filterBtn = document.querySelector(".filter-icon");
const openIcon = document.querySelector(".open-filter");
const closeIcon = document.querySelector(".close-filter");

filterBtn.addEventListener("click", function () {
  filterContainer.classList.toggle("open");

  if (filterContainer.classList.contains("open")) {
    openIcon.style.display = "none";
    closeIcon.style.display = "block";
  } else {
    openIcon.style.display = "block";
    closeIcon.style.display = "none";
  }
});
