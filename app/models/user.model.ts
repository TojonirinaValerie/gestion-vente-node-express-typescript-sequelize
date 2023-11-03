import { DataTypes, Model } from 'sequelize';
import sequelize from '../db.config';
import { UserAttributes, typeUserRole } from '../types/user.type';

const Users = sequelize.define<Model<UserAttributes>>('Users', {
  id: {
    type: DataTypes.STRING,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  pseudo: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM(typeUserRole[0], typeUserRole[1]),
    allowNull: false,
  }
});

export default Users;
