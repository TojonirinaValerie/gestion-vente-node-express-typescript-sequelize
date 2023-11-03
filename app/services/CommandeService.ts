import { Model } from 'sequelize';
import Commandes from '../models/commande.model';
import Produits from '../models/produit.model';
import Users from '../models/user.model';
import { CommandeAttribut, CommandeFiltre } from '../types/commande.type';
import { Op } from 'sequelize';

export default class CommandeService {
  // Get list commande avec filtre
  static getListCommande(
    commandeFiltre?: CommandeFiltre,
  ): Promise<Model<CommandeAttribut, CommandeAttribut>[]> {
    let dateInterval = undefined;
    if (commandeFiltre?.date) {
      dateInterval = {
        [Op.gt]: commandeFiltre?.date?.setHours(0, 0, 0, 0),
        [Op.lt]: new Date().setHours(24, 0, 0, 0),
      };
    }
    return Commandes.findAll({
      where: {
        ...commandeFiltre,
        date: {
          [Op.gt]: new Date().setHours(0, 0, 0, 0),
          [Op.lt]: new Date().setHours(24, 0, 0, 0),
        },
      },
      include: [{ model: Users }, { model: Produits }],
    });
  }

  static async getCommande(
    id: string,
  ): Promise<Model<CommandeAttribut, CommandeAttribut> | null> {
    return Commandes.findOne({ where: { id } });
  }
}
