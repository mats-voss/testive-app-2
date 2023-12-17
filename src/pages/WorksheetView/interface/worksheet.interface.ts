import { Tag } from '../../Library/interfaces/tag.interface';
import { Attachment } from './attachment.interface';
import { TaskOptions } from './tasks/task.interface';

export interface Worksheet {
  _id?: string;
  owner?: string;
  name: string;
  isFavorite?: boolean;
  tags?: Tag[];
  attachment?: Attachment;
  tasks?: TaskOptions[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}
