import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/proveedores',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default {
  // Obtener todos los proveedores
  getAllProviders: async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8080/api/v1/proveedores');
      return response.data;
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      return [];
    }
  },

  // Crear un proveedor
  createProvider: async (provider) => {
    try {
      const response = await axiosInstance.post('http://localhost:8080/api/v1/proveedores', provider);
      return response.data;
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      return null;
    }
  },

  // Obtener categorías
  getCategories: async () => {
    try {
      const response = await axiosInstance.get('/categorias');
      return response.data;
    } catch (error) {
      console.error('Error al obtener categorías:', error);
      throw new Error('Error al cargar categorías');
    }
  },

  // Actualizar un proveedor existente
  updateProvider: async (id, provider) => {
    try {
      const response = await axiosInstance.put(`http://localhost:8080/api/v1/proveedores/${id}`, provider);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el proveedor con ID: ${id}`, error);
      throw new Error('Error al actualizar el proveedor');
    }
  },

  // Eliminar un proveedor
  deleteProvider: async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/api/v1/proveedores/${id}`);
    } catch (error) {
      console.error(`Error al eliminar el proveedor con ID: ${id}`, error);
      throw new Error('Error al eliminar el proveedor');
    }
  }
};
