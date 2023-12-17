export interface IGradeSchema {
  name: string,
  _id?: string,
  creationId?: string, // To identify the schema on the backend when used in class selection
  schema: IGradeSchemaEntry[],
  canEdit?: boolean
}

interface IGradeSchemaEntry {
  minPercentage: number | undefined,
  grade: string
}
