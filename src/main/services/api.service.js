import axios from 'axios';

class ApiService {
    constructor(baseUrl) {
        this.url = baseUrl;
    }

    async getCategory(category) {
        try {
            const request = `${this.url}/api/category/${encodeURIComponent(category)}`;
            return useRequest(request); 
        } catch (err) {
            console.error(err);
        }
    }

    async getCategories() {
        try {
            const request = `${this.url}/api/categories`;
            return useRequest(request); 
        } catch (err) {
            console.error(err);
        }
    }

    async getItems(sorting) {
        try {
            if (sorting) {
                const request = `${this.url}/api/items?sorting=${sorting}`;
                return useRequest(request); 
            } else {
                const request = `${this.url}/api/items`;
                return useRequest(request); 
            }
            
        } catch (err) {
            console.error(err);
        }
    }

    async getItemsOne(category, sorting) {
        try {
            if (sorting) {
                const request = `${this.url}/api/items/${encodeURIComponent(category.toLowerCase())}?sorting=${sorting}`;
                return useRequest(request);
            } else {
                const request = `${this.url}/api/items/${encodeURIComponent(category.toLowerCase())}`;
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

export const apiService = new ApiService(document.defaultView.location.origin);