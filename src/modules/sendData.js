import { close } from "./helpers";

export const sendData = () => {
  const forms = document.querySelectorAll("form");
  const thanksPopup = document.querySelector(".popup-thank");

  forms.forEach((form) => {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      e.stopPropagation(); 

      const phoneInput = form.querySelector(".phone-mask");
      const checkbox = form.querySelector('input[type="checkbox"]');

      if (phoneInput) phoneInput.setCustomValidity("");

      if (checkbox && !checkbox.checked) {
        const wrap = checkbox.closest(".checkbox");
        wrap.classList.add("checkbox-error");
        setTimeout(() => wrap.classList.remove("checkbox-error"), 500);
        return; 
      }

      const digits = phoneInput ? phoneInput.value.replace(/\D/g, "") : "";
      if (digits.length < 11) {
        phoneInput.setCustomValidity("Введите 11 цифр номера");
        phoneInput.reportValidity();
        return;
      }

      const data = Object.fromEntries(new FormData(form).entries());

      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
        .then(() => {
          form.reset();
          if (phoneInput) phoneInput.setCustomValidity("");

          document.querySelectorAll(".popup").forEach((p) => {
            p.classList.remove("popup-active");
          });

          // Показываем спасибо
          if (thanksPopup) {
            thanksPopup.classList.add("popup-active");
          }
        })
        .catch((err) => console.error("Ошибка при отправке:", err));
    });
  });

  if (thanksPopup) {
    thanksPopup.addEventListener("click", (e) => {
      close(e, ".popup-thank", () => {
        thanksPopup.classList.remove("popup-active");
      });
    });
  }
};