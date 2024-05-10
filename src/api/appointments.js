import axiosInstance from "../utils/axiosInstance";

export const getSchedulesApi = async () => await axiosInstance.get('/appointment/schedules_no')
export const getRequestsApi = async () => await axiosInstance.get('/appointment/requests_no')
export const startAppointmentByStudentApi = async (unit) => await axiosInstance.post(`/appointment/start/unit?unit=${unit}`);
export const getAppointmentsApi = async () => await axiosInstance.get('/appointment')
export const getPatientAppointmentsApi = async (patientId) => await axiosInstance.get(`/appointment/patient/${patientId}`)
export const startAppointmentByStaffApi = async (patientId) => await axiosInstance.post(`/appointment/start?patient=${patientId}`);
export const getAppointmentsByIdApi = async (appointmentId) => await axiosInstance.get(`/appointment/get/${appointmentId}`);
export const forwardPatientApi = async (formData) => await axiosInstance.post('/appointment/forward', formData);
export const pushAttendanceApi = async (appointmentId) => await axiosInstance.post(`/appointment/push/${appointmentId}`);
export const addAttachmentApi = async (dataToSubmit) => await axiosInstance.post('/appointment/attachment', dataToSubmit);
export const removeAttachmentApi = async (dataToSubmit) => await axiosInstance.patch('/appointment/attachment', dataToSubmit);
export const endAppointmentApi = async (appointmentId) => await axiosInstance.post(`/appointment/end/${appointmentId}`);
export const getAppointmentsTimelineApi = async (appointmentId) => await axiosInstance.get(`/appointment/timeline/${appointmentId}`);
export const openAppointmentApi = async (appointmentId) => await axiosInstance.post(`/appointment/open/${appointmentId}`);
