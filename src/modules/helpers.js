const animate = ({ timing, draw, duration }) => {
  let start = performance.now();
  requestAnimationFrame(function step(time) {
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;
    let progress = timing(timeFraction);
    draw(progress);
    if (timeFraction < 1) requestAnimationFrame(step);
  });
};

const close = (e, popupSelector, hideCallback) => {
  if (
    e.target.closest(".close") ||
    e.target.classList.contains(popupSelector.replace(".", ""))
  ) {
    if (hideCallback) {
      hideCallback();
    }
  }
};

const updateCounter = (index, total, parentSelector) => {
  const parent = document.querySelector(parentSelector);
  if (!parent) return;

  const currentBox = parent.querySelector(".slider-counter-content__current");
  const totalBox = parent.querySelector(".slider-counter-content__total");

  if (currentBox) currentBox.textContent = index + 1;
  if (totalBox) totalBox.textContent = total;
};

const showActive = (elements, activeIndex, displayType = "block") => {
  elements.forEach((item, i) => {
    if (i === activeIndex) {
      item.style.display = displayType;
    } else {
      item.style.display = "none";
    }
  });
};

const sliderLogic = ({ max, btnLeft, btnRight, callback, loop = true }) => {
  let index = 0;

  const changeSlide = (step) => {
    index += step;

    if (loop) {
      if (index >= max) index = 0;
      if ((index < 0)) index = max - 1;
    } else {
      if (index >= max) index = max - 1;
      if (index < 0) index = 0;
    }
    callback(index);
  };

  btnRight.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlide(1);
  });
  btnLeft.addEventListener("click", (e) => {
    e.preventDefault();
    changeSlide(-1);
  });

  callback(index);

  return (newIndex) => {
    index = newIndex;
    callback(index);
  };
   
};

export { animate, close, updateCounter, showActive, sliderLogic };
