export const getInitialThunkState = (apiCalls) => {
    const initialState = {};
    apiCalls.forEach(e => {
      initialState[e.initialStateKey] = {
        data : e && e.hasOwnProperty('data') ? e.data : {},
        isLoading: false,
        isSuccess: false,
        isError: false,
        error : null 
      };
    });
  
    return initialState;
  };


  export const createApiRequestPayload  = (path,method,payloadOptions,responseHandler) => {
    const payload = {
        path,
        method,
        payloadOptions,
        responseHandler
    }

    return payload;
}