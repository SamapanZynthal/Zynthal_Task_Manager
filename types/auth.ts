export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  createdAt: string;
}

export interface AuthFormData {
  email: string;
  password: string;
  name?: string;
}