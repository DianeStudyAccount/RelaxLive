import "../../admin/styles/index.css";
import { checkAuth } from "../../admin/modules/checkAuth";
import { getData } from "../../admin/modules/getData";
import { initModal } from "../../admin/modules/initModal";
import { initFilter } from "../../admin/modules/initFilter";

checkAuth();
const init = async () => {
  await getData();

  initFilter();
};

init();
initModal();
