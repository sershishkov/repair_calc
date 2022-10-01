export interface I_AuthRequest {
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
  role?: string;
  currentPassword?: string;
  newPassword?: string;
  limit?: string;
  page?: string;
}

export interface I_AuthResponse {
  _id: string;
  name: string;
  email: string;
  role: string;
}
