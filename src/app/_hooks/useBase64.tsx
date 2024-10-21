export const useBase64 = (type: "encode" | "decode", content: string) => {
  if (type === "encode") {
    return btoa(encodeURIComponent(content));
  } else {
    return decodeURIComponent(atob(content));
  }
};
