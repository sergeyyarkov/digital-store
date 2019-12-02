const axios = require('axios');
const API_TOKEN = 'yYNfW8ynVO18L1TW5qIkILM1WtWgrVZz';

class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async getCategory(category) {
        try {
            const request = `${this.url}api?token=${API_TOKEN}&category=${encodeURIComponent(category)}`;
            return useRequest(request); 
        } catch (err) {
            console.error(err);
        }
    }

    async getCategories() {
        try {
            const request = `${this.url}api?token=${API_TOKEN}&categories=all`;
            return useRequest(request); 
        } catch (err) {
            console.error(err);
        }
    }

    async getItems(sorting) {
        try {
            if (sorting) {
                const request = `${this.url}api?token=${API_TOKEN}&items=all&sorting=${sorting}`;
                return useRequest(request); 
            } else {
                const request = `${this.url}api?token=${API_TOKEN}&items=all`;
                return useRequest(request); 
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    async getItemsOne(category, sorting) {
        try {
            if (sorting) {
                const request = `${this.url}api?token=${API_TOKEN}&items=all&category=${encodeURIComponent(category.toLowerCase())}&sorting=${sorting}`;
                return useRequest(request);
            } else {
                const request = `${this.url}api?token=${API_TOKEN}&items=all&category=${encodeURIComponent(category.toLowerCase())}`;
                return useRequest(request);
            }
        } catch (err) {
            console.error(err);
        }
    }
}

async function useRequest(request) {
    const response = await axios.get(request);
    return await JSON.parse(response.request.response);
}

export const apiService = new ApiService('http://localhost:3000/', API_TOKEN);