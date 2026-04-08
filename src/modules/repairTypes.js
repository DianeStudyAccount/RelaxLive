import { sliderLogic, showActive, updateCounter } from "./helpers";
export const repairTypes = () => {
  const repairNav = document.querySelector(".repair-types-nav");
  const repairBtn = document.querySelectorAll(".repair-types-nav__item");
  const repairPics = document.querySelectorAll(".repair-types-slider > div");

  const mobArrowLeft = document.querySelector("#nav-arrow-repair-left_base");
  const mobArrowRight = document.querySelector("#nav-arrow-repair-right_base");

  const setActive = sliderLogic({
    max: repairBtn.length,
    btnLeft: document.querySelector("#repair-types-arrow_left"),
    btnRight: document.querySelector("#repair-types-arrow_right"),
    callback: (index) => {
      repairBtn.forEach((btn, i) => {
        btn.classList.toggle("active", i === index);
      });

      showActive(repairPics, index, "block");

      updateCounter(index, repairBtn.length, ".repair-types");

      repairBtn[index].scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    },
  });

  mobArrowLeft.addEventListener("click", () => {
    const currentIndex = [...repairBtn].findIndex((btn) =>
      btn.classList.contains("active"),
    );
    setActive((currentIndex - 1 + repairBtn.length) % repairBtn.length);
  });

  mobArrowRight.addEventListener("click", () => {
    const currentIndex = [...repairBtn].findIndex((btn) =>
      btn.classList.contains("active"),
    );
    setActive((currentIndex + 1) % repairBtn.length);
  });

  repairNav.addEventListener("click", (e) => {
    const btn = e.target.closest(".repair-types-nav__item");
    console.log("Кликнутый элемент:", btn)
    if (btn) {
      const index = [...repairBtn].indexOf(btn);
      console.log("Найденный индекс:", index);
      setActive(index);
    }
  });
};
