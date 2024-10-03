// src/core/apis/spring/ingredient/IngredientService.js

import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/ingredientes',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, 
});


export default {
  getAllIngredients: async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8080/api/v1/ingredientes');
      return response.data;
    } catch (error) {
      console.error('Error al obtener los ingredientes:', error);
      return [];
    }
  },

  createIngredient: async (ingredient) => {
    try {
      const response = await axiosInstance.post('http://localhost:8080/api/v1/ingredientes', ingredient);
      return response.data;
    } catch (error) {
      console.error('Error al crear el ingrediente:', error);
      return null;
    }
  },

  updateIngredient: async (id, ingredient) => {
    try {
      const response = await axiosInstance.put(`http://localhost:8080/api/v1/ingredientes/${id}`, ingredient);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el ingrediente con ID: ${id}`, error);
      return null;
    }
  },

  deleteIngredient: async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/api/v1/ingredientes/${id}`);
    } catch (error) {
      console.error(`Error al eliminar el ingrediente con ID: ${id}`, error);
    }
  },
};
