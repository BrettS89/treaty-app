import Resource from '../../database';

export interface Deal extends Partial<Resource> {
  account_id: string;
  user_id: string;
  title?: string;
  executive_summary?: string;
  location?: string[];
  gross_written_premium?: number;
  projected_loss_ratio?: string;
  limit?: number;
}
