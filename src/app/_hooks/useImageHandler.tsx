export const useImageHandler = (files: FileList) => {
  const file = files[0];
  const formData = new FormData();
  formData.append("file", file);

  // 백엔드에 이미지 post
  /* const imgHash = await postManager.uploadImage(formData, accessToken); // 백엔드에게 이미지 Post요청 후 URL 받기
    const IMG_URL = `${BASE_URL}${imgHash}`; */
  const IMG_URL = "https://picsum.photos/id/237/300/200";

  return IMG_URL;
};
