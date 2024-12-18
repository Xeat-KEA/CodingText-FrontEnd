export const useBase64 = (type: "encode" | "decode", content: string) => {
  if (type === "encode") {
    return btoa(
      encodeURIComponent(content).replace(
        /%([0-9A-F]{2})/g,
        function toSolidBytes(match, p1) {
          return String.fromCharCode(Number("0x" + p1));
        }
      )
    );
  } else {
    return decodeURIComponent(
      atob(content)
        .split("")
        .map((c) => {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  }
};
