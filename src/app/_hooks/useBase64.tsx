export const useBase64 = (type: "encode" | "decode", content: string) => {
  if (type === "encode") {
    return btoa(unescape(encodeURIComponent(content)));
  } else {
    return decodeURIComponent(escape(atob(content)));
  }
};