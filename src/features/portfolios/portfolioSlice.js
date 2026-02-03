import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  portfoliosData: [],
  status: 'idle',
  error: null,
  portfolioDetail: null,
  statusDetail: "idle",
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
      console.log('Error to get portfolios - ', error.message);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

export const fetchPortfolioDetail = createAsyncThunk(
  'portfolios/fetchPortfolioDetail', async (id, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/projects/${id}`, {
        withCredentials: true
      });

      if (!res?.data?.data) {
        return thunkAPI.rejectWithValue(`Failed to get portfolio with id: ${id}`);
      }

      console.log('Portfolio Detail - ', res.data.data);
      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Error to get portfolio detail - ', error);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
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
      .addCase(fetchPortfolioDetail.pending, (state) => {
        state.error = null;
        state.statusDetail = 'loading';
      })

      .addCase(fetchPortfolioDetail.fulfilled, (state, action) => {
        state.error = null;
        state.statusDetail = 'succeeded';
        state.portfolioDetail = action.payload;
      })

      .addCase(fetchPortfolioDetail.rejected, (state, action) => {
        state.error = action.payload;
        state.statusDetail = 'failed';
      })
  }
})

export default portfolioSlice.reducer;
export const selectPortfolio = (state) => state.portfolios.portfoliosData;
export const selectPortfolioStatus = (state) => state.portfolios.status;
export const selectPortfolioError = (state) => state.portfolios.error;
export const selectPortfolioDetail = (state) => state.portfolios.portfolioDetail;
export const selectPortfolioDetailStatus = (state) => state.portfolios.statusDetail;