import { sliderLogic, showActive } from "./helpers";

export const feedback = () => {
  const allReviews = document.querySelectorAll(".reviews-slider__slide");

  let currentIndex = 0;

  sliderLogic({
    max: allReviews.length,
    btnLeft: document.getElementById("reviews-arrow_left"),
    btnRight: document.getElementById("reviews-arrow_right"),
    callback: (index) => {
      showActive(allReviews, index, "flex");
    },
  });
};
