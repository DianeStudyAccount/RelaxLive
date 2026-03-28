import { animate, close } from "./helpers";
export const privacyPopup = () => {
  const privacyModal = document.querySelector(".popup-privacy");

  const appear = () => {
    privacyModal.style.visibility = "visible";
    privacyModal.style.display = "flex";

    animate({
      duration: 300,
      timing: (t) => t,
      draw(progress) {
        privacyModal.style.opacity = progress;
      },
    });
  };

  const hide = () => {
    animate({
      duration: 300,
      timing: (t) => t,
      draw(progress) {
        privacyModal.style.opacity = 1 - progress;
        if (progress === 1) {
          privacyModal.style.display = "none";
          privacyModal.style.visibility = "hidden";
        }
      },
    });
  };

  document.addEventListener("click", (e) => {
    if (e.target.closest(".link-privacy")) {
      e.preventDefault();
      appear();
    }
    close(e, ".popup-privacy", hide);
  });
};
