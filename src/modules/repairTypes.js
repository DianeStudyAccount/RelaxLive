export const repairTypes = () => {
  const repairBtns = document.querySelector(".repair-types-nav");
  const repairBtn = document.querySelectorAll(".repair-types-nav__item");
  const repairPics = document.querySelectorAll(".repair-types-slider > div");

  const counterCurrent = document.querySelector(
    ".slider-counter-content__current",
  );
  const counterTotal = document.querySelector(".slider-counter-content__total");

  const mobArrowLeft = document.querySelector("#nav-arrow-repair-left_base");
  const mobArrowRight = document.querySelector("#nav-arrow-repair-right_base");
  const descArrowLeft = document.querySelector("#repair-types-arrow_left");
  const descArrowRight = document.querySelector("#repair-types-arrow_right");

  if (counterTotal) {
    counterTotal.textContent = repairBtn.length;
  }

  const repairChange = (index) => {
    repairBtn.forEach((item) => item.classList.remove("active"));
    repairBtn[index].classList.add("active");

    repairPics.forEach((pic, i) => {
      pic.style.display = i === index ? "block" : "none";
    });

    if (counterCurrent) {
      counterCurrent.textContent = index + 1;
    }

    repairBtn[index].scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  };

  repairBtns?.addEventListener("click", (e) => {
    const btn = e.target.closest(".repair-types-nav__item");
    if (!btn) return;
    repairChange([...repairBtn].indexOf(btn));
  });

  const slider = (step) => {
    let currentIndex = [...repairBtn].findIndex((btn) =>
      btn.classList.contains("active"),
    );
    let newIndex = currentIndex + step;

    if (newIndex >= repairBtn.length) newIndex = 0;
    if (newIndex < 0) newIndex = repairBtn.length - 1;

    repairChange(newIndex);
  };

  [mobArrowRight, descArrowRight].forEach((arrow) =>
    arrow.addEventListener("click", () => slider(1)),
  );
  [mobArrowLeft, descArrowLeft].forEach((arrow) =>
    arrow.addEventListener("click", () => slider(-1)),
  );

  repairChange(0);
};
