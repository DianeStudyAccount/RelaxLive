export const renderTable = (list = []) => {
  const tbody = document.querySelector("#tbody");

  tbody.innerHTML = list.map(item => `
        <tr data-id="${item.id}">
        <td>${item.id}</td>
        <td>${item.type}</td>
        <td>${item.name}</td>
        <td>${item.units}</td>
        <td>${item.cost}</td>
        <td>
          <button class="action-change">🔄 изменить</button>
          <button class="action-remove">🗑️ удалить</button>
        </td>
      </tr>
  `).join("");
};
