import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { JobState, JobFilters } from "@/types";
import { jobApi } from "@/lib/api/jobApi";

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async (filters: JobFilters = {}, { rejectWithValue }) => {
    try {
      const response = await jobApi.getJobs(filters);
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch jobs";
      return rejectWithValue(message);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "jobs/fetchJobById",
  async (jobId: number, { rejectWithValue }) => {
    try {
      const response = await jobApi.getJobById(jobId);
      return response;
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to fetch job details";
      return rejectWithValue(message);
    }
  }
);

const initialState: JobState = {
  jobs: [],
  currentJob: null,
  loading: false,
  error: null,
  filters: {
    search: "",
    type: "",
    location: "",
  },
  pagination: {
    page: 1,
    limit: 6,
    total: 0,
  },
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setFilters: (
      state,
      action: PayloadAction<Partial<typeof initialState.filters>>
    ) => {
      state.filters = { ...state.filters, ...action.payload };

      state.pagination.page = 1;
    },
    clearFilters: (state) => {
      state.filters = {
        search: "",
        type: "",
        location: "",
      };
      state.pagination.page = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
    clearCurrentJob: (state) => {
      state.currentJob = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder

      .addCase(fetchJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs = action.payload.jobs;
        state.pagination.total = action.payload.total;
        state.error = null;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchJobById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJob = action.payload;
        state.error = null;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setFilters,
  clearFilters,
  setPage,
  clearCurrentJob,
  clearError,
} = jobSlice.actions;
export default jobSlice.reducer;
