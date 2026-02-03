import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";


const initialState = {
  status: 'idle',
  profile: [],
  error: null,
};

export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/profiles`, {
        withCredentials: true
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Failed to get profiles data');
      }

      // console.log('Profile data- ', res?.data);
      
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to get profiles - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfiles.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.error = null;
        state.profile = action.payload;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
  }
})


export default profileSlice.reducer;
export const selectProfile = (state) => state.profiles.profile;
export const selectProfileStatus = (state) => state.profiles.status;
export const selectProfileError = (state) => state.profiles.error;