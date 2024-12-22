import { atom } from "recoil";
import Cookies from "js-cookie";
export const isLogin = atom({
  key: "isLogin",
  default: Cookies.get("token") ? true : false,
});
