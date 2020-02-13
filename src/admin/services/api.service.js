import axios from "axios";

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
    
    async getCategoryById(id) {
        try {
            const request = `${this.url}/api/category/id/${id}`;
            return useRequest(request);
        } catch (error) {
            console.log(error)
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

    async getItemsOffset(page) {
        try {
            const request = `${this.url}/api/items/page/${page}`;
            return useRequest(request);
        } catch (err) {
            console.error(err);
        }
    }

    async getItemsQuery(text) {
        try {
            const request = `${this.url}/api/items?q=${text}`;
            return useRequest(request);
        } catch (err) {
            console.error(err);
        }
    }

    async getItemById(id) {
        try {
            const request = `${this.url}/api/items/id/${id}`;
            return useRequest(request);
        } catch (error) {
            console.log(error)
        }
    }

    async getDataById(id) {
        try {
            const request = `${this.url}/api/items/data/${id}`;
            return useRequest(request);
        } catch (error) {
            console.log(error)
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

    async getItemsData() {
        try {
            const request = `${this.url}/api/items/data`;
            return useRequest(request);
        } catch (err) {
            console.log(err);
        }
    }

    async getBuyers() {
        try {
            const request = `${this.url}/api/buyers`;
            return useRequest(request);
        } catch (err) {
            console.error(err);
        }
    }

    async getBuyerById(id) {
        try {
            const request = `${this.url}/api/buyers/${id}`;
            return useRequest(request);
        } catch (error) {
            console.log(error)
        }
    }

    async getBuyersOffset(page) {
        try {
            const request = `${this.url}/api/buyers/page/${page}`;
            return useRequest(request);
        } catch (err) {
            console.error(err);
        }
    }

    async getBillId(bill_id) {
        try {
            const request = `${this.url}/api/buyers/${bill_id}`;
            return useRequest(request);
        } catch (err) {
            console.error(err);
        }
    }

    async getIcons() {
        try {
            const request = `${this.url}/api/icons`;
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

export const apiService = new ApiService(document.defaultView.location.origin);