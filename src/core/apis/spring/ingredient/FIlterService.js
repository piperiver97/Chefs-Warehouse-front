import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/ingredientes';

export default {
  async filtrarIngredientes(filtros) {
    try {
      const params = new URLSearchParams();
      
      if (filtros.nombre) params.append('nombre', filtros.nombre);
      if (filtros.almacenamiento) params.append('almacenamiento', filtros.almacenamiento);
      if (filtros.fechaCaducidad) params.append('fechaCaducidad', filtros.fechaCaducidad);
      if (filtros.tipoMedida) params.append('tipoMedida', filtros.tipoMedida);
      
      const response = await axios.get(`${API_URL}/filtrar`, { params });
      return response.data;
    } catch (error) {
      console.error('Error al filtrar ingredientes:', error);
      throw error;
    }
  }
};