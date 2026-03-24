export const menu = () => {
  const menuBtn = document.querySelector(".menu__icon");
  const menuBody = document.querySelector(".popup-dialog-menu");
  const closeMenu = document.querySelector(".close-menu");

  menuBtn.addEventListener("click", (e) => {
    e.stopPropagation(); // ВАЖНО: клик не идет дальше к документу
    menuBtn.classList.toggle("__active");
    menuBody.classList.toggle("__active");
  });

  if (closeMenu) {
    closeMenu.addEventListener('click', () => {
      menuBody.classList.remove('__active');
      menuBtn.classList.remove('__active');
    });
  }

  document.addEventListener('click', (e) => {
    if (menuBody.classList.contains('__active')) {
      if (!menuBody.contains(e.target) && !menuBtn.contains(e.target)) {
        menuBody.classList.remove('__active');
        menuBtn.classList.remove('__active');
        console.log("Меню закрыто кликом вне области");
      }
    }
  });
};