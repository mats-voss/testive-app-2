import { IUserDetailsScreenData } from '../interface/userDetailsScreenData.interface';
import React, { useState } from 'react';
import { IGradeSchema } from '../interface/gradeSchema.interface';
import { ISchoolClass } from '../interface/schoolClass.interface';

interface ContextProps {
  // User Details screen
  userDetails: IUserDetailsScreenData
  setUserDetails: React.Dispatch<IUserDetailsScreenData>

  // Grade Schema Screen
  customGradeSchemas: IGradeSchema[]
  setCustomGradeSchemas: React.Dispatch<IGradeSchema[]>

  // Grade Schemas from backend
  predefinedGradeSchemas: IGradeSchema[],
  setPredefinedGradeSchemas: React.Dispatch<IGradeSchema[]>

  // School Class Screen
  schoolClasses: ISchoolClass[]
  setSchoolClasses: React.Dispatch<ISchoolClass[]>
}

const context = React.createContext({})
const { Provider } = context

export const OnboardContextProvider = ({ children }: { children: JSX.Element }) => {
  const [userDetails, setUserDetails] = useState<IUserDetailsScreenData>({
    firstName: '',
    lastName: '',
    school: '',
    subjects: []
  })
  const [customGradeSchemas, setCustomGradeSchemas] = useState<IGradeSchema[]>([])
  const [predefinedGradeSchemas, setPredefinedGradeSchemas] = useState<IGradeSchema[]>([{
    _id: 'kajsdlkajlskdnalksndlkasd',
    name: 'Vordefiniertes Schema',
    schema: [
      { minPercentage: 0, grade: '6' },
      { minPercentage: 20, grade: '5' },
      { minPercentage: 35, grade: '4' },
      { minPercentage: 50, grade: '3' },
      { minPercentage: 80, grade: '2' },
      { minPercentage: 95, grade: '1' },
    ],
    canEdit: false
  }])
  const [schoolClasses, setSchoolClasses] = useState<ISchoolClass[]>([])

  return (
    <Provider value={{
      userDetails,
      setUserDetails,
      customGradeSchemas,
      setCustomGradeSchemas,
      predefinedGradeSchemas,
      setPredefinedGradeSchemas,
      schoolClasses,
      setSchoolClasses
    }}>
      {children}
    </Provider>
  )
}

export function useOnboardingContext(): ContextProps {
  const {...state} = React.useContext(context)
  return { ...state as ContextProps }
}
