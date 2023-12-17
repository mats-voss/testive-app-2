import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../../redux/store.store';
import { EndpointStatus } from '../../../interfaces/endpointStatus.enum';
import { backendInstance } from '../../../axios/instance.axios';
import { TagCategory } from '../interfaces/TagCategory.enum';
import { Tag } from '../interfaces/tag.interface';
import { GroupedTags } from '../interfaces/groupedTags.interface';

interface TagsState {
  tags: Tag[];
  status: EndpointStatus;
  error?: any;
}

const initialState: TagsState = {
  tags: [],
  status: EndpointStatus.IDLE,
  error: null,
};

// Slice related thunks
export const fetchAllTags = createAsyncThunk<Tag[]>(
  'tags/fetch-all',
  async () => {
    const response = await backendInstance.get('/tag/all');
    return response.data;
  },
);

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {
    addTagManually: (state, action: PayloadAction<Tag>) => {
      state.tags.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTags.pending, (state) => {
      state.status = EndpointStatus.LOADING;
    });
    builder.addCase(fetchAllTags.fulfilled, (state, action) => {
      state.tags = action.payload;
      state.status = EndpointStatus.SUCCEEDED;
      console.log('[TagsSlice] Tags successful loaded!');
    });
    builder.addCase(fetchAllTags.rejected, (state, action) => {
      state.status = EndpointStatus.FAILED;
      state.error = action.error.message;
      console.warn('[TagsSlice] FetchAllTags has failed!', action.error.name);
    });
  },
});

// Slice related functions
const getAllTags = (state: RootState) => state.tags.tags;

function getAllTagsByCategory(state: RootState, category: TagCategory): Tag[] {
  return state.tags.tags.filter((tag) => tag.category == category);
}

function getAllTagsGroupedByCategory(state: RootState): GroupedTags {
  return {
    year: state.tags.tags.filter((tag) => tag.category == TagCategory.YEAR),
    subject: state.tags.tags.filter(
      (tag) => tag.category == TagCategory.SUBJECT,
    ),
    theme: state.tags.tags.filter((tag) => tag.category == TagCategory.THEME),
  };
}

function getTagById(state: RootState, id: string) {
  return state.tags.tags.find((tag) => tag._id == id);
}

function getTagsById(state: RootState, ids: string[]): Tag[] {
  return state.tags.tags.filter((filterTag) => ids.includes(filterTag._id ?? ''))
}

function getTagsByIdAndCategory(state: RootState, ids: string[], category: TagCategory): Tag[] {
  return state.tags.tags.filter((filterTag) =>
    (ids.includes(filterTag._id ?? '') && filterTag.category === category)
  )
}

const getTagsStatus = (state: RootState) => state.tags.status;
const getTagsError = (state: RootState) => state.tags.error;

export {
  getAllTags,
  getTagsStatus,
  getTagsError,
  getAllTagsByCategory,
  getTagById,
  getAllTagsGroupedByCategory,
  getTagsById,
  getTagsByIdAndCategory
};
export const { addTagManually } = tagsSlice.actions;

// Exporting reducer for global state
export default tagsSlice.reducer;
