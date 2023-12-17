import { configureStore } from '@reduxjs/toolkit';
import tagsSlice from '../pages/Library/redux/tags.slice';
import schoolCLassSlice from '../pages/SchoolClassOverview/redux/schoolClass.slice';
import gradeSchemaSlice from '../pages/GradeSchema/redux/gradeSchema.slice';
import worksheetSlice from '../pages/WorksheetView/redux/worksheet.slice';

export const store = configureStore({
  reducer: {
    tags: tagsSlice,
    schoolClasses: schoolCLassSlice,
    gradeSchemata: gradeSchemaSlice,
    worksheets: worksheetSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type for reducers
export type AppDispatch = typeof store.dispatch;
