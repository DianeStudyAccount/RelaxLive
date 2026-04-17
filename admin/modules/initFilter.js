import { getData } from "./getData";

export const initFilter = () => {
  const select = document.getElementById("typeItem");

  select.addEventListener("change", () => {
    getData(select.value);
  });
};