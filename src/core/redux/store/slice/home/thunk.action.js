import {ACTION} from './actionConstants';
import { createFetchAsyncThunk } from "../../../../networking/asyncThunk";
import { sliceName } from ".";

export const getLatestNewsThunk = createFetchAsyncThunk(sliceName, ACTION.GET_LATEST_NEWS);