import axiosInstance from "../utils/axiosInstance";


export const searchWorkersApi = async (args) => await axiosInstance.post('/worker', { findArgs: args });
export const getWorker = async (workerId) => await axiosInstance.get(`/worker/${workerId}`);
export const changeWorkerStatusApi = async (status, workerId) => await axiosInstance.post(`/admin/worker/`, { status, workerId })

export const updateWorkerPasswordApi = async (values) => await axiosInstance.post('/worker/update/password', values);
export const updateWorkerImageApi = async (values) => await axiosInstance.post('/worker/updateImage', values)
export const updateWorkerApi = async (values) => await axiosInstance.post('/worker/update', values)
