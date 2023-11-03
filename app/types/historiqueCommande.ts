export interface HistoriqueCommandeAttribut {
  id: string;
  date: Date;
  UserId: string;
  ProduitId: string;
  CommandeId: string;
  produitDesignation: string;
  produitPrixVente: number;
  produitPrixAchat: number;
  quantite: number;
  updatedAt?: Date;
  createdAt?: Date;
}
