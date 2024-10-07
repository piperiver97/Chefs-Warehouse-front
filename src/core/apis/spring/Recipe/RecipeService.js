import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/recetas',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Función para transformar el formato del frontend al backend
const transformToBackendFormat = (recipe) => {
  return {
    nombre: recipe.nombre,
    tiempoPreparacion: parseInt(recipe.tiempo_preparacion) || 0,
    tiempoCoccion: parseInt(recipe.tiempo_coccion) || 0,
    porciones: parseInt(recipe.porciones) || 0,
    dificultad: recipe.dificultad,
    elaboracion: recipe.elaboracion,
    tecnicasCocina: recipe.tecnicas_cocina || '',
  };
};

// Función para transformar el formato del backend al frontend
const transformToFrontendFormat = (recipe) => {
  return {
    id: recipe.id,
    nombre: recipe.nombre,
    tiempo_preparacion: recipe.tiempoPreparacion,
    tiempo_coccion: recipe.tiempoCoccion,
    porciones: recipe.porciones,
    dificultad: recipe.dificultad,
    elaboracion: recipe.elaboracion,
    tecnicas_cocina: recipe.tecnicasCocina,
  };
};

export default {
  async getAllRecipes() {
    const response = await axiosInstance.get('');
    return response.data.map(transformToFrontendFormat);
  },

  async createRecipe(recipe) {
    const backendRecipe = transformToBackendFormat(recipe);
    const response = await axiosInstance.post('', backendRecipe);
    return transformToFrontendFormat(response.data);
  },

  async updateRecipe(id, recipe) {
    const backendRecipe = transformToBackendFormat(recipe);
    const response = await axiosInstance.put(`/${id}`, backendRecipe);
    return transformToFrontendFormat(response.data);
  },

  async deleteRecipe(id) {
    await axiosInstance.delete(`/${id}`);
  }
};