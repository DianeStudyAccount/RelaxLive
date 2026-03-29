export const numbersClues = () => {
  const inner = document.querySelector(".formula-slider");
  const allSlides = inner.querySelectorAll(".formula-slider__slide");
  const slidesOriginal = document.querySelectorAll(".formula-slider__slide");
  const [prevBtn, nextBtn] = [".slider-arrow_left", ".slider-arrow_right"].map(s => document.querySelector(s));
  const desktopItems = document.querySelectorAll(".formula-item");

  desktopItems.forEach((item) => {
    const popup = item.querySelector(".formula-item-popup");
    if (!popup) return;

    item.addEventListener("mouseover", () => {
      item.style.zIndex = "20";
      popup.style.visibility = "visible";
      popup.style.opacity = "1";

      const rect = popup.getBoundingClientRect();
      if (rect.top < 0) {
        popup.classList.add("popup-bottom");
      }
    });

    item.addEventListener("mouseout", () => {
      item.style.zIndex = "";
      popup.style.visibility = "hidden";
      popup.style.opacity = "0";
      popup.classList.remove("popup-bottom");
    });
  });


  if (!inner || !slidesOriginal.length) return;

  const firstClone = slidesOriginal[0].cloneNode(true);
  const lastClone = slidesOriginal[slidesOriginal.length - 1].cloneNode(true);
  
  inner.appendChild(firstClone);
  inner.insertBefore(lastClone, slidesOriginal[0]);

  let currentIndex = 1;
  let isMoving = false;

  const updateSlider = (animation = true) => {
    const containerWidth = inner.parentElement.offsetWidth;
    const slideWidth = allSlides[0].offsetWidth;

    inner.style.transition = animation ? "transform 0.4s ease-in-out" : "none";

    allSlides.forEach((slide, i) => {
      const popup = slide.querySelector(".formula-item-popup");
      const isActive = i === currentIndex;

      slide.style.opacity = isActive ? "1" : "0.4";
      slide.style.transform = isActive ? "scale(1.4)" : "scale(0.8)";
      slide.style.zIndex = isActive ? "10" : "1";

      if (popup) {
        popup.style.opacity = isActive ? "1" : "0";
        popup.style.visibility = isActive ? "visible" : "hidden";
        
        if (isActive) {
          const rect = popup.getBoundingClientRect();
          rect.top < 0 ? popup.classList.add("popup-bottom") : popup.classList.remove("popup-bottom");
        }
      }
    });

    const offset = (containerWidth / 2) - (slideWidth / 2) - (currentIndex * slideWidth);
    inner.style.transform = `translateX(${offset}px)`;
  };

  inner.addEventListener("transitionend", () => {
    isMoving = false;
    if (currentIndex === 0) {
      currentIndex = allSlides.length - 2;
      updateSlider(false);
    }
    if (currentIndex === allSlides.length - 1) {
      currentIndex = 1;
      updateSlider(false);
    }
  });

  const move = (step) => {
    if (isMoving) return;
    isMoving = true;
    currentIndex += step;
    updateSlider();
  };

  nextBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    move(1);
  });

  prevBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    move(-1);
  });

  updateSlider(false);
  window.addEventListener("resize", () => updateSlider(false));
};