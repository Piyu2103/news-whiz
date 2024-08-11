import { createSlice } from "@reduxjs/toolkit";
import { initialThunkState } from "./createThunk";
export const sliceName = 'home'


const homeSlice = createSlice({
    name: sliceName,
    initialState: { ...initialThunkState, getNewsApiPageNumber:1},
    reducers: {
        setGetNewsApiPageNumber: (state, action) => {
          state.setGetNewsApiPageNumber = action.payload
      },

    },
    extraReducers: (builder) => {
        builder.addMatcher(
          (action) =>
            action.type.startsWith(`${sliceName}/`) &&
            action.type.endsWith('/pending'),
          (state, action) => {
            const name = action.type.replace(`${sliceName}/`, '').replace('/pending', '');
            state[name].isLoading = true;
            state[name].isSuccess = false;
            state[name].error = null;
            state[name].isError = false
          }
        );
    
        builder.addMatcher(
          (action) =>
            action.type.startsWith(`${sliceName}/`) &&
            action.type.endsWith('/fulfilled'),
          (state, action) => {
            const name = action.type.replace(`${sliceName}/`, '').replace('/fulfilled', '');
            state[name].isLoading = false;
            state[name].isSuccess = true;
            state[name].data = action.payload;
          }
        );
    
        builder.addMatcher(
          (action) =>
            action.type.startsWith(`${sliceName}/`) &&
            action.type.endsWith('/rejected'),
          (state, action) => {
            const name = action.type.replace(`${sliceName}/`, '').replace('/rejected', '');
            state[name].isLoading = false;
            state[name].isSuccess = false;
            state[name].isError = true
            state[name].error =  {
              code: action.payload.response?.data?.code ? action.payload.response?.data?.code : "rejected",
              statusCode: action.payload.response?.status
            };
            
          }
        );
      },
});

export const homeReducer = homeSlice.reducer;
export const homeInitialState = homeSlice.getInitialState();
export const { setGetNewsApiPageNumber } = homeSlice.actions;