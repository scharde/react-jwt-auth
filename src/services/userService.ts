import { AxiosResponse } from "axios";
import httpService from "./HttpService";

const getUser = async (id: string): Promise<AxiosResponse> => {
  return await httpService.get(`users/${id}`);
};

export { getUser };
