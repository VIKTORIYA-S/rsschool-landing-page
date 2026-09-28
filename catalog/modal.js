const modal = document.getElementById("modal");
const modalBody = document.getElementById("modalBody");
const modalClose = document.getElementById("modalClose");
const modalContent = document.querySelector(".modal__content");


// Открыть окно с данными товара
let currentProduct = null; // товар, который сейчас открыт в окне
let selected = [];         // номера выбранных вариантов по группам, например [0, 2]

// Считаем итоговую цену: базовая цена + доплата за каждый выбранный вариант
function calcPrice() {
  let total = currentProduct.price;
  currentProduct.options.forEach((group, groupIndex) => {
    total += group.values[selected[groupIndex]].priceDiff;
  });
  return total;
}

// Обновляем строку "Ваш выбор" и цену
function updateSummary() {
  const labels = currentProduct.options.map(
    (group, groupIndex) => group.values[selected[groupIndex]].label,
  );
  document.getElementById("modalSummary").textContent =
    `Ваш выбор: ${labels.join(", ")}`;
  document.getElementById("modalPrice").textContent = `${calcPrice()} грн`;
}

// Открыть окно с данными товара
function openModal(product) {
  currentProduct = product;
  selected = product.options.map(() => 0); // в каждой группе выбран первый вариант

  // Для каждой группы рисуем название и кнопки-варианты
  const optionsHtml = product.options
    .map(
      (group, groupIndex) => `
      <div class="modal__group">
        <p class="modal__group-name">${group.name}</p>
        <div class="modal__values">
          ${group.values
            .map(
              (value, valueIndex) => `
            <button type="button"
              class="modal__option ${valueIndex === 0 ? "modal__option--active" : ""}"
              data-group="${groupIndex}"
              data-value="${valueIndex}"
              aria-pressed="${valueIndex === 0}">${value.label}</button>`,
            )
            .join("")}
        </div>
      </div>`,
    )
    .join("");

  modalBody.innerHTML = `
    <img class="modal__img" src="../img/${product.img}" alt="${product.name}">
    <div class="modal__info">
      <h2 class="modal__title" id="modalTitle">${product.name}</h2>
      <p class="modal__desc">${product.description}</p>
      ${optionsHtml}
      <p class="modal__summary" id="modalSummary"></p>
      <p class="modal__price" id="modalPrice"></p>
    </div>
  `;

  updateSummary();

  modalContent.scrollTop = 0;
  modal.classList.add("modal--open");
  document.documentElement.classList.add("no-scroll");
  document.body.classList.add("no-scroll");
}

// Клик по кнопке-варианту внутри окна
modalBody.addEventListener("click", (event) => {
  const button = event.target.closest(".modal__option");
  if (!button) return; // кликнули не по кнопке-варианту

  const groupIndex = Number(button.dataset.group);
  const valueIndex = Number(button.dataset.value);
  selected[groupIndex] = valueIndex;

  // Подсвечиваем нажатую кнопку, у остальных в этой группе подсветку снимаем
  modalBody
    .querySelectorAll(`.modal__option[data-group="${groupIndex}"]`)
    .forEach((option) => {
      const isActive = option === button;
      option.classList.toggle("modal__option--active", isActive);
      option.setAttribute("aria-pressed", String(isActive));
    });

  updateSummary();
});

// Закрыть окно
function closeModal() {
  modal.classList.remove("modal--open");
  document.documentElement.classList.remove("no-scroll");
  document.body.classList.remove("no-scroll");
}

// Крестик
modalClose.addEventListener("click", closeModal);

// Клик по тёмной области (но не по самому окну)
modal.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

// Клавиша Escape
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});