import { close } from "./helpers.js";

export const portfolio = () => {
  const portfolioSection = document.querySelector(".portfolio");
  const popup = document.querySelector(".popup-portfolio");
  if (!portfolioSection || !popup) return;

  const dSlides = document.querySelectorAll(
    ".portfolio-slider.mobile-hide .portfolio-slider__slide",
  );
  const mSlides = document.querySelectorAll(
    ".portfolio-slider-mobile .portfolio-slider__slide-frame",
  );

  const allDesktopFrames = document.querySelectorAll(
    ".portfolio-slider.mobile-hide .portfolio-slider__slide-frame",
  );
  const allMobileFrames = document.querySelectorAll(
    ".portfolio-slider-mobile .portfolio-slider__slide-frame",
  );

  const arrowLeft = document.getElementById("portfolio-arrow_left");
  const arrowRight = document.getElementById("portfolio-arrow_right");
  const mArrowLeft = document.getElementById("portfolio-arrow-mobile_left");
  const mArrowRight = document.getElementById("portfolio-arrow-mobile_right");

  let currentIndex = 0;
  let popupIndex = 0;

  const updateCounters = (index, total) => {
    const counters = document.querySelectorAll(
      "#portfolio-counter, #popup-portfolio-counter",
    );
    counters.forEach((counter) => {
      const cur = counter.querySelector(".slider-counter-content__current");
      const tot = counter.querySelector(".slider-counter-content__total");
      if (cur) cur.textContent = index + 1;
      if (tot) tot.textContent = total;
    });
  };

  const updateUI = () => {
    const isMobile = window.innerWidth < 1024;
    const max = isMobile ? mSlides.length - 1 : dSlides.length - 3;

    dSlides.forEach(
      (s, i) =>
        (s.style.display =
          !isMobile && i >= currentIndex && i < currentIndex + 3
            ? "flex"
            : "none"),
    );
    mSlides.forEach(
      (s, i) =>
        (s.style.display = isMobile && i === currentIndex ? "block" : "none"),
    );

    if (arrowLeft)
      arrowLeft.style.display = currentIndex > 0 && !isMobile ? "flex" : "none";
    if (arrowRight)
      arrowRight.style.display =
        currentIndex < max && !isMobile ? "flex" : "none";

    if (mArrowLeft)
      mArrowLeft.style.display = currentIndex > 0 && isMobile ? "flex" : "none";
    if (mArrowRight)
      mArrowRight.style.display =
        currentIndex < max && isMobile ? "flex" : "none";

    updateCounters(currentIndex, isMobile ? mSlides.length : dSlides.length);
  };

  const updatePopupUI = () => {
    const pSlides = document.querySelectorAll(".popup-portfolio-slider__slide");
    const pTexts = document.querySelectorAll(".popup-portfolio-text");

    pSlides.forEach(
      (s, i) => (s.style.display = i === popupIndex ? "block" : "none"),
    );
    pTexts.forEach(
      (t, i) => (t.style.display = i === popupIndex ? "block" : "none"),
    );

    updateCounters(popupIndex, pSlides.length);
  };
  portfolioSection.addEventListener("click", (e) => {
    console.log("1. Клик дошел до portfolioSection");

    const frame = e.target.closest(".portfolio-slider__slide-frame");
    console.log("2. Результат поиска frame:", frame);

    if (!frame) {
      console.log("Остановка: клик был не по картинке (frame не найден)");
      return;
    }

    const isMobile = window.innerWidth < 1024;
    const currentArray = isMobile
      ? Array.from(allMobileFrames)
      : Array.from(allDesktopFrames);

    console.log("3. Массив фреймов для поиска:", currentArray);

    popupIndex = currentArray.indexOf(frame);
    console.log("4. Найденный индекс:", popupIndex);

    if (popupIndex !== -1) {
      popup.classList.add("is-open");
      updatePopupUI();
    } else {
      console.error("Ошибка: Индекс не найден в массиве!");
    }
  });

  const move = (step) => {
    const isMobile = window.innerWidth < 1024;
    const max = isMobile ? mSlides.length - 1 : dSlides.length - 3;
    const next = currentIndex + step;
    if (next >= 0 && next <= max) {
      currentIndex = next;
      updateUI();
    }
  };

  [arrowLeft, mArrowLeft].forEach((a) =>
    a?.addEventListener("click", () => move(-1)),
  );
  [arrowRight, mArrowRight].forEach((a) =>
    a?.addEventListener("click", () => move(1)),
  );

  popup.addEventListener("click", (e) => {
    const pSlides = document.querySelectorAll(".popup-portfolio-slider__slide");

    if (e.target.closest("#popup_portfolio_right")) {
      popupIndex = (popupIndex + 1) % pSlides.length;
      updatePopupUI();
    } else if (e.target.closest("#popup_portfolio_left")) {
      popupIndex = (popupIndex - 1 + pSlides.length) % pSlides.length;
      updatePopupUI();
    } else {
      close(e, ".popup-portfolio", () => {
        popup.classList.remove("is-open");
        popup.style.display = "none";
      });
    }
  });

  window.addEventListener("resize", updateUI);
  updateUI();
};
