import { toggleVisibility, close } from './helpers.js';

export const portfolio = () => {
  const portfolioSection = document.querySelector(".portfolio");
  if (!portfolioSection) return;

  const descSlides = document.querySelectorAll(".portfolio-slider.mobile-hide .portfolio-slider__slide");
  const mobSlides = document.querySelectorAll(".portfolio-slider-mobile .portfolio-slider__slide-frame");
  
  const arrowLeft = document.getElementById("portfolio-arrow_left");
  const arrowRight = document.getElementById("portfolio-arrow_right");
  const popup = document.querySelector(".popup-portfolio");

  let currentIndex = 0;
  let popupIndex = 0;

  const updateCounters = (index, total) => {
    const counters = document.querySelectorAll("#portfolio-counter, #popup-portfolio-counter");
    counters.forEach(counter => {
      const curr = counter.querySelector(".slider-counter-content__current");
      const totalField = counter.querySelector(".slider-counter-content__total");
      if (curr) curr.textContent = index + 1;
      if (totalField) totalField.textContent = total;
    });
  };

  const updateUI = () => {
    const isMobile = window.innerWidth < 1025;
    const max = isMobile ? mobSlides.length - 1 : descSlides.length - 3;

    toggleVisibility(descSlides, (slide, i) => !isMobile && i >= currentIndex && i < currentIndex + 3);

    descSlides.forEach((slide, i) => {
      slide.style.display = (isMobile && i === currentIndex) ? "block" : "none";
    });

    if (arrowLeft) arrowLeft.style.display = currentIndex === 0 ? "none" : "flex";
    if (arrowRight) arrowRight.style.display = currentIndex >= max ? "none" : "flex";

    updateCounters(currentIndex, isMobile ? mobSlides.length : descSlides.length);
  };

  const updatePopupUI = () => {
    const pSlides = document.querySelectorAll(".popup-portfolio-slider__slide");
    const pTexts = document.querySelectorAll(".popup-portfolio-text");

    toggleVisibility(pSlides, (s, i) => i === popupIndex);
    pSlides.forEach(s => { if(s.style.display === 'flex') s.style.display = 'block'; }); 

    toggleVisibility(pTexts, (t, i) => i === popupIndex);
    pTexts.forEach(t => { if(t.style.display === 'flex') t.style.display = 'block'; }); 
    
    updateCounters(popupIndex, pSlides.length);
  };

  arrowRight.addEventListener("click", (e) => {
    e.stopPropagation();
    const isMobile = window.innerWidth < 1025;
    const max = isMobile ? mobSlides.length - 1 : descSlides.length - 3;
    if (currentIndex < max) { currentIndex++; updateUI(); }
  });

  arrowLeft.addEventListener("click", (e) => {
    e.stopPropagation();
    if (currentIndex > 0) { currentIndex--; updateUI(); }
  });

  portfolioSection.addEventListener("click", (e) => {
    if (e.target.closest('.slider-counter') || e.target.closest('.portfolio-arrow')) return;

    const frame = e.target.closest(".portfolio-slider__slide-frame");
    if (frame) {
      const isMobilePart = e.target.closest('.portfolio-slider-mobile');
      const currentList = isMobilePart ? [...descSlides] : [...document.querySelectorAll(".portfolio-slider.mobile-hide .portfolio-slider__slide-frame")];
      
      popupIndex = currentList.indexOf(frame);

      if (popupIndex !== -1) {
        popup.style.display = "flex";
        popup.style.opacity = "1";
        popup.style.visibility = "visible";
        updatePopupUI();
      }
    }
  });

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
        popup.style.display = "none";
      });
    }
  });

  updateUI();
};