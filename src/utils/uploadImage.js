import axios from "axios"

const uploadImage = async (files) => {
    const dataToUpload = new FormData()
    for (let i = 0; i < files.length; i++) {
        dataToUpload.append('file', files[i])
    }
    dataToUpload.append("upload_preset", "budgetguard")
    dataToUpload.append('cloud_name', 'dx9hqtncs')
    const headers = {
        headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json, text/plain, /"
        }
    }

    return await axios.post('https://api.cloudinary.com/v1_1/dx9hqtncs/image/upload', dataToUpload, headers)
}

export default uploadImage