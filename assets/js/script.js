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
  let containerWidth = productContainer.clientWidth + 25.5;

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
