import { atom } from "recoil";

export const userAddress = atom({
  key: "addressState",
  default: ""
})