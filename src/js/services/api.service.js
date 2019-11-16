const axios = require('axios');

class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async getItems() {
        try {
            const request = `${this.url}store-api?auth=yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz&option=all`;
            return useRequest(request);
        } catch (err) {
            console.error(err);
        }
    }
}

async function useRequest(request) {
    const response = await axios.get(request);
    return await JSON.parse(response.request.response);
}

export const apiService = new ApiService('http://localhost:3000/');