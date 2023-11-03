import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.config';
import { CommandeAttribut } from '../types/commande.type';
import Users from './user.model';
import Produits from './produit.model';

const Commandes = sequelize.define<Model<CommandeAttribut>>('Commandes', {
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
  quantite: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Produits.belongsToMany(Users, {
  through: {
    model: Commandes,
    unique: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});
Users.belongsToMany(Produits, {
  through: {
    model: Commandes,
    unique: false,
  },
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
});

Commandes.belongsTo(Produits);
Commandes.belongsTo(Users);

Users.hasMany(Commandes);
Produits.hasMany(Commandes);

export default Commandes;
