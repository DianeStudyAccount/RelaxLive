import { animate, close } from "./helpers";

export const modal = () => {
  const popup = document.querySelector(".popup-repair-types");
  const menuBody = document.querySelector(".popup-dialog-menu");
  const menuBtn = document.querySelector(".menu__icon");

  if (!popup) return;

  const appear = () => {
    if (menuBody && menuBody.classList.contains("__active")) {
      menuBody.classList.remove("__active");
      menuBtn?.classList.remove("__active");
    }

    popup.style.visibility = "visible";
    popup.style.display = "flex"
    popup.style.opacity = 0;

    if (window.innerWidth < 768) {
      popup.style.opacity = 1;
    } else {
      animate({
        duration: 300,
        timing: (t) => t,
        draw(progress) {
          popup.style.opacity = progress;
        },
      });
    }
  };

  const hide = () => {
    if (window.innerWidth < 768) {
      popup.style.display = "none";
      popup.style.visibility = "hidden";
    } else {
      animate({
        duration: 300,
        timing: (t) => t,
        draw(progress) {
          popup.style.opacity = 1 - progress;
          if (progress === 1) {
            popup.style.display = "none";
            popup.style.visibility = "hidden";
          }
        },
      });
    }
  };

  document.addEventListener("click", (e) => {
    const openBtn = e.target.closest(".link-list-menu, .link-list-repair");
    if (openBtn) {
      e.preventDefault();
      appear();
    }

    close(e, ".popup-repair-types", hide);
  });
};
