export interface RegisterModel {
  name: string;
  email: string;
  password: string;
  role: string
}

export interface LoginModel {
  email: string;
  password: string;
}

export interface ResponseModelBase {
  message: string;
}

export interface RegisterResponseModel extends ResponseModelBase {}

export interface LoginResponseModel extends ResponseModelBase {
  token: string;
}

export enum RegisterStatusType {
  None = 0,
  Success = 1,
  Error = 2,
}
