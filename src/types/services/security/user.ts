import Resource from '../../database';
import { Role } from './role';
import { Account } from './account';

export interface User extends Partial<Resource> {
  account?: Account;
  account_id: string;
  role_id: string;
  firstname: string;
  lastname: string;
  email: string;
  role: Role;
  user: User;
}
