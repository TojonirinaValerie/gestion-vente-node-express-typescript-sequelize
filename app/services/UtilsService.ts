import Joi from 'joi';

export const JoyValidatorMessage: Joi.LanguageMessages = {
  'string.base': 'Le champ {#label} doit être une chaîne de caractères',
  'number.base': 'Le champ {#label} doit être un nombre',
  'any.required': 'Le champ {#label} est obligatoire',
  'string.empty': 'Le champ {#label} ne doit pas être vide',
  'string.email': "L'email doit être une adresse email valide",
  'string.min': 'Le champ {#label} doit avoir au moins {#limit} caractères',
  'string.max': 'Le champ {#label} ne peut pas dépasser {#limit} caractères',
  'object.unknown': '',
};
