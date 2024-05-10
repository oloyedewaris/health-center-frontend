import axiosInstance from "../utils/axiosInstance";

export const getFormsApi = async () => await axiosInstance.get('/request')
export const submitAttachmentApi = async (dataToSubmit) => axiosInstance.patch('/request', dataToSubmit)
export const forwardRequestApi = async (formData) => axiosInstance.post('/request/send', formData)
export const deleteRequestApi = async (attachmentId) => axiosInstance.delete(`/request/${attachmentId}`)
export const createFormApi = async (dataToSubmit) => axiosInstance.post('/request', dataToSubmit)
export const getPatientFormsApi = async (patientId) => await axiosInstance.get(`/request/patient/${patientId}`);
export const getWorkerFormsApi = async (workerId) => await axiosInstance.get(`/request/patient/${workerId}`);
