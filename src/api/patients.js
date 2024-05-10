import axiosInstance from "../utils/axiosInstance";

export const getPatientsApi = async (search) => await axiosInstance.get(`/patient?searchText=${search}`)
export const getPatientByIdApi = async (patientId) => await axiosInstance.get(`/patient/${patientId}`);
export const approvePatientApi = async (patientId) => await axiosInstance.post(`/patient/approve/${patientId}`);

export const updatePatientApi = async (patientId, type, values) => await axiosInstance.post(`/patient/update/${patientId}?type=${type}`, values);
export const updatePatientImageApi = async (dataToSubmit) => await axiosInstance.post('/patient/updateImage', dataToSubmit);

export const addCommentApi = async (patientId, dataToSubmit) => await axiosInstance.post(`/patient/addComment/${patientId}`, dataToSubmit);
export const updateCommentApi = async (patientId, commentId, dataToSubmit) => await axiosInstance.post(`/patient/updateComment/${patientId}/${commentId}`, dataToSubmit);
export const removeCommentApi = async (patientId, commentId) => await axiosInstance.post(`/patient/removeComment/${patientId}/${commentId}`)

export const addTreatmentApi = async (patientId, dataToSubmit) => await axiosInstance.post(`/patient/addTreatment/${patientId}`, dataToSubmit);
export const updateTreatmentApi = async (patientId, treatmentId, dataToSubmit) => await axiosInstance.post(`/patient/updateTreatment/${patientId}/${treatmentId}`, dataToSubmit);
export const removeTreatmentApi = async (patientId, treatmentId) => await axiosInstance.post(`/patient/removeTreatment/${patientId}/${treatmentId}`)

export const addFluidBalanceApi = async (patientId, dataToSubmit) => await axiosInstance.post(`/patient/addFluidBalance/${patientId}`, dataToSubmit);
export const updateFluidBalanceApi = async (patientId, fluidBalanceId, dataToSubmit) => await axiosInstance.post(`/patient/updateFluidBalance/${patientId}/${fluidBalanceId}`, dataToSubmit);
export const removeFluidBalanceApi = async (patientId, fluidBalanceId) => await axiosInstance.post(`/patient/removeFluidBalance/${patientId}/${fluidBalanceId}`)
