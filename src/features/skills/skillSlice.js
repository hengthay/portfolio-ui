import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  skillsData: [] || null,
  status: 'idle',
  error: null,
}

export const fetchSkill = createAsyncThunk(
  'skills/fetchSkill', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/skills`, {
        withCredentials: true
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Skill is not exisits!');
      }

      // console.log('Skills - ', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Failed to get skills - ', error.message);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const skillSlice = createSlice({
  name: "skills",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSkill.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })

      .addCase(fetchSkill.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.skillsData = action.payload;
      })

      .addCase(fetchSkill.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
  }
})

export default skillSlice.reducer;
export const selectSkills = state => state.skills.skillsData;
export const selectSkillsStatus = state => state.skills.status;
export const selectSkillsError = state => state.skills.error;