import Config from "react-native-config";

let baseURL = Config.API_BASE_URL

export default  {
    "bss": {
        "baseURL": baseURL,
        "endpoints": {
            "newsApi": {
                "getLatestNews": {
                    "method": "GET",
                    "path": "/v2/everything"
                }
            },
        }
    },
}