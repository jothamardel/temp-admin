import Base from "./base";
import axios from "axios";

class Upload extends Base<any, any> {
  // @ts-ignore
  upload = async (url: string, variables: any) => {
    let formData = new FormData();
    const cloudName = process.env.NEXT_PUBLIC_CLOUD_NAME;
    variables.forEach((attachment: any) => {
      formData.append("file", attachment);
      formData.append("upload_preset", "my_default");
    });
    // @ts-ignore
    const options = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const urlAddress = `https://api.cloudinary.com/v1_1/${cloudName}/upload`
    const response = await axios.post(urlAddress, formData);
    // console.log(response);
    return response.data;
  };
}

// export const uploadFile = async (imageData, setFunc) => {
//   const data = new FormData();
//   const cloudName = "";
//   data.append("file", imageData);
//   data.append("upload_preset", "my_default");
//   return axios
//     .post(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, data, {
//       onUploadProgress: (ProgressEvent) => {
//         // console.log((ProgressEvent.loaded / ProgressEvent.total) * 100);
//         setFunc((ProgressEvent.loaded / ProgressEvent.total) * 100);
//       },
//     })
//     .then(async (res) => {
//       // console.log(res.data.secure_url);
//       setFunc(0);
//       return res.data.secure_url;
//     })
//     .catch((error) => console.log(error.message));
// };

export default new Upload();
