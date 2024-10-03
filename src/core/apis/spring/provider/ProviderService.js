// src/core/apis/spring/proveedor/ProveedoresService.js
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080/api/v1/proveedores',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default {
  getAllProviders: async () => {
    try {
      const response = await axiosInstance.get('http://localhost:8080/api/v1/proveedores');
      return response.data;
    } catch (error) {
      console.error('Error al obtener proveedores:', error);
      return [];
    }
  },
  createProvider: async (provider) => {
    try {
      const response = await axiosInstance.post('http://localhost:8080/api/v1/proveedores', provider);
      return response.data;
    } catch (error) {
      console.error('Error al crear proveedor:', error);
      return null;
    }
  },
  updateProvider: async (id, provider) => {
    try {
      const response = await axiosInstance.put(`http://localhost:8080/api/v1/proveedores/${id}`, provider);
      return response.data;
    } catch (error) {
      console.error(`Error al actualizar el proveedor con ID: ${id}`, error);
      return null;
    }
  },
  deleteProvider: async (id) => {
    try {
      await axiosInstance.delete(`http://localhost:8080/api/v1/proveedores/${id}`);
    } catch (error) {
      console.error(`Error al eliminar el proveedor con ID: ${id}`, error);
    }
  },
};
