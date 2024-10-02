// src/services/IngredientService.js

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ingredientes'; // Cambia esto a tu URL real de la API

// Obtener todos los ingredientes
export const fetchIngredients = async () => {
  const response = await axios.get(`${API_URL}/ingredients`);
  return response.data;
};

// Crear un nuevo ingrediente
export const createIngredient = async (ingredient) => {
  const response = await axios.post(`${API_URL}/ingredients`, ingredient);
  return response.data;
};

// Actualizar un ingrediente existente
export const updateIngredient = async (id, ingredient) => {
  const response = await axios.put(`${API_URL}/ingredients/${id}`, ingredient);
  return response.data;
};

// Eliminar un ingrediente
export const deleteIngredient = async (id) => {
  await axios.delete(`${API_URL}/ingredients/${id}`);
};
