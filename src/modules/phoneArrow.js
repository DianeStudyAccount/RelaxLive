export const phoneArrow = () => {
  const arrow = document.querySelector(".header-contacts__arrow");
  const wrap = document.querySelector(".header-contacts-wrap");
  const phoneContainer = document.querySelector(".header-contacts__phone-number-wrap");

  if (!arrow || !wrap) return;

  arrow.addEventListener("click", () => {
    let secondTel = document.querySelector(".second-phone");

    if (secondTel) {
      secondTel.remove();
      arrow.style.transform = "rotate(0deg)";
    } else {
      secondTel = document.createElement("a");
      secondTel.classList.add("header-contacts__phone-number", "second-phone");
      secondTel.textContent = "+7 (987) 345-67-80";
      secondTel.href = "tel:+79873456780";
 
      secondTel.style.display = "block";
      secondTel.style.position = "relative";

      phoneContainer.after(secondTel);

      arrow.style.transform = "rotate(180deg)";
    }
  });
};