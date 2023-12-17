import { TagCategory } from './TagCategory.enum';

export interface Tag {
  _id?: string;
  __v?: number;
  name: string;
  category: TagCategory;
  owner?: string;
  updatedAt?: string;
  createdAt?: string;
}
