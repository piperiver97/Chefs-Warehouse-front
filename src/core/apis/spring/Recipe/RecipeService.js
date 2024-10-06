import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/recetas',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const RecipeService = {
  getAllRecipes: async () => {
    try {
      const response = await axiosInstance.get('/');
      return response.data;
    } catch (error) {
      console.error('Error al obtener recetas:', error);
      return [];
    }
  },
  createRecipe: async (recipe) => {
    try {
      const response = await axiosInstance.post('/', recipe);
      return response.data;
    } catch (error) {
      console.error('Error al crear receta:', error);
      return null;
    }
  },
  updateRecipe: async (id, recipe) => {
    try {
      const response = await axiosInstance.put(`/${id}`, recipe);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar la receta con ID: ${id}`, error);
      throw new Error('Error al actualizar la receta');
    }
  },
  deleteRecipe: async (id) => {
    try {
      await axiosInstance.delete(`/${id}`);
    } catch (error) {
      console.error(`Error al eliminar la receta con ID: ${id}`, error);
      throw new Error('Error al eliminar la receta');
    }
  },
};

export default RecipeService;
