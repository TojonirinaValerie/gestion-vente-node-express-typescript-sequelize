import Joi from 'joi';
import { DataBodyProduit, ProduitAttribut } from '../types/produit.type';
import { JoyValidatorMessage } from './UtilsService';
import { DataBodyCommande } from '../types/commande.type';

export default class Validator {
  static produitValidator(
    produit: DataBodyProduit,
  ): Joi.ValidationError | undefined {
    const schema = Joi.object({
      designation: Joi.string().empty().required(),
      prixAchat: Joi.number().required(),
      prixVente: Joi.number().required(),
    }).messages(JoyValidatorMessage);

    const validationResult = schema.validate(produit, {
      abortEarly: false,
    });

    return validationResult.error as Joi.ValidationError | undefined;
  }
  static commandeValidator(commande: DataBodyCommande): Joi.ValidationError | undefined {
    const schema = Joi.object({
      UserId: Joi.string().required(),
      ProduitId: Joi.string().required(),
      quantite: Joi.number().required(),
    }).messages(JoyValidatorMessage);

    const validationResult = schema.validate(commande, {
      abortEarly: false,
    });

    return validationResult.error as Joi.ValidationError | undefined;
  }
}
