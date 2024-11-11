import axios from 'axios';

const API_URL = 'http://localhost:3002'; // Ensure port is set to 3002

export const fetchPreviewAlbums = async () => {
    try {
        // headers = `Authorization: Bearer ${localStorage.getItem('token')}`;
        const response = await axios.get(`${API_URL}/preview`);
        return response.data;
    } catch (error) {
        console.error('Error fetching preview albums:', error);
        throw new Error('Failed to fetch preview albums');
    }
};

export const fetchAlbums = async (filters = {}) => {
    try {
        const params = new URLSearchParams();
        
        if (filters.searchQuery) params.append('searchQuery', filters.searchQuery);
        if (filters.genre && filters.genre !== 'All genres') params.append('genre', filters.genre);
        if (filters.decade && filters.decade !== 'All decades') params.append('decade', filters.decade);

        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };

        const response = await axios.get(`${API_URL}/catalog`, { params, ...config });
        return Array.isArray(response.data) ? response.data : [];
    } catch (error) {
        console.error('Error fetching albums:', error);
        throw new Error('Failed to fetch albums');
    }
};

export const fetchAlbumById = async (id) => {
    try {
        // Try fetching from /catalog/:id
        let response = await axios.get(`${API_URL}/catalog/${id}`);
        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        // If not found, try fetching from /preview/:id
        if (error.response && error.response.status === 404) {
            try {
                const response = await axios.get(`${API_URL}/preview/${id}`);
                return response.data;
            } catch (previewError) {
                console.error('Error fetching album from preview:', previewError);
                throw new Error('Failed to fetch album');
            }
        } else {
            console.error('Error fetching album from catalog:', error);
            throw new Error('Failed to fetch album');
        }
    }
};