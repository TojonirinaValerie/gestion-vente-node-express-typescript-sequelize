import casual from 'casual';
import { UserAttributes } from '../types/user.type';
import { v4 as uuidv4 } from 'uuid';

export const generateUserData = function (n: number): UserAttributes[] {
  let list: UserAttributes[] = [];
  // for (let i = 0; i < n; i++) {
  //   const user: UserAttributes = {
  //     id: uuidv4(),
  //     firstName: casual.first_name,
  //     lastName: casual.last_name,
  //     email: casual.email,
  //     password: casual.password,
  //     phone: casual.phone,
  //     address: casual.address,
  //   };
  //   list.push(user);
  // }
  return list;
};
