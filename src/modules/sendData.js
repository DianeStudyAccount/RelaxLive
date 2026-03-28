export const sendData = () => {
  const allBtns = document.querySelectorAll("button");

  allBtns.forEach((btn) => {
    if (btn.textContent.trim() === "Перезвоните мне") {
      btn.addEventListener("click", (e) => {
        e.preventDefault();

        let form = btn.previousElementSibling;

        if (!form || form.tagName !== "FORM") {
          form = btn
            .closest("section, .feedback, .feedback-block")
            ?.querySelector("form");
        }
        if (!form) {
          console.error("Форма для этой кнопки не найдена");
          return;
        }
        const checkbox = form.querySelector('input[type="checkbox"]');
        const checkboxWrapper = checkbox.closest(".checkbox");
        if (checkbox && !checkbox.checked) {
          checkboxWrapper.classList.add("checkbox-error");
          setTimeout(() => {
            checkboxWrapper.classList.remove("checkbox-error");
          }, 500);

          return;
        }

        const formData = new FormData(form);
        const data = {};

        formData.forEach((val, key) => {
          data[key] = val;
        });

        fetch("server.php", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(data),
        }).then((res) => {
          if (res.ok) {
            console.log("data sent");
            form.reset();
          } else {
            console.log("error");
          }
        });
      });
    }
  });
};
