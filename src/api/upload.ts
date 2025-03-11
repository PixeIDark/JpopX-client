import { axiosInstance } from "@/lib/axios/instance";

interface UploadResponse {
  url: string;
}

export const upload = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await axiosInstance.post<UploadResponse>("/upload/single", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed Image upload:", error);
    return Promise.reject(error);
  }
};
