import serviceConfig from "../../config/serviceConfig";
import Config from "react-native-config";
import { createApiRequestPayload } from "../../core/networking/utils";
import { getLatestNewsThunk } from "../../core/redux/store/slice/home/thunk.action";
import { thunkDispatch } from "../../core/redux/store/store";
import { getLatestNewshandler } from "./responseHandler";

const API_KEY= Config.API_KEY

export const getLatestNews = async (page) => {
    const { path, method } = serviceConfig.bss.endpoints.newsApi.getLatestNews;

    const parameters = {
        queryParameters: {
            q:'*',
            language:'en',
            pageSize:'100',
            page:page,
            sortBy:'publishedAt',
            apiKey:API_KEY
        }
    }


    const requestPayloadOptions = parameters;
    const requestPayload = createApiRequestPayload(path, method, requestPayloadOptions,getLatestNewshandler);
    return await thunkDispatch(getLatestNewsThunk(requestPayload)).unwrap();
}