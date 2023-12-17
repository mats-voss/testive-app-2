import { EndpointStatus } from '../../../interfaces/endpointStatus.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SchoolClass } from '../interfaces/schoolClass.interface';
import { backendInstance } from '../../../axios/instance.axios';
import { RootState } from '../../../redux/store.store';
import { CreateSchoolClassDTO } from '../interfaces/createSchoolClass.dto';
import { EditSchoolClassDTO } from '../interfaces/editSchoolClass.dto';
import { DeleteSchoolClassResponse } from '../interfaces/deleteSchoolClassResponse.interface';

interface SchoolClassState {
  schoolClasses: SchoolClass[],
  status: EndpointStatus,
  error?: any,
}

const initialState: SchoolClassState = {
  schoolClasses: [],
  status: EndpointStatus.IDLE,
  error: null
}

export const fetchSchoolClasses = createAsyncThunk<SchoolClass[]>(
  'schoolClasses/fetch-all',
  async () => {
    const response = await backendInstance.get('/school-class/all')
    return response.data
  }
)

export const editSchoolClass = createAsyncThunk<SchoolClass, SchoolClass>(
  'schoolClass/edit',
  async (schoolClass: SchoolClass) => {
    if (schoolClass._id && schoolClass.year && schoolClass.identifier && schoolClass.gradeSchema) {
      const transformedSchoolClass: EditSchoolClassDTO = {
        _id: schoolClass._id,
        year: schoolClass.year.name,
        identifier: schoolClass.identifier,
        gradeSchema: schoolClass.gradeSchema,
        students: schoolClass.students
      }

      const response = await backendInstance.post('/school-class/edit', transformedSchoolClass)
      return response.data
    } else {
      throw new Error('Invalid Data!')
    }
  }
)

export const createSchoolClass = createAsyncThunk<SchoolClass, SchoolClass>(
  'schoolClasses/create',
  async (schoolClass: SchoolClass) => {
    if (schoolClass.year && schoolClass.identifier && schoolClass.gradeSchema) {
      const transformedSchoolClass: CreateSchoolClassDTO = {
        year: schoolClass.year.name,
        identifier: schoolClass.identifier,
        gradeSchema: schoolClass.gradeSchema,
        students: schoolClass.students
      }

      const response = await backendInstance.post('/school-class', transformedSchoolClass)
      return response.data
    } else {
      throw new Error('Invalid Data!')
    }
  }
)

export const deleteSchoolClass = createAsyncThunk<DeleteSchoolClassResponse, string>(
  'schoolClass/delete',
  async (schoolClassId: string) => {
    if (schoolClassId) {
      const response = await backendInstance.delete(`/school-class/${schoolClassId}`)
      return response.data
    } else {
      throw new Error('Invalid Data!')
    }
  }
)

export const schoolCLassSlice = createSlice({
  name: 'schoolClasses',
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    // Fetch all school classes
    builder.addCase(fetchSchoolClasses.pending, (state) => {
      state.status = EndpointStatus.LOADING
    })
    builder.addCase(fetchSchoolClasses.fulfilled, (state, action) => {
      state.schoolClasses = action.payload
      state.status = EndpointStatus.SUCCEEDED
      console.log('[SchoolClassesSlice] Classes successful loaded!')
    })
    builder.addCase(fetchSchoolClasses.rejected, (state, action) => {
      state.status = EndpointStatus.FAILED
      state.error = action.error.message
      console.warn('[SchoolClassSlice] FetchSchoolClasses has failed!', action.error.name)
    })

    // create school-class
    builder.addCase(createSchoolClass.fulfilled, (state, action) => {
      state.schoolClasses.push(action.payload)
      console.log('[SchoolClassSlice] Class successful created!')
    })
    builder.addCase(createSchoolClass.rejected, (state, action) => {
      console.warn('[SchoolClassSlice] School-Class-Creation failed!')
      console.log(action.error.message)
    })

    // Edit school-class
    builder.addCase(editSchoolClass.fulfilled, (state, action) => {
      const indexOfClass = state.schoolClasses.findIndex((schoolClass) => schoolClass._id === action.payload._id)
      state.schoolClasses[indexOfClass] = action.payload
      console.log('[SchoolClassSlice] Class successful edited!')
    })
    builder.addCase(editSchoolClass.rejected, (state, action) => {
      console.warn('[SchoolClassSlice] School-Class-Edit failed!')
      console.log(action.error.message)
    })

    // Delete Class
    builder.addCase(deleteSchoolClass.fulfilled, (state, action) => {
      const deletedClassId = action.payload.schoolClassId
      state.schoolClasses = state.schoolClasses.filter((schoolClass) => schoolClass._id !== deletedClassId)
      console.log('[SchoolClassSlice] Class successful deleted!')
    })
    builder.addCase(deleteSchoolClass.rejected, (state, action) => {
      console.warn('[SchoolClassSlice] School-Class-Delete failed!')
      console.log(action.error.message)
    })
  }
})

function getAllClasses(state: RootState): SchoolClass[] {
  return state.schoolClasses.schoolClasses
}

function getSchoolClassStatus(state: RootState): EndpointStatus {
  return state.schoolClasses.status
}

function getSchoolClassById(state: RootState, _id: string): SchoolClass | undefined {
  return state.schoolClasses.schoolClasses.find((schoolClass) => schoolClass._id === _id)
}

export { getAllClasses, getSchoolClassStatus, getSchoolClassById }

export default schoolCLassSlice.reducer
