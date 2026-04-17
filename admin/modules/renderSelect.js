export const renderSelect = (data) => {
  const select = document.getElementById("typeItem");

  const types = [...new Set(data.map(item => item.type))];

  select.innerHTML = `<option value="all">Все услуги</option>`;

  types.forEach(type => {
    select.innerHTML += `<option value="${type}">${type}</option>`;
  });
};