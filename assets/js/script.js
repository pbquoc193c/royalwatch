"use struct";

// Slider
const productContainer = document.querySelector(".products");
const products = document.querySelectorAll(".product");
const leftArr = document.querySelector(".arrow-left");
const rightArr = document.querySelector(".arrow-right");

function getVisibleItems() {
  let visibleCount = 0;

  products.forEach((product) => {
    let rect = product.getBoundingClientRect();

    if (rect.left >= 0 && rect.right <= window.innerWidth) {
      visibleCount++;
    }
  });

  return visibleCount;
}

function getWidthContainer() {
  let containerWidth = productContainer.clientWidth + 25;

  return containerWidth;
}

function calculateTotalPage() {
  let visibleCount = getVisibleItems();
  let page = Math.ceil(8 / visibleCount);
  return page;
}

let index = 0;
let containerWidth = getWidthContainer();
let page = calculateTotalPage();

function nextPage() {
  ++index;

  if (index >= page) {
    index = 0;
  }

  productContainer.style.transform = `translateX(${-containerWidth * index}px)`;
}

function previousPage() {
  --index;

  if (index < 0) {
    index = page - 1;
  }

  productContainer.style.transform = `translateX(${-containerWidth * index}px)`;
}

window.addEventListener("resize", function () {
  containerWidth = getWidthContainer();
  page = calculateTotalPage();
});

rightArr.addEventListener("click", nextPage);
leftArr.addEventListener("click", previousPage);

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
