import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  experiencesData: [] || null,
  status: "idle",
  error: null,
};

export const fetchExperience = createAsyncThunk(
  "experiences/fetchExperience",
  async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/experiences`, {
        withCredentials: true,
      });

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue("Experience is not exisit!");
      }

      // console.log("Experiences - ", res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log("Failed to get Experiences - ", error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const experienceSlice = createSlice({
  name: "experiences",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperience.pending, (state) => {
        state.error = null;
        state.status = "loading";
      })

      .addCase(fetchExperience.fulfilled, (state, action) => {
        state.error = null;
        state.status = "succeeded";
        state.experiencesData = action.payload;
      })

      .addCase(fetchExperience.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default experienceSlice.reducer;
export const selectExperience = state => state.experiences.experiencesData;
export const selectExperienceStatus = state => state.experiences.status;
export const selectExperienceError = state => state.experiences.error;