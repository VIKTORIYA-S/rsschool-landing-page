document.addEventListener("DOMContentLoaded", () => {

    const catalogTrack = document.querySelector(".catalog__track");
    const catalogArrowLeft = document.querySelector(".catalog__arrow--left");
    const catalogArrowRight = document.querySelector(".catalog__arrow--right");
    const catalogCards = document.querySelectorAll(".catalog__card");

    let currentSlide = 0;

    function getSlideWidth() {
        const cardWidth = catalogCards[0].offsetWidth;
        const trackGap = parseFloat(getComputedStyle(catalogTrack).gap);
        return cardWidth + trackGap;
    }

    console.log(getSlideWidth());


    function updateSlider() {
        let currentMoveSlide =
          (((currentSlide % catalogCards.length) + catalogCards.length) %
            catalogCards.length) *
          getSlideWidth();
        catalogTrack.style.transform = `translateX(-${currentMoveSlide}px)`
    }
    updateSlider();

catalogArrowRight.addEventListener("click", () => {
    currentSlide += 1;
    if (currentSlide > (catalogCards.length - getVisibleCount())) {
      currentSlide = 0;
    }

    updateSlider();
});

catalogArrowLeft.addEventListener("click", () => {
    currentSlide -= 1;
    if (currentSlide < 0) {
      currentSlide = catalogCards.length - getVisibleCount();
    }

    updateSlider();
});


    function getVisibleCount() {
        let visibleSlide = 0;
        if (window.innerWidth > 900) {
            visibleSlide = 3;
        } else if (window.innerWidth <= 900 && window.innerWidth >= 600) {
            visibleSlide = 2;
        } else if (window.innerWidth < 600) {
            visibleSlide = 1;
        }
         return visibleSlide; }


});




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
