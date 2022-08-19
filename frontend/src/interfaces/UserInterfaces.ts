export interface I_UserAuthRequest {
  name?: string;
  email: string;
  password: string;
}

export interface I_UserAuthResponse {
  name: string;
  email: string;
  role: string;
}
