import serviceConfig from "../../config/serviceConfig";
import axios from "axios";

const transformRequestOptions = (params) => {
    let options = '';
  
    for (const key in params) {
      if (params.hasOwnProperty(key)) {
        const value = params[key];
        
        if (Array.isArray(value)) {
          value.forEach((el) => {
            if (el != null) {
              options += `${encodeURIComponent(key)}=${encodeURIComponent(el)}&`;
            }
          });
        } else if (typeof value !== 'object' && value != null) {
          options += `${encodeURIComponent(key)}=${encodeURIComponent(value)}&`;
        }
      }
    }
  
    return options ? options.slice(0, -1) : '';
  };
  

const api = async (payload )=> {
    
    const {path, method, payloadOptions, responseHandler} = payload;
    let url = path;
            try {
                const response = await axios.request({
                    baseURL: serviceConfig.bss.baseURL,
                    url,
                    method,
                    params: {
                        ...payloadOptions?.queryParameters,
                        page: payloadOptions?.queryParameters?.page || 1,
                    },
                    paramsSerializer:params => transformRequestOptions(params),
                    data: payloadOptions?.data || {}
                });
                // include headers in the response if it exists, otherwise return only data
                return responseHandler(response.data);
            } catch (error) {
                const errorCode = error?.response?.data?.code;
                const errorStatus = error?.response?.status;
                if(errorCode || errorStatus){
                    throw error;
                }
            }
        // }
    
}

export const replaceUrlParameters = (url,urlParameters) => {
    let tempUrl = url;
    Object.keys(urlParameters).forEach((key)=>{
          tempUrl = tempUrl.replace(':'+key,urlParameters[key]);
    })

    return tempUrl;
}



export default api;