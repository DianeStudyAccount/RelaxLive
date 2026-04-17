import { getServices } from "./helpers";
import { renderTable } from "./renderTable";
import { renderSelect } from "./renderSelect";

export const getData = async (filterValue) => {
  const data = await getServices();
  const select = document.getElementById("typeItem");
  const currentFilter = filterValue || select.value;

  renderSelect(data);

  let filteredData = data;
  if (currentFilter && currentFilter !== "all") {
    filteredData = data.filter(item => item.type === currentFilter);
  }

  renderTable(filteredData);

  if ([...select.options].some(opt => opt.value === currentFilter)) {
    select.value = currentFilter;
  } else {
    select.value = "all";
  }

  return data;
};