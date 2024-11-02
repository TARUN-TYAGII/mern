import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

export const createGoals = createAsyncThunk("goals/create", async (goal, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token;
    return await goalService.createGoal(goal, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const getGoals = createAsyncThunk("goals/getAll", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token;
    return await goalService.getGoals(token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const deteteGoal = createAsyncThunk("goals/delete", async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.data.token;
    return await goalService.deleteGoal(id, token);
  } catch (error) {
    const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload.data);
        state.message = action.payload.message;
      })
      .addCase(createGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload.data;
        state.message = action.payload.message;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(deteteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deteteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter((goal) => goal._id !== action.payload.data._id);
        state.message = action.payload.message;
      })
      .addCase(deteteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
