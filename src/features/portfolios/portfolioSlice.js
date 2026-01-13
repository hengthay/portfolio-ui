import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  portfoliosData: [],
  status: 'idle',
  error: null,
};

export const fetchPortfolio = createAsyncThunk(
  'portfolios/fetchPortfolio', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/projects`, {
        withCredentials: true
      });

      console.log('Portfolios data: ',res?.data?.data);

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Portfolio project not exist!');
      }

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to get portfolios - ', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
)

const portfolioSlice = createSlice({
  name: 'portfolios',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolio.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })

      .addCase(fetchPortfolio.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.portfoliosData = action.payload;
      })

      .addCase(fetchPortfolio.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
  }
})

export default portfolioSlice.reducer;
export const selectPortfolio = (state) => state.portfolios.portfoliosData;
export const selectPortfolioStatus = (state) => state.portfolios.status;
export const selectPortfolioError = (state) => state.portfolios.error;