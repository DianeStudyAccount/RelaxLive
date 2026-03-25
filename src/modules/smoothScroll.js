export const smoothScroll = () => {
  const menuLinks = document.querySelectorAll(".popup-menu-nav__item a");
  const btnTo = document.querySelector(".button-footer");
  const menuBtn = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".popup-dialog-menu");
  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));

      if (target) {
        target.scrollIntoView({ 
            behavior: "smooth",
            block: "start"
         });
         if (menuBody && menuBody.classList.contains('__active')) {
          menuBody.classList.remove('__active');
          menuBtn?.classList.remove('__active');
        }
      }
    });
  });

  if (btnTo) {
    btnTo.addEventListener("click", (e) => {
      e.preventDefault();
      const nextSlide = document.querySelector("#main");
      if (nextSlide) {
        nextSlide.scrollIntoView({ behavior: "smooth" });
      }
    });
  }
};
