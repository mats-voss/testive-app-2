import { SchoolClass } from '../../SchoolClassOverview/interfaces/schoolClass.interface';
import React, { useEffect, useState } from 'react';

interface ContextProps {
  canEdit: boolean
  setCanEdit: React.Dispatch<boolean>

  schoolClass: SchoolClass
  setSchoolClass: React.Dispatch<SchoolClass>

  isSchoolClassValid: boolean
  setIsSchoolClassValid: React.Dispatch<boolean>
}

const context = React.createContext({})
const { Provider } = context

export const SchoolClassViewProvider = ({ children }: { children: JSX.Element }) => {
  const [canEdit, setCanEdit] = useState<boolean>(false)
  const [schoolClass, setSchoolClass] = useState<SchoolClass>({} as SchoolClass)
  const [isSchoolClassValid, setIsSchoolClassValid] = useState<boolean>(false)

  useEffect(() => {
    const isBasicDataValid: boolean = (
      schoolClass.year?.name !== '' && schoolClass.identifier !== '' && schoolClass.gradeSchema !== '' && schoolClass.gradeSchema !== undefined
    )
    const isStudentDataValid: boolean = (
      schoolClass.students?.length >= 1 && schoolClass.students.every((student) => student.firstName !== '' && student.lastName !== '')
    )
    setIsSchoolClassValid(isBasicDataValid && isStudentDataValid)
  }, [schoolClass])

  return (
    <Provider value={{
      canEdit,
      setCanEdit,
      schoolClass,
      setSchoolClass,
      isSchoolClassValid,
      setIsSchoolClassValid
    }}>
      {children}
    </Provider>
  )
}

export function useSchoolClassViewContext(): ContextProps {
  const {...state} = React.useContext(context)
  return { ...state as ContextProps }
}
