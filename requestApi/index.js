//employee
export { getEmployeeApi } from "./employees/getEmployeeApi";
export { addEmployeeApi } from "./employees/addEmployeeApi";
export { updateEmployeeApi } from "./employees/updateEmployeeApi";
export { deleteEmployeeApi } from "./employees/deleteEmployeeApi";
export { getEmployeeByIdApi } from "./employees/getEmployeeByIdApi";


//service
export { addServiceApi } from "./services/addServiceApi";
export { updateServiceApi } from "./services/updateServiceApi";
export { getServiceApi } from "./services/getServiceApi";
export { deleteServiceApi } from "./services/deleteServiceApi";

//roles
export { getRolesApi } from "./getRolesApi";

//title
export { getAllTitleEmployee } from "./getAllTitleEmployee";

//holiday
export { addHolidayApi } from "./holidays/addHolidayApi";
export { cancelHolidayApi } from "./holidays/cancelHolidayApi";
export { getHolidaysApi } from "./holidays/getHolidaysApi";
export { getHolidaysByUserApi } from "./holidays/getHolidaysByUserApi";
export { getHolidayByServiceApi } from "./holidays/getHolidayByServiceApi";
export { refuseHoliday } from "./holidays/refuseHolidayApi";
export { validateHoliday } from "./holidays/validateHolidayApi";
export { prevalideHoliday } from "./holidays/prevalidateHolidayApi";
