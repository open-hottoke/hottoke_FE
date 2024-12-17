import { atom } from "recoil";

export const authToken = atom({
  key: "tokenState",
  default: localStorage.getItem("accessToken") || "",
  effects: [
    ({ onSet }) => {
      onSet((newToken) => {
        if (newToken) {
          localStorage.setItem("accessToken", newToken);
        } else {
          localStorage.removeItem("accessToken");
        }
      });
    },
  ],
});
