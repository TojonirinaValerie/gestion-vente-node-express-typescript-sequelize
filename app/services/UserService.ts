import { Model } from 'sequelize';
import Users from '../models/user.model';
import { UserAttributes } from '../types/user.type';
import Joi from 'joi';
import { JoyValidatorMessage } from './UtilsService';

export class UserService {
  public static signupDataValidator(userData: UserAttributes): {
    value: UserAttributes;
    error: Joi.ValidationError | undefined;
  } {
    const schema = Joi.object({
      firstName: Joi.string().empty().required().max(50),
      lastName: Joi.string().empty().required().max(100),
      email: Joi.string().required().email(),
      password: Joi.string().min(8).max(20),
      phone: Joi.number(),
      address: Joi.string(),
      updatedAt: Joi.string(),
    }).messages(JoyValidatorMessage);

    const validationResult = schema.validate(userData, {
      abortEarly: false,
    });

    return {
      value: validationResult.value as UserAttributes,
      error: validationResult.error as Joi.ValidationError | undefined,
    };
  }

  public static getUserById(id: string) {
    return Users.findOne({ where: { id } });
  }
}
