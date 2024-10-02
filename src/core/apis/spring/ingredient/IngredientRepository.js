import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ingredientes';

class IngredientRepository {
    async getAllIngredients() {
        const response = await axios.get('http://localhost:8080/api/v1/ingredientes');
        return response.data;
    }

    async createIngredient(ingredient) {
        const response = await axios.post('http://localhost:8080/api/v1/ingredientes', ingredient);
        return response.data;
    }

    async updateIngredient(id, ingredient) {
        const response = await axios.put(`http://localhost:8080/api/v1/ingredientes/${id}`, ingredient);
        return response.data;
    }

    async deleteIngredient(id) {
        await axios.delete(`http://localhost:8080/api/v1/ingredientes/${id}`);
    }
}

export default new IngredientRepository();
