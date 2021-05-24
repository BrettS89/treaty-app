import Resource from '../../database';
import { Detail } from './detail';
import { User } from '../security';

export interface Deal extends Partial<Resource> {
  access: any[];
  account_id: string;
  file_ids: string[];
  files: Record<string, any>[];
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
  market_list_id: string;
  market_list: any;
  messages?: any[];
  executive_summary?: string;
  additional_details?: string;
  territories?: string[];
  timeline: any;
  user?: User;
}
