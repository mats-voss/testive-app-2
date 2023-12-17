import { IGradeSchema } from '../../Onboarding/interface/gradeSchema.interface';
import { EndpointStatus } from '../../../interfaces/endpointStatus.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendInstance } from '../../../axios/instance.axios';
import { RootState } from '../../../redux/store.store';

interface GradeSchemaState {
  gradeSchemata: IGradeSchema[],
  status: EndpointStatus,
  error?: any
}

const initialState: GradeSchemaState = {
  gradeSchemata: [],
  status: EndpointStatus.IDLE,
  error: null
}

export const fetchGradeSchemata = createAsyncThunk<IGradeSchema[]>(
  'gradeSchema/fetch-all',
  async () => {
    const response = await backendInstance.get('/grade-schema/all')
    return response.data
  }
)

export const gradeSchemaSlice = createSlice({
  name: 'gradeSchemata',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGradeSchemata.pending, (state) => {
      state.status = EndpointStatus.LOADING
    })
    builder.addCase(fetchGradeSchemata.fulfilled, (state, action) => {
      state.gradeSchemata = action.payload
      state.status = EndpointStatus.SUCCEEDED
      console.log('[GradeSchemataSlice] Schemata successful loaded!')
    })
    builder.addCase(fetchGradeSchemata.rejected, (state, action) => {
      state.status = EndpointStatus.FAILED
      state.error = action.error.message
      console.warn('[GradeSchemataSlice] FetchGradeSchemata has failed!', action.error.name)
    })
  }
})

function getAllSchemata(state: RootState): IGradeSchema[] {
  return state.gradeSchemata.gradeSchemata
}

function getGradeSchemataStatus(state: RootState): EndpointStatus {
  return state.gradeSchemata.status
}

export { getAllSchemata, getGradeSchemataStatus }

export default gradeSchemaSlice.reducer
