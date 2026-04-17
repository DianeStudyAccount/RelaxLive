import { close } from "./helpers.js";

export const sendData = () => {
  const forms = document.querySelectorAll("form");
  const thanksPopup = document.querySelector(".popup-thank");

  forms.forEach((form) => {
    form.setAttribute('novalidate', '');

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const nameInput = form.querySelector('input[name="name"]');
      const phoneInput = form.querySelector('input[name="phone"]');
      const checkbox = form.querySelector('input[type="checkbox"]');

      if (checkbox && !checkbox.checked) {
        const wrap = checkbox.closest(".checkbox") || checkbox.parentElement;
        
        wrap.classList.add("checkbox-error");
        setTimeout(() => wrap.classList.remove("checkbox-error"), 500);
        
        return;
      }

      if (nameInput && nameInput.value.trim().length < 2) {
        if (nameInput.value.includes('+7')) {
             nameInput.setCustomValidity("Здесь должно быть имя, а не телефон");
        } else {
             nameInput.setCustomValidity("Введите ваше имя");
        }
        nameInput.reportValidity();
        return;
      }

      if (phoneInput) {
        const digits = phoneInput.value.replace(/\D/g, "");
        if (digits.length < 11) {
          phoneInput.setCustomValidity("Введите корректный номер телефона");
          phoneInput.reportValidity();
          return;
        }
      }
      const formData = new FormData(form);
      const data = Object.fromEntries(formData.entries());
      fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(data),
      })
      .then((res) => {
        if (!res.ok) throw new Error();
        form.reset();

        document.querySelectorAll(".popup").forEach((p) => {
          p.classList.remove("popup-active", "is-open");
          p.style.display = "none";
        });

        if (thanksPopup) {
          thanksPopup.classList.add("popup-active");
          thanksPopup.style.display = "flex";
        }
      })
      .catch((err) => console.error("Ошибка отправки:", err));
    });
  });

  if (thanksPopup) {
    thanksPopup.addEventListener("click", (e) => {
      close(e, ".popup-thank", () => {
        thanksPopup.classList.remove("popup-active");
        thanksPopup.style.display = "none";
      });
    });
  }
};