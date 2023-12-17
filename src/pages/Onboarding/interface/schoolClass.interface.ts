export interface ISchoolClass {
  year: string,
  creationId?: string,
  identifier: string,
  gradeSchema: string, // ID or CreationId
  students: IStudent[]
}

interface IStudent {
  creationId?: string,
  firstName: string,
  lastName: string
}
