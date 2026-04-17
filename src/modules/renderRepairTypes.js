import repairData from '../../db/db.json'; 

export const renderRepairTypes = () => {
  const navList = document.querySelector('.nav-list-popup-repair');
  const tableBody = document.querySelector('.popup-repair-types-content-table__list tbody');
  const titleHeader = document.querySelector('#switch-inner');

  if (!navList || !tableBody) return;

  const renderTable = (filterType) => {
    const filtered = repairData.services.filter(item => item.type === filterType);
    if (titleHeader) titleHeader.textContent = filterType;

    tableBody.innerHTML = filtered.map(item => `
        <tr class="mobile-row">
            <td class="repair-types-name">${item.name}</td>
            <td class="repair-types-value">${item.units}</td>
            <td class="repair-types-value">${item.cost} руб.</td>
        </tr>
    `).join('');
  };

  const categories = [...new Set(repairData.services.map(item => item.type))];
  navList.innerHTML = '';

  categories.forEach((category, index) => {
    const btn = document.createElement('button');
    btn.className = `button_o popup-repair-types-nav__item ${index === 0 ? 'active' : ''}`;
    btn.textContent = category;
    btn.addEventListener('click', () => {
      document.querySelectorAll('.popup-repair-types-nav__item').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderTable(category);
    });
    navList.append(btn);
  });

  renderTable(categories[0]);
};