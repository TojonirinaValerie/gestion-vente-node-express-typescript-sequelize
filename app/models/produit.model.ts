import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.config';
import { ProduitAttribut } from '../types/produit.type';

const Produits = sequelize.define<Model<ProduitAttribut>>('Produits', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  designation: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  prixAchat: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  prixVente: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  quantiteReste: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default Produits;