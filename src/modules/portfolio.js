import { close } from './helpers.js';

export const portfolio = () => {
  const portfolioSection = document.querySelector(".portfolio");
  if (!portfolioSection) return;

  const dSlides = document.querySelectorAll(".portfolio-slider.mobile-hide .portfolio-slider__slide");
  const mSlides = document.querySelectorAll(".portfolio-slider-mobile .portfolio-slider__slide-frame");
  
  const arrowLeft = document.getElementById("portfolio-arrow_left");
  const arrowRight = document.getElementById("portfolio-arrow_right");
  const popup = document.querySelector(".popup-portfolio");

  let currentIndex = 0;
  let popupIndex = 0;

  const updateCounters = (index, total) => {
    const counters = document.querySelectorAll("#portfolio-counter, #popup-portfolio-counter");
    counters.forEach(counter => {
      const currentSpan = counter.querySelector(".slider-counter-content__current");
      const totalSpan = counter.querySelector(".slider-counter-content__total");
      
      if (currentSpan) currentSpan.textContent = index + 1;
      if (totalSpan) totalSpan.textContent = total;
    });
  };


  const updateUI = () => {
    const isMobile = window.innerWidth < 1024;
    let max = dSlides.length - 3; 
    if (isMobile) {
      max = mSlides.length - 1; 
    }

    dSlides.forEach((slide, i) => {
      if (!isMobile && i >= currentIndex && i < currentIndex + 3) {
        slide.style.display = "flex";
      } else {
        slide.style.display = "none";
      }
    });
    mSlides.forEach((slide, i) => {
      if (isMobile && i === currentIndex) {
        slide.style.display = "block";
      } else {
        slide.style.display = "none";
      }
    });

    if (arrowLeft) arrowLeft.style.display = (currentIndex === 0) ? "none" : "flex";
    if (arrowRight) arrowRight.style.display = (currentIndex >= max) ? "none" : "flex";

    const totalCount = isMobile ? mSlides.length : dSlides.length;
    updateCounters(currentIndex, totalCount);
  };

  const updatePopupUI = () => {
    const slides = document.querySelectorAll(".popup-portfolio-slider__slide");
    const texts = document.querySelectorAll(".popup-portfolio-text");

    slides.forEach((s, i) => s.style.display = (i === popupIndex) ? "block" : "none");
    texts.forEach((t, i) => t.style.display = (i === popupIndex) ? "block" : "none");
    
    updateCounters(popupIndex, slides.length);
  };

  arrowRight.addEventListener("click", () => {
    const isMobile = window.innerWidth < 1025;
    const max = isMobile ? mSlides.length - 1 : dSlides.length - 3;
    
    if (currentIndex < max) {
      currentIndex++;
      updateUI();
    }
  });

  arrowLeft.addEventListener("click", () => {
    if (currentIndex > 0) {
      currentIndex--;
      updateUI();
    }
  });

  portfolioSection.addEventListener("click", (e) => {
    const frame = e.target.closest(".portfolio-slider__slide-frame");
    if (!frame) return;
    const isMobilePart = e.target.closest('.portfolio-slider-mobile');
    let slidesArray;
    if (isMobilePart) {
      slidesArray = Array.from(mSlides);
    } else {
      slidesArray = Array.from(document.querySelectorAll(".portfolio-slider.mobile-hide .portfolio-slider__slide-frame"));
    }

    popupIndex = slidesArray.indexOf(frame);

    if (popupIndex !== -1) {
      popup.style.display = "flex";
      updatePopupUI();
    }
  });

  popup.addEventListener("click", (e) => {
    const slides = document.querySelectorAll(".popup-portfolio-slider__slide");

    if (e.target.closest("#popup_portfolio_right")) {
      popupIndex = (popupIndex + 1) % slides.length;
      updatePopupUI();
    } else if (e.target.closest("#popup_portfolio_left")) {
      popupIndex = (popupIndex - 1 + slides.length) % slides.length;
      updatePopupUI();
    } else {
      close(e, ".popup-portfolio", () => {
        popup.style.display = "none";
      });
    }
  });

  updateUI();
};