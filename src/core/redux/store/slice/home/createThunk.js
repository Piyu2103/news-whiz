import { getInitialThunkState } from '../../../networking/utils';
import {ACTION} from './actionConstants';

//Add your initialStateKey here, data field is optional only add if data is not {}. This array is used to dynamically generate the initialState with all the states (isLoading....)
export const apiCalls = [
    {
      initialStateKey: ACTION.GET_LATEST_NEWS
    },
  ];
  //Dynamically generate the complete initial state with the initialStateKey
  export const initialThunkState = getInitialThunkState(apiCalls);


  
  

