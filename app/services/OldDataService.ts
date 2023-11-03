import fs from 'fs';
import mime from 'mime';
import path from 'path';
import rootDir from '../rootDir';
import { OldProduit, ProduitAttribut } from '../types/produit.type';
import { v4 as uuidv4 } from 'uuid';
import { OldClient, UserAttributes } from '../types/user.type';
import { CommandeAttribut, OldCommande } from '../types/commande.type';
import Users from '../models/user.model';
import {
  BeneficeJournaliereAttribut,
  OldBeneficeJ,
} from '../types/benefice.type';
import { Model } from 'sequelize';

export enum TABLES {
  beneficej = 1,
  beneficem = 2,
  clients = 4,
  commandes = 4,
  copieCommande = 5,
  produits = 6,
}

export default class OldDataService {
  static getFileType(filePath: string): string | undefined {
    try {
      const fileMimetype: string = mime.lookup(filePath);
      if (fileMimetype) {
        return fileMimetype.split('/')[0];
      }
    } catch (error) {
      console.log(error);
    }
    return undefined;
  }

  static getFileContent(textFile: any): string | undefined {
    // if (this.getFileType(textFile) !== 'text') return undefined;
    try {
      const content: string = fs.readFileSync(textFile, 'utf-8');
      return content;
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }

  public static readDataJSON(): string[] | null {
    const dataPath = path.join(rootDir, 'data', 'gestion_stock.json');
    const data = this.getFileContent(dataPath);

    if (data != undefined) {
      const tab = data.split('[');
      return tab;
    } else {
      return null;
    }
  }

  public static getDataTables<T>(indice: number): T[] | null {
    const dataJSON = this.readDataJSON();
    if (dataJSON != null) {
      const dataTable = dataJSON[indice].split(']')[0];

      return JSON.parse(`[${dataTable}]`) as T[];
    } else return null;
  }

  // ************produit**********
  public static oldProduitToProduitAttribut(old: OldProduit): ProduitAttribut {
    return {
      id: uuidv4(),
      designation: old.libele,
      prixAchat: old.prixAchat,
      prixVente: old.prixVente,
      quantiteReste: old.quantiteReste,
    };
  }

  public static dataOldProduitToDataProduitAttribut(
    olds: OldProduit[],
  ): ProduitAttribut[] {
    let list: ProduitAttribut[] = [];
    olds.forEach((old: OldProduit) => {
      list.push(this.oldProduitToProduitAttribut(old));
    });
    return list;
  }
  //   *********************************

  // ******************* Clients **********************
  public static oldClientToUserAttribut(old: OldClient): UserAttributes {
    return {
      id: uuidv4(),
      pseudo: old.NomCl,
      password: '1234',
      role: 'CLIENTS',
    };
  }
  public static dataOldClientToDataUserAttribut(
    olds: OldClient[],
  ): UserAttributes[] {
    let list: UserAttributes[] = [];
    olds.forEach((old: OldClient) => {
      list.push(this.oldClientToUserAttribut(old));
    });
    return list;
  }
  //   ******************************************

  // ******************* Benefice **********************
  public static async oldBeneficeJToBeneficeJAttribut(
    old: OldBeneficeJ,
  ): Promise<BeneficeJournaliereAttribut | null> {
    const user: Model<UserAttributes, UserAttributes> | null =
      await Users.findOne({
        where: {
          pseudo: old.idCl === 1 ? 'Lolo' : 'Haja',
        },
      });
    if (user === null) return null;
    return {
      id: uuidv4(),
      date: old.dateBJ,
      benefice: old.beneficeJ,
      UserId: user?.dataValues.pseudo,
    };
  }

//   public static dataOldBeneficeJToDataBeneficeJAttribut(
//     olds: OldBeneficeJ[],
//   ): BeneficeJournaliereAttribut[] {
//     let list: UserAttributes[] = [];
//     for()
//     olds.forEach(async (old: OldBeneficeJ) => {
//         const result = await this.oldBeneficeJToBeneficeJAttribut(old);
//         if(result !== null){
//             list.push(result);
//         }
//     });
//     return list;
//   }
  //   ******************************************
}
