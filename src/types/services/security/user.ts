import Resource from '../../database';
import { Role } from './role';

export interface User extends Partial<Resource> {
  account_id: string;
  role_id: string;
  email: string;
  role: Role;
}
