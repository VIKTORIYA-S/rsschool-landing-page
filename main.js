document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const burger = document.getElementById("burger");
  const navMenu = document.getElementById("nav");
  const body = document.body;
  const links = document.querySelectorAll(".nav a");

  // Функция для установки темы
  function setTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }

  themeToggle.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  });

  // Открытие и закрытие меню при клике на бургер
  burger.addEventListener("click", () => {
    const isExpanded = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    navMenu.classList.toggle("nav--open");
    body.classList.toggle("no-scroll");
    html.classList.toggle("no-scroll");
  });

  body.addEventListener("click", (event) => {
    if (!navMenu.contains(event.target) && !burger.contains(event.target)) {
      closeMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  function closeMenu() {
    if (navMenu.classList.contains("nav--open")) {
      navMenu.classList.remove("nav--open");
      burger.setAttribute("aria-expanded", "false");
      body.classList.toggle("no-scroll");
      html.classList.toggle("no-scroll");
    }
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });


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