document.addEventListener("DOMContentLoaded", () => {

// Рендер карточек
const productsContainer = document.getElementById("products");
const showMoreBtn = document.getElementById("showMore");

let currentCategory = "all";
let currentProducts = [];
let displayedCount = 0;
let productsData = {};

fetch("catalog.json")
  .then((res) => res.json())
  .then((data) => {
    productsData = data;
    console.log("Загруженные данные:", productsData);
    console.log("hygiene:", productsData.hygiene);
    console.log("Это массив?", Array.isArray(productsData.hygiene));
    console.log(productsData.hygiene);

    renderProducts("all");
  });

// Функция для рендера карточки
function renderCard(product) {
  const card = document.createElement("li");
  card.classList.add("product");
  card.innerHTML = `
        <div class="product__img-wrapper">
        <img class="product__img" src="../img/${product.img}" alt="${product.name}" width="240" height="200">
        </div>
        <h3 class="product__title">${product.name}</h3>
        <p class="product__desc">${product.description}</p>
        <div class="product__meta">
        <span class="product__weight">${product.volume}</span>
        <span class="product__price">${product.price}</span>
        </div>
 `;
  productsContainer.appendChild(card);
}

// Функция для вывода товаров
function renderProducts(category) {
  productsContainer.innerHTML = "";
  displayedCount = 0;

  if (category === "all") {
    // объединяем все массивы и перемешиваем
    currentProducts = [
      ...productsData.hygiene,
      ...productsData.household,
      ...productsData.food,
      ...productsData.kids,
    ].sort(() => Math.random() - 0.5);
  } else {
    currentProducts = [...productsData[category]];
  }

  showNextProducts();
}

// Функция для показа следующих 8 товаров
function showNextProducts() {
  const nextProducts = currentProducts.slice(
    displayedCount,
    displayedCount + 4,
  );
  nextProducts.forEach(renderCard);
  displayedCount += nextProducts.length;

  if (displayedCount >= currentProducts.length) {
    showMoreBtn.style.display = "none";
  } else {
    showMoreBtn.style.display = "block";
  }
}

// Обработчики кнопок категорий
const filterButtons = document.querySelectorAll(".filter");
filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentCategory = btn.dataset.category;
    renderProducts(currentCategory);
    filterButtons.forEach((button) => {
      button.classList.remove("filter--active");
      button.setAttribute("aria-pressed", "false");
    });
    btn.classList.add("filter--active");
    btn.setAttribute("aria-pressed", "true");
  });
});

// Обработчик "Показать еще"
showMoreBtn.addEventListener("click", showNextProducts);

// renderProducts("all");



});