export const faq = () => {
  const faqWrapper = document.querySelector(".accordion");
  const allQuestions = faqWrapper.querySelectorAll("li");

  faqWrapper.addEventListener("click", (e) => {
    const clicked = e.target.closest(".title_block");

    if (clicked) {
      const parent = clicked.parentElement;

      allQuestions.forEach((item) => {
        if (item != parent) {
          item.querySelector(".title_block").classList.remove("msg-active");
        }
      });
      clicked.classList.toggle("msg-active");
    }
  });
};
