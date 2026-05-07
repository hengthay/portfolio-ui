import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  certificatesData: [] || null,
  status: 'idle',
  error: null,
};

export const fetchCertificate = createAsyncThunk(
  'certificates/fetchCertificate', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/certificates`, {
        withCredentials: true
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Certificates is not exists!');
      }

      // console.log('Certificates -', res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Failed to get certificates - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)
const certificateSlice = createSlice({
  name: "certificates",
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
    .addCase(fetchCertificate.pending, (state) => {
      state.error = null;
      state.status = 'loading';
    })

    .addCase(fetchCertificate.fulfilled, (state, action) => {
      state.error = null;
      state.status = 'succeeded';
      state.certificatesData = action.payload;
    })

    .addCase(fetchCertificate.rejected, (state, action) => {
      state.error = action.payload;
      state.status = 'failed';
    })
  }
})

export default certificateSlice.reducer;
export const selectCertificate = state => state.certificates.certificatesData;
export const selectCertificateStatus = state => state.certificates.status;
export const selectCertificateError = state => state.certificates.error;