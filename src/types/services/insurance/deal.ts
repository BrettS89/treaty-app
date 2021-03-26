import Resource from '../../database';
import { Detail } from './detail';
import { User } from '../security';

export interface Deal extends Partial<Resource> {
  account_id: string;
  user_id: string;
  treaty_type: string[];
  insurance_type: string[];
  business_covered?: string;
  effective_date: string;
  contract_term: string;
  reinsurance_coverage: string;
  excess_treaty: boolean;
  admitted: string[];
  program_business: boolean;
  title?: string;
  insurance_company?: string;
  detail_ids: string[];
  details: Detail[];
  executive_summary?: string;
  additional_details?: string;
  location?: string[];
  user?: User;
}
