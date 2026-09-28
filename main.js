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

});