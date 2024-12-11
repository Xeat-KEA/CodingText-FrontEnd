import api from "../_api/config";

export const useImageHandler = async (
  files: FileList,
  accessToken: string,
  role?: string
) => {
  const file = files[0];
  const formData = new FormData();

  const timestamp = new Date().toISOString().replace(/[-:.]/g, "");
  const newFileName = `img${timestamp}${file.name.substring(
    file.name.lastIndexOf(".")
  )}`;

  formData.append("image", file, newFileName);

  const apiEndpoint =
    role === "ADMIN"
      ? "/blog-service/admin/upload" // 관리자 이미지 업로드
      : "/blog-service/blog/image/upload"; // 사용자 이미지 업로드

  try {
    const response = await api.post(apiEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: accessToken,
      },
    });
    console.log(response);
    const { uploadImageUrl } = response.data;

    return uploadImageUrl;
  } catch (error) {
    console.error("이미지 업로드 실패:", error);
    return null;
  }
};
