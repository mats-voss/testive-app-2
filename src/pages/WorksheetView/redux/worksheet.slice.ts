import { Worksheet } from '../interface/worksheet.interface';
import { EndpointStatus } from '../../../interfaces/endpointStatus.enum';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { backendInstance } from '../../../axios/instance.axios';
import { RootState } from '../../../redux/store.store';
import { RawAttachment } from '../interface/rawAttachment.interface';
import FormData from 'form-data';
import {
  DeleteWorksheetResponse
} from '../interface/deleteWorksheetResponse.interface';
import { WorksheetDTO } from '../interface/worksheetDto.interface';

interface WorksheetState {
  worksheets: WorksheetDTO[];
  status: EndpointStatus;
  error?: any;
}

const initialState: WorksheetState = {
  worksheets: [],
  status: EndpointStatus.IDLE,
  error: null,
};

export const createWorksheet = createAsyncThunk<WorksheetDTO,
  {worksheet: Worksheet; rawAttachments: RawAttachment[]}>(
  'worksheet/create',
  async (creationData: {
    worksheet: Worksheet;
    rawAttachments: RawAttachment[];
  }) => {
    let formData = new FormData();
    creationData?.rawAttachments?.forEach((ra) => {
      formData.append('attachments', {
        uri: ra.path,
        name: ra.name,
        type: ra.mimeType,
      });
    });
    formData.append('worksheet', JSON.stringify(creationData.worksheet));

    // create worksheet on backend
    const response = await backendInstance.post(
      '/worksheet/',
      formData
    );
    return response.data;
  }
);

export const fetchWorksheets = createAsyncThunk<WorksheetDTO[]>(
  'worksheet/fetch-all',
  async () => {
    const response = await backendInstance.get('/worksheet/all/low-data');
    return response.data;
  },
);

export const saveEditedWorksheet = createAsyncThunk<WorksheetDTO, {worksheet: Worksheet; rawAttachments: RawAttachment[]}>(
  'worksheet/edit',
  async (editData: {
    worksheet: Worksheet;
    rawAttachments: RawAttachment[];
  }) => {
    let formData = new FormData();
    editData?.rawAttachments?.forEach((ra) => {
      formData.append('attachments', {
        uri: ra.path,
        name: ra.name,
        type: ra.mimeType,
      });
    });
    formData.append('worksheet', JSON.stringify(editData.worksheet));

    const response = await backendInstance.post(
      '/worksheet/edit',
      formData,
    );
    return response.data;
  },
);

export const deleteWorksheet = createAsyncThunk<DeleteWorksheetResponse,
  string>('worksheet/delete', async (worksheetId: string) => {
  const response = await backendInstance.delete('worksheet/' + worksheetId);
  return response.data;
});

export const worksheetSlice = createSlice({
  name: 'worksheets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all worksheets
    builder.addCase(fetchWorksheets.pending, (state) => {
      state.status = EndpointStatus.LOADING;
    });
    builder.addCase(fetchWorksheets.fulfilled, (state, action) => {
      state.worksheets = action.payload;
      state.status = EndpointStatus.SUCCEEDED;
      console.log('[WorksheetSlice] Worksheets successful loaded!');
    });
    builder.addCase(fetchWorksheets.rejected, (state, action) => {
      state.status = EndpointStatus.FAILED;
      state.error = action.error.message;
      console.log(
        '[WorksheetSlice] FetchWorksheets has failed!',
        action.error.name,
      );
    });

    // Create worksheet
    builder.addCase(createWorksheet.fulfilled, (state, action) => {
      console.log(action.payload);
      state.worksheets.push({
        ...action.payload,
        tasks: [],
      });
      console.log('[WorksheetView] Worksheet successful created!');
    });
    builder.addCase(createWorksheet.rejected, (state, action) => {
      console.warn('[WorksheetView] Worksheet-Creation failed!');
      console.log(action.error.message);
    });

    // Delete Worksheet
    builder.addCase(deleteWorksheet.fulfilled, (state, action) => {
      const deletedWorksheetId = action.payload.worksheetId;
      state.worksheets = state.worksheets.filter(
        (filterWorksheet) => filterWorksheet._id !== deletedWorksheetId,
      );
      console.log('[WorksheetView] Worksheet successful deleted!');
    });
    builder.addCase(deleteWorksheet.rejected, (state, action) => {
      console.warn('[WorksheetView] Worksheet-Delete failed!');
      console.log(action.error.message);
    });

    // Update Worksheet
    builder.addCase(saveEditedWorksheet.fulfilled, (state, action) => {
      const newWorksheet = action.payload;
      state.worksheets = [
        ...state.worksheets.filter(
          (filteredWorksheet) => filteredWorksheet._id !== newWorksheet._id,
        ),
        {
          ...newWorksheet,
          tasks: [],
        },
      ];
      console.log('[WorksheetView] Worksheet successful updated!');
    });
    builder.addCase(saveEditedWorksheet.rejected, (state, action) => {
      console.warn('[WorksheetView] Worksheet-Edit failed!');
      console.log(action.error.message);
    });
  },
});

function getAllWorksheets(state: RootState): WorksheetDTO[] {
  return state.worksheets.worksheets;
}

function getWorksheetStatus(state: RootState): EndpointStatus {
  return state.worksheets.status;
}

export { getAllWorksheets, getWorksheetStatus };

export default worksheetSlice.reducer;
