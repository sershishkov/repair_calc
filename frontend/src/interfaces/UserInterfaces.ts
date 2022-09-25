export interface I_UserAuthRequest {
  name?: string;
  email?: string;
  password?: string;
  currentPassword?: string;
  newPassword?: string;
}

export interface I_UserAuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}
