export interface UserAttributes {
  id: string;
  pseudo: string;
  password: string;
  role: "ADMIN" | "CLIENTS"
  updatedAt?: Date;
  createdAt?: Date;
}

export interface OldClient {
  idCl: number;
  NomCl: string;
}

export const typeUserRole: string[] = [
  "ADMIN",
  "CLIENTS"
]