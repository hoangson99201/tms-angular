import { Functionality } from './functionality';
export interface User {
  userId?: number,
  fullname?: string,
  email?: string,
  roleId?: number,
  password?: string,
  functionalities?: Functionality[],
  roleName?: string
}
