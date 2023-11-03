import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.config';
import Users from './user.model';
import { HistoriqueCommandeAttribut } from '../types/historiqueCommande';
import Commandes from './commande.model';
import Produits from './produit.model';

const HistoriqueCommandes = sequelize.define<Model<HistoriqueCommandeAttribut>>(
  'HistoriqueCommandes',
  {
    id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      defaultValue: new Date(),
    },
    UserId: {
      type: DataTypes.STRING,
      references: {
        model: Users,
        key: 'id',
      },
    },
    ProduitId: {
      type: DataTypes.STRING,
      references: {
        model: Produits,
        key: 'id',
      },
    },
    CommandeId: {
      type: DataTypes.STRING,
      references: {
        model: Commandes,
        key: 'id',
      },
    },
    produitDesignation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    produitPrixVente: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    produitPrixAchat: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantite: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
);

Commandes.hasOne(HistoriqueCommandes, {
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
HistoriqueCommandes.belongsTo(Commandes);

Users.hasMany(HistoriqueCommandes, {
  onDelete: 'SET NULL',
  onUpdate: 'CASCADE',
});
HistoriqueCommandes.belongsTo(Users);

export default HistoriqueCommandes;
