import api from "../_api/config";

export const useImageHandler = async (files: FileList, accessToken: string) => {
  const file = files[0];
  const formData = new FormData();

  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const newFileName = `img${timestamp}${file.name.substring(file.name.lastIndexOf("."))}`;
  
  formData.append("image", file, newFileName);

  try {
    const response = await api.post(
      "/blog-service/blog/image/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: accessToken,
        },
      }
    );

    const { uploadImageUrl } = response.data;
    console.log(response);

    return uploadImageUrl;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }
};
