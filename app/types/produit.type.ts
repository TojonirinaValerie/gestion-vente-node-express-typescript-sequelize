export interface ProduitAttribut {
  id: string;
  designation: string;
  prixAchat: number;
  prixVente: number;
  quantiteReste: number;
  updatedAt?: Date;
  createdAt?: Date;
}

export interface OldProduit {
  idPr: number;
  libele: string;
  prixVente: number;
  prixAchat: number;
  quantiteReste: number;
}

export interface DataBodyProduit {
  designation: string;
  prixAchat: number;
  prixVente: number;
}