import { animate, close } from "./helpers";
export const consult = () => {
  const consultBtn = document.querySelectorAll(".button.button_wide");
  const consultPopup = document.querySelector(".popup-consultation");

  const appear = () => {
    consultPopup.style.visibility = "visible";
    consultPopup.style.display = "flex";

    animate({
      duration: 300,
      timing: (t) => t,
      draw(progress) {
        consultPopup.style.opacity = progress;
      },
    });
  };

  const hide = () => {
    animate({
      duration: 300,
      timing: (t) => t,
      draw(progress) {
        consultPopup.style.opacity = 1 - progress;
        if (progress === 1) {
          consultPopup.style.display = "none";
          consultPopup.style.visibility = "hidden";
        }
      },
    });
  };

  consultBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      appear();
    });
  });

  consultPopup.addEventListener("click", (e) => {
    close(e, ".popup-consultation", hide);
  });
};
