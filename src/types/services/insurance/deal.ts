import Resource from '../../database';
import { Detail } from './detail';
import { User } from '../security';

export interface Deal extends Partial<Resource> {
  account_id: string;
  user_id: string;
  title?: string;
  detail_ids: string[];
  details: Detail[];
  executive_summary?: string;
  location?: string[];
  user?: User;
}
