import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_BASE_URL, axiosInstance } from "../../components/AxiosInstance";

const initialState = {
  blogsData: [] || null,
  status: 'idle',
  error: null,
};

export const fetchBlog = createAsyncThunk(
  'blogs/fetchBlog', async (_, thunkAPI) => {
    try {
      const res = await axiosInstance.get(`${API_BASE_URL}/blogs`, {
        withCredentials: true
      });

      if(!res?.data?.data) {
        return thunkAPI.rejectWithValue('Blogs is not exists!');
      }

      // console.log(res?.data?.data);

      return res?.data?.data ?? [];
    } catch (error) {
      console.log('Failed to get blogs - ', error.response);
      const msg = error?.response?.data?.message;
      return thunkAPI.rejectWithValue(msg);
    }
  }
)

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlog.pending, (state) => {
        state.error = null;
        state.status = 'loading';
      })

      .addCase(fetchBlog.fulfilled, (state, action) => {
        state.error = null;
        state.status = 'succeeded';
        state.blogsData = action.payload;
      })

      .addCase(fetchBlog.rejected, (state, action) => {
        state.error = action.payload;
        state.status = 'failed';
      })
  }
});

export default blogSlice.reducer;
export const selectBlogs = state => state.blogs.blogsData;
export const selectBlogsStatus = state => state.blogs.status;
export const selectBlogsError = state => state.blogs.error;