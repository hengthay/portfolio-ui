import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  resumesData: [] || null,
  status: 'idle',
  error: null
};

export const fetchResume = createAsyncThunk(
  'resumes/fetchResume', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/educations`, {
        withCredentials: true
      });

      console.log('resumes dat - ', res?.data?.data);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Resume data is not exists');
      }

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to get resumes - ', error.message);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const resumeSlice = createSlice({
  name: 'resumes',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchResume.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })

      .addCase(fetchResume.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.resumesData = action.payload;
      })

      .addCase(fetchResume.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
  }
})

export default resumeSlice.reducer;
export const selectResume = state => state.resumes.resumesData;
export const selectResumeStatus = state => state.resumes.status;
export const selectResumeError = state => state.resumes.error;
