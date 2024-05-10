import axiosInstance from "../utils/axiosInstance";


export const registerNextOfKinApi = async (dataToSubmit) => {
    const urlToUse = `/auth/register/patient?type=nextofkin&userId=${localStorage.getItem('userId')}`;
    return await axiosInstance.post(urlToUse, dataToSubmit)
}
export const registerBioDataApi = async (dataToSubmit) => await axiosInstance.post('/auth/register/patient?type=biodata', dataToSubmit);
export const registerWorkerApi = async (values) => await axiosInstance.post('/auth/register/worker', values);
export const loginApi = async (values) => await axiosInstance.post('/auth/login', values)
