export type AuthUser = {
  _id: string;
  nombre: string;
  email: string;
  fotoPerfil?: string;
};

export type AuthMeResponse = {
  authenticated: boolean;
  user: AuthUser;
};