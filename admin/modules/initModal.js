import { close } from "../../src/modules/helpers";
import { getData } from "./getData";
import { getServiceById } from "./helpers";
import { getFormData } from "./helpers";

export const initModal = () => {
  const modal = document.getElementById("modal");
  const form = document.querySelector("#modal form");
  const tbody = document.getElementById("tbody");
  const addBtn = document.querySelector(".btn-addItem");

  addBtn.addEventListener("click", () => {
    form.reset();
    modal.dataset.editId = "";

    document.querySelector(".modal__header").textContent = "Добавление услуги";

    modal.style.display = "flex";
  });

  tbody.addEventListener("click", async (e) => {
    const changeBtn = e.target.closest(".action-change");
    const removeBtn = e.target.closest(".action-remove");

    if (changeBtn) {
      const id = changeBtn.closest("tr").dataset.id;
      const data = await getServiceById(id);

      document.getElementById("type").value = data.type;
      document.getElementById("name").value = data.name;
      document.getElementById("units").value = data.units;
      document.getElementById("cost").value = data.cost;

      modal.dataset.editId = id;

      document.querySelector(".modal__header").textContent =
        "Редактировать услугу";

      modal.style.display = "flex";

      return;
    }

    if (removeBtn) {
      const id = removeBtn.closest("tr").dataset.id;

      const isConfirm = confirm("Удалить услугу?");
      if (!isConfirm) return;

      await fetch(`http://localhost:4545/services/${id}`, {
        method: "DELETE",
      });

      const currentFilter = document.getElementById("typeItem").value;
      await getData(currentFilter);
      return;
    }
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const editId = modal.dataset.editId;
    const body = getFormData();
    const typeSelect = document.getElementById("type-services");

    if (editId) {
      await fetch(`http://localhost:4545/services/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    } else {
      await fetch("http://localhost:4545/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
    }

    form.reset();
    modal.style.display = "none";
    modal.dataset.editId = "";

    const currentFilter = document.getElementById("typeItem").value;
    await getData(currentFilter);
  });

  modal.addEventListener("click", (e) => {
    close(e, ".modal__overlay", () => {
      modal.style.display = "none";
    });
  });
};
