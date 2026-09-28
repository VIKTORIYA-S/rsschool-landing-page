const catalogTrack = document.querySelector(".catalog__track");
const catalogArrowLeft = document.querySelector(".catalog__arrow--left");
const catalogArrowRight = document.querySelector(".catalog__arrow--right");
const originalCards = document.querySelectorAll(".catalog__card");

const totalCards = originalCards.length;
let currentSlide = 0;
let isMoving = false;

// 1. Делаем копии первых 3 карточек и ставим их в конец
for (let i = 0; i < Math.min(3, totalCards); i++) {
  const clone = originalCards[i].cloneNode(true);
  catalogTrack.appendChild(clone);
}

// 2. Считаем, на сколько пикселей двигать за один шаг
function getSlideWidth() {
  const cardWidth = originalCards[0].offsetWidth;
  const trackGap = parseFloat(getComputedStyle(catalogTrack).gap);
  return cardWidth + trackGap;
}

// 3. Сдвигаем дорожку
function updateSlider() {
  catalogTrack.style.transform = `translateX(-${currentSlide * getSlideWidth()}px)`;
}

// 4. Мгновенный переход без анимации
function jumpTo(slideNumber) {
  catalogTrack.style.transition = "none";
  currentSlide = slideNumber;
  updateSlider();
  void catalogTrack.offsetWidth; // заставляем браузер применить изменения сразу
  catalogTrack.style.transition = ""; // возвращаем анимацию из CSS
}

// 5. Стрелка вправо
catalogArrowRight.addEventListener("click", () => {
  if (isMoving) return;
  isMoving = true;
  currentSlide += 1;
  updateSlider();
});

// 6. Стрелка влево
catalogArrowLeft.addEventListener("click", () => {
  if (isMoving) return;
  isMoving = true;
  if (currentSlide === 0) {
    jumpTo(totalCards); // незаметно прыгаем на копии в конце
  }
  currentSlide -= 1;
  updateSlider();
});

// 7. Когда анимация закончилась
catalogTrack.addEventListener("transitionend", (event) => {
  if (event.target !== catalogTrack) return;
  if (currentSlide >= totalCards) {
    jumpTo(0); // доехали до копий, незаметно возвращаемся к настоящим
  }
  isMoving = false;
});

// 8. При изменении размера окна пересчитываем позицию
window.addEventListener("resize", () => {
  if (currentSlide >= totalCards) {
    currentSlide = 0;
  }
  isMoving = false;
  jumpTo(currentSlide);
});

updateSlider();





// document.addEventListener("DOMContentLoaded", () => {

//     const catalogTrack = document.querySelector(".catalog__track");
//     const catalogArrowLeft = document.querySelector(".catalog__arrow--left");
//     const catalogArrowRight = document.querySelector(".catalog__arrow--right");
//     const catalogCards = document.querySelectorAll(".catalog__card");

//     let currentSlide = 0;

//     function getSlideWidth() {
//         const cardWidth = catalogCards[0].offsetWidth;
//         const trackGap = parseFloat(getComputedStyle(catalogTrack).gap);
//         return cardWidth + trackGap;
//     }

//     console.log(getSlideWidth());


//     function updateSlider() {
//         let currentMoveSlide =
//           (((currentSlide % catalogCards.length) + catalogCards.length) %
//             catalogCards.length) *
//           getSlideWidth();
//         catalogTrack.style.transform = `translateX(-${currentMoveSlide}px)`
//     }
//     updateSlider();

// catalogArrowRight.addEventListener("click", () => {
//     currentSlide += 1;
//     if (currentSlide > (catalogCards.length - getVisibleCount())) {
//       currentSlide = 0;
//     }

//     updateSlider();
// });

// catalogArrowLeft.addEventListener("click", () => {
//     currentSlide -= 1;
//     if (currentSlide < 0) {
//       currentSlide = catalogCards.length - getVisibleCount();
//     }

//     updateSlider();
// });


//     function getVisibleCount() {
//         let visibleSlide = 0;
//         if (window.innerWidth > 900) {
//             visibleSlide = 3;
//         } else if (window.innerWidth <= 900 && window.innerWidth >= 600) {
//             visibleSlide = 2;
//         } else if (window.innerWidth < 600) {
//             visibleSlide = 1;
//         }
//          return visibleSlide; }


// });




// document.addEventListener("DOMContentLoaded", () => {
//   const track = document.querySelector(".catalog__track");
//   const cards = track.querySelectorAll(".catalog__card");
//   const btnLeft = document.querySelector(".catalog__arrow--left");
//   const btnRight = document.querySelector(".catalog__arrow--right");

//   const total = cards.length;

//   // клонируем
//     const firstClone = cards[0].cloneNode(true);
//     console.log(firstClone);
//   const lastClone = cards[total - 1].cloneNode(true);
//   track.appendChild(firstClone);
//   track.insertBefore(lastClone, cards[0]);

//   let currentSlide = 1; // начинаем со второго элемента
//   const slideWidth =
//     cards[0].offsetWidth + parseFloat(getComputedStyle(track).gap);

//   track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;

//   function moveToSlide(index) {
//     track.style.transition = "transform 0.5s ease";
//     track.style.transform = `translateX(-${index * slideWidth}px)`;
//     currentSlide = index;
//   }

//   btnRight.addEventListener("click", () => {
//     moveToSlide(currentSlide + 1);

//     track.addEventListener(
//       "transitionend",
//       () => {
//         if (currentSlide === total + 1) {
//           track.style.transition = "none";
//           currentSlide = 1;
//           track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
//         }
//       },
//       { once: true },
//     );
//   });

//   btnLeft.addEventListener("click", () => {
//     moveToSlide(currentSlide - 1);

//     track.addEventListener(
//       "transitionend",
//       () => {
//         if (currentSlide === 0) {
//           track.style.transition = "none";
//           currentSlide = total;
//           track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
//         }
//       },
//       { once: true },
//     );
//   });
// });
