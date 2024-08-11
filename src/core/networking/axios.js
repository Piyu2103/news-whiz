import serviceConfig from "../../config/serviceConfig";


const api = async (payload )=> {

    const {path, method, payloadOptions, responseHandler} = payload;
    let url = path;

            try {
                if(payloadOptions?.parameters?.urlParameters){
                    url = replaceUrlParameters(url,payloadOptions.parameters.urlParameters)
                }
                const response = await axios.request({
                    baseURL: serviceConfig.bss.baseURL,
                    url,
                    method,
                    params: {
                        ...payloadOptions?.parameters?.queryParameters
                    },
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