import axiosInstance from "../utils/axiosInstance";


export const searchWorkersApi = async (args) => await axiosInstance.post('/worker', { findArgs: args });
export const getAdminPatientsApi = async () => await axiosInstance.get(`/admin/patient/`)
export const getAdminWorkersByUnitApi = async (unit) => await axiosInstance.get(`/admin/worker?unit=${unit}`);
export const getAdminAppointmenttApi = async () => await axiosInstance.get(`/admin/appointment/`);
