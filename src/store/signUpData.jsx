import { atom } from "recoil";

export const signUpData = atom({
  key: "signUpState",
  default: {
    loginId: "",
    username: "",
    role: "입주민",
    password: "",
    part1 : "",
    part2: "",
    jibun: "",
    unitNumber : ""
}
})