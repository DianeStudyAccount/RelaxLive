export const phoneNum = () => {
  const phoneInputs = document.querySelectorAll(".phone-mask");

  phoneInputs.forEach((input) => {
    input.addEventListener("focus", () => {
      if (!input.value) input.value = "+7 ";
    });

    input.addEventListener("input", (e) => {
      let value = input.value.replace(/\D/g, "");
      let formatted = "+7 ";

      if (value.length <= 1) {
        input.value = e.inputType === "deleteContentBackward" ? "" : "+7 ";
        return;
      }

      if (value.length > 1) formatted += "(" + value.substring(1, 4);
      if (value.length > 4) formatted += ") " + value.substring(4, 7);
      if (value.length > 7) formatted += "-" + value.substring(7, 9);
      if (value.length > 9) formatted += "-" + value.substring(9, 11);

      input.value = formatted;
    });
  });
};
