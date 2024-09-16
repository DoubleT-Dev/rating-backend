import { Category } from './category'
import { Address } from './address';

export type Biz = {
    id: string;
    name_en: string;
    logo: string;
    name_mm: string;
    categories_id : string;
    is_active : boolean;
    description : string
    categories: Category
    addresses: Address[]
  };
  