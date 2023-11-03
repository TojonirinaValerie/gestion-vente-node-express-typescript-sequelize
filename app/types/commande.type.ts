import { Sequelize } from "sequelize";

export interface CommandeAttribut {
  id: string;
  date: Date;
  UserId: string;
  ProduitId: string;
  quantite: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface CommandeFiltre {
  UserId?: string;
  ProduitId?: string;
  date?: Date;
}


export interface CopieCommandeAttribut {
  id: string;
  dateCm: Date;
  UserId: string;
  produitLabelle: string;
  prixAchat: number;
  prixVente: number;
  quantite: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface OldCommande {
  idCm: number;
  dateCm: Date;
  idCl: number;
  idPr: number;
  quantite: number;
}

export interface OldCopieCommande {
  idcpcom: number;
  Datecm: Date;
  idCl: number;
  libelePr: string;
  prixVente: number;
  prixAchat: number;
  Quantite: number;
}

export interface DataBodyCommande {
  UserId: string;
  ProduitId: string;
  quantite: number;
}