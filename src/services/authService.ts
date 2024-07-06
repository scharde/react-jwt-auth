import { AxiosResponse } from "axios";
import httpService from "./HttpService";
import {
  LoginModel,
  LoginResponseModel,
  RegisterModel,
} from "../models/Authentication";

interface ITokenData {
  id: string;
  email: string;
  exp: number;
  role: string;
}

const saveToken = (token: string) => {
  localStorage.setItem("token", token);
};

const removeToken = () => {
  localStorage.removeItem("token");
};

const getToken = (): string => {
  return localStorage.getItem("token") ?? "";
};

const register = async (data: RegisterModel): Promise<AxiosResponse> => {
  return await httpService.post<RegisterModel, AxiosResponse>(
    "auth/register",
    data
  );
};

const login = async (
  data: LoginModel
): Promise<AxiosResponse<LoginResponseModel>> => {
  return await httpService.post<LoginModel, AxiosResponse>("auth/login", data);
};

const getDataFromToken = (): ITokenData | null => {
  var token = getToken();
  if (token == null || token == "") {
    return null;
  }

  return JSON.parse(atob(token.split(".")[1]));
};

const isTokenValid = (): boolean => {
  var data = getDataFromToken();
  if (data == null) {
    return false;
  }

  return data.exp * 1000 > Date.now();
};

export {
  register,
  login,
  saveToken,
  removeToken,
  getDataFromToken,
  isTokenValid,
  getToken,
};
