import { Tag } from '../../Library/interfaces/tag.interface';

export type CreateTestSessionData = {
  worksheetId: string;
  schoolClassId: string;
  subjectTag: Tag;
  themeTag: Tag;
  accessToken: string;
};
