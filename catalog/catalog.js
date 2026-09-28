document.addEventListener("DOMContentLoaded", () => {

// Рендер карточек
const productsContainer = document.getElementById("products");
const showMoreBtn = document.getElementById("showMore");

let currentCategory = "all";
let currentProducts = [];
let displayedCount = 0;
let productsData = {};

// Обработчики кнопок категорий
const filterButtons = document.querySelectorAll(".filter");


filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    setActiveCategory(btn.dataset.category);
  });
});

fetch("catalog.json")
  .then((res) => res.json())
  .then((data) => {
    productsData = data;

    // Берём из адреса страницы значение после "category="
    const params = new URLSearchParams(window.location.search);
    const categoryFromUrl = params.get("category");

    // Список допустимых категорий берём из самих кнопок
    const validCategories = Array.from(filterButtons).map(
      (button) => button.dataset.category,
    );

    // Если категория из ссылки есть в списке, открываем её, иначе "all"
    const startCategory = validCategories.includes(categoryFromUrl)
      ? categoryFromUrl
      : "all";

    setActiveCategory(startCategory);
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
        <span class="product__price">${product.price} грн</span>
        </div>
 `;
 card.addEventListener("click", () => openModal(product));
  productsContainer.appendChild(card);
}


function setActiveCategory(category) {
  currentCategory = category;
  renderProducts(category);

  filterButtons.forEach((button) => {
    const isActive = button.dataset.category === category;
    button.classList.toggle("filter--active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
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

// Обработчик "Показать еще"
showMoreBtn.addEventListener("click", showNextProducts);





// // 1. Берём из адреса страницы всё, что стоит после знака "?"
// const params = new URLSearchParams(window.location.search);

// // 2. Достаём значение параметра category (например, "hygiene")
// const categoryFromUrl = params.get("category");

// // 3. Выбираем категорию: из ссылки или первую по умолчанию
// const startCategory = categoryFromUrl || "household";

// // 4. Открываем эту категорию
// setActiveCategory(startCategory);



});