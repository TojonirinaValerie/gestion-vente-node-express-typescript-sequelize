import { Model } from 'sequelize';
import Produits from '../models/produit.model';
import { ProduitAttribut } from '../types/produit.type';

export default class ProduitService {
  static getProduitById(id: string): Promise<Model<ProduitAttribut, ProduitAttribut> | null> {
    return Produits.findOne({ where: { id } });
  }
}
