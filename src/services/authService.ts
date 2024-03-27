import { AxiosResponse } from "axios";
import httpService from "./HttpService";
import {
  LoginModel,
  LoginResponseModel,
  RegisterModel,
} from "../models/Authentication";

const register = async (data: RegisterModel): Promise<AxiosResponse> => {
  return await httpService.post<RegisterModel, AxiosResponse>("register", data);
};

const login = async (
  data: LoginModel
): Promise<AxiosResponse<LoginResponseModel>> => {
  return await httpService.post<LoginModel, AxiosResponse>("login", data);
};

export { register, login };
