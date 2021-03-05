import Resource from '../../database';

export interface Role extends Partial<Resource> {
  name: 'broker' | 'broker-admin' | 'purchaser' | 'purchaser-admin' | 'superadmin';
}
