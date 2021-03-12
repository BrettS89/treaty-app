import Resource from '../../database';

export interface Detail extends Partial<Resource> {
  deal_id: string;
  key: string;
  value?: string | number;
}
