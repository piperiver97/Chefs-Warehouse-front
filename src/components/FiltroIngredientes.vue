
<script>
import { ref } from 'vue';
import FilterService from '../core/apis/spring/ingredient/FIlterService';

export default {
  name: 'FiltroIngredientes',
  setup() {
    const filtros = ref({
      nombre: '',
      tipoMedida: '',
      almacenamiento: '',
      fechaCaducidad: ''
    });

    const ingredientesFiltrados = ref([]);
    const busquedaRealizada = ref(false);

    const aplicarFiltros = async () => {
      try {
        busquedaRealizada.value = true;
        ingredientesFiltrados.value = await FilterService.filtrarIngredientes(filtros.value);
      } catch (error) {
        console.error('Error al aplicar filtros:', error);
      }
    };

    const limpiarFiltros = () => {
      filtros.value = {
        nombre: '',
        tipoMedida: '',
        almacenamiento: '',
        fechaCaducidad: ''
      };
      ingredientesFiltrados.value = [];
      busquedaRealizada.value = false;
    };

    const obtenerCantidad = (ingrediente) => {
      if (ingrediente.cantidadKilos > 0) return `${ingrediente.cantidadKilos} kg`;
      if (ingrediente.cantidadGramos > 0) return `${ingrediente.cantidadGramos} g`;
      if (ingrediente.cantidadUnidades > 0) return `${ingrediente.cantidadUnidades} unidades`;
      return 'N/A';
    };

    const formatearFecha = (fecha) => {
      if (!fecha) return 'N/A';
      return new Date(fecha).toLocaleDateString();
    };

    return {
      filtros,
      ingredientesFiltrados,
      busquedaRealizada,
      aplicarFiltros,
      limpiarFiltros,
      obtenerCantidad,
      formatearFecha
    };
  }
};
</script>
<template>
  <div class="filtros">
  <div class="filtro-ingredientes">
    <h2 class="text-2xl font-bold mb-4">Filtrar Ingredientes</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
      <!-- Buscador por nombre -->
      <div class="form-group">
        <label for="nombre" class="block text-sm font-medium text-gray-700 mb-1">
          Nombre del ingrediente
        </label>
        <input
          id="nombre"
          v-model="filtros.nombre"
          type="text"
          class="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          placeholder="Buscar por nombre..."
        />
      </div>

      <!-- Selector de tipo de medida -->
      <div class="form-group">
        <label for="tipoMedida" class="block text-sm font-medium text-gray-700 mb-1">
          Tipo de medida
        </label>
        <select
          id="tipoMedida"
          v-model="filtros.tipoMedida"
          class="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todas</option>
          <option value="KILOS">Kilos</option>
          <option value="GRAMOS">Gramos</option>
          <option value="UNIDADES">Unidades</option>
        </select>
      </div>

      <!-- Selector de almacenamiento -->
      <div class="form-group">
        <label for="almacenamiento" class="block text-sm font-medium text-gray-700 mb-1">
          Almacenamiento
        </label>
        <select
          id="almacenamiento"
          v-model="filtros.almacenamiento"
          class="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Todos</option>
          <option value="Ambiente">Ambiente</option>
          <option value="Frío">Frío</option>
          <option value="Congelado">Congelado</option>
        </select>
      </div>

      <!-- Selector de fecha de caducidad -->
      <div class="form-group">
        <label for="fechaCaducidad" class="block text-sm font-medium text-gray-700 mb-1">
          Fecha de caducidad
        </label>
        <input
          id="fechaCaducidad"
          v-model="filtros.fechaCaducidad"
          type="date"
          class="w-full p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex space-x-2 mb-6">
      <button
        @click="aplicarFiltros"
        class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Aplicar Filtros
      </button>
      <button
        @click="limpiarFiltros"
        class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      >
        Limpiar Filtros
      </button>
    </div>

    <!-- Tabla de resultados -->
    <div class="overflow-x-auto">
      <table v-if="ingredientesFiltrados.length > 0" class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Nombre
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Cantidad
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Almacenamiento
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fecha de Caducidad
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="ingrediente in ingredientesFiltrados" :key="ingrediente.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ ingrediente.nombre }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ obtenerCantidad(ingrediente) }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ ingrediente.almacenamiento }}</td>
            <td class="px-6 py-4 whitespace-nowrap">{{ formatearFecha(ingrediente.fechaDeCaducidad) }}</td>
          </tr>
        </tbody>
      </table>
      <div v-else-if="busquedaRealizada" class="text-center py-4 text-gray-500">
        No se encontraron ingredientes con los filtros seleccionados
      </div>
    </div>
  </div>
</div> 
</template>
<style scoped>

</style>