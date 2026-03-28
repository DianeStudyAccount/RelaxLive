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
  // Проверяем клик на крестик или на подложку (фон)
  if (e.target.closest(".close") || e.target.classList.contains(popupSelector.replace('.', ''))) {
    if (hideCallback) {
      hideCallback();
    }
  }
};

export { animate, close };
