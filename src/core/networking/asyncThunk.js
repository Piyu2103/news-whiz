import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

//Devs dont need to change here

//This Function will return the action type with payload and also control the lifecycle.
export const createFetchAsyncThunk = (sliceName, name) => {
    return createAsyncThunk(
      `${sliceName}/${name}`,    
      async (payload, {rejectWithValue}) => {
        try {
          const response = await api(payload);
          return response;
        } catch (error) {
          return rejectWithValue(error);
        }
      },
    );
  };


  