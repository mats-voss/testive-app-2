import { Tag } from './tag.interface';

export interface GroupedTags {
  year?: Tag[];
  subject?: Tag[];
  theme?: Tag[];
}
