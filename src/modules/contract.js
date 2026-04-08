import { sliderLogic, updateCounter, showActive, close } from "./helpers.js";

export const contract = () => {
  const section = document.querySelector(".transparency");
  const popup = document.querySelector(".popup-transparency");

  const items = section.querySelectorAll(".transparency-item");
  const slides = popup.querySelectorAll(".popup-transparency-slider__slide");

  const setActive = sliderLogic({
    max: items.length,
    btnLeft: document.getElementById("transparency-arrow_left"),
    btnRight: document.getElementById("transparency-arrow_right"),
    callback: (index) => {
      if (window.innerWidth < 1024) {
        showActive(items, index, "flex");
      } else {
        items.forEach((item) => (item.style.display = "flex"));
      }
    },
  });

  const setActivePopup = sliderLogic({
    max: slides.length,
    btnLeft: document.querySelector(".popup-arrow_transparency_left"),
    btnRight: document.querySelector(".popup-arrow_transparency_right"),
    callback: (index) => {
      showActive(slides, index, "block");
      updateCounter(index, slides.length, "#transparency-popup-counter");
    },
  });

  section.addEventListener("click", (e) => {
    const item = e.target.closest(".transparency-item");
    if (item) {
      const index = Array.from(items).indexOf(item);

      popup.style.display = "flex";
      popup.style.opacity = "1";
      popup.style.visibility = "visible";

      setActivePopup(index);
    }
  });

  popup.addEventListener("click", (e) => {
    close(e, ".popup-transparency", () => {
      popup.style.display = "none";
    });
  });

  window.addEventListener("resize", () => {
    setActive();
  });
};
