const productContainer = document.querySelector(".products");
let products = [];

async function fetchProducts() {
  try {
    const response = await fetch("/products.json");
    products = await response.json();

    console.log("Dữ liệu JSON: ", products);
    const category = getProductsByCategory();
    console.log("Danh mục sản phẩm: ", category);
    renderProducts(products, category);
  } catch (error) {
    console.log("Error catching data: ", error);
  }
}

fetchProducts();

function getProductsByCategory() {
  let path = window.location.pathname;

  if (path.includes("/men_products")) {
    return "Men";
  }
  if (path.includes("/women_products")) {
    return "Women";
  }
  if (path.includes("/couple_products")) {
    return "Couple";
  }
}

function renderFilters(brands, colors) {
  const brandContainer = document.querySelector(".filter-brand");
  const colorContainer = document.querySelector(".filter-color");

  brandContainer.innerHTML = "";
  colorContainer.innerHTML = "";

  brands.forEach((brand) => {
    let brandItem = document.createElement("li");
    brandItem.classList.add("filter-item");
    brandItem.innerHTML = `
      <input type="checkbox" class="checkbox brand-checkbox" value="${brand}"/>
      <span>${brand}</span>
    `;

    brandContainer.appendChild(brandItem);
  });

  colors.forEach((color) => {
    let colorItem = document.createElement("li");
    colorItem.classList.add("filter-item");
    colorItem.innerHTML = `
      <input type="checkbox"  class="checkbox color-checkbox" value="${color}" />
      <span>${color}</span>
    `;

    colorContainer.appendChild(colorItem);
  });
}

function updateProductByFilters(
  products,
  selectedBrands,
  selectedColors,
  selectedPrices,
  category
) {
  let filteredProducts = products.filter((product) => {
    let brandMatch =
      selectedBrands.length > 0 ? selectedBrands.includes(product.brand) : true;

    let colorMatch =
      selectedColors.length > 0 ? selectedColors.includes(product.color) : true;

    let priceMatch =
      selectedPrices.length > 0
        ? selectedPrices.some((range) => {
            let [min, max] = range.split("-").map(Number);
            return max
              ? product.price >= min && product.price <= max
              : product.price >= min;
          })
        : true;

    let categoryMatch =
      product.category.toLowerCase() === category.toLowerCase();

    return brandMatch && colorMatch && priceMatch && categoryMatch;
  });

  let p = products.filter((p) => p.price > 500).map((p) => p.price);
  console.log(p);

  return filteredProducts;
}

function renderSelectedProducts(products) {
  console.log("Danh sách sản phẩm cần hiển thị: ", products);

  products.forEach((data) => {
    console.log("Render sản phẩm: ", data);
    let product = document.createElement("div");
    product.classList.add("product");
    product.innerHTML = `
                    <a href="#">
                      <img
                        src="./assets/images/products/${data.category.toLowerCase()}/${
      data.image
    }"
                        alt=""
                        class="product__img"
                      />
                    </a>
                    <div class="product-info">
                      <p class="product__name">${data.name}</p>
                      <p class="product__type">${data.category}</p>
                      <p class="product__price"><span style="color: yellow">$</span>${data.price.toFixed(
                        2
                      )}</p>
                    </div>
          `;

    productContainer.appendChild(product);
  });
}

function renderProducts(productList, category) {
  let products = productList.filter((p) => p.category === category);
  console.log("Sản phẩm sau khi lọc: ", products);

  const brands = [...new Set(products.map((p) => p.brand))];
  const colors = [...new Set(products.map((p) => p.color))];

  renderFilters(brands, colors);
  renderSelectedProducts(products);

  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      productContainer.innerHTML = "";
      const brands = document.querySelectorAll(".brand-checkbox");
      const colors = document.querySelectorAll(".color-checkbox");
      const prices = document.querySelectorAll(".price-checkbox");

      let selectedBrands = [...brands]
        .filter((c) => c.checked)
        .map((c) => c.value);

      let selectedColors = [...colors]
        .filter((c) => c.checked)
        .map((c) => c.value);

      let selectedPrices = [...prices]
        .filter((c) => c.checked)
        .map((c) => c.value);
      console.log(selectedPrices);

      let selectedProducts = updateProductByFilters(
        products,
        selectedBrands,
        selectedColors,
        selectedPrices,
        category
      );

      console.log(selectedProducts);

      renderSelectedProducts(selectedProducts);
    });
  });
}
