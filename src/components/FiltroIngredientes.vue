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
      <div class="flex flex-wrap items-center gap-4 mb-4">
        
        <div class="flex flex-1 flex-wrap items-center gap-2">
          <input
            id="nombre"
            v-model="filtros.nombre"
            type="text"
            class="flex-1 min-w-[200px] p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Buscar por nombre..."
          />
          
          <select
            id="tipoMedida"
            v-model="filtros.tipoMedida"
            class="w-auto p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Tipo medida</option>
            <option value="KILOS">Kilos</option>
            <option value="GRAMOS">Gramos</option>
            <option value="UNIDADES">Unidades</option>
          </select>

          <select
            id="almacenamiento"
            v-model="filtros.almacenamiento"
            class="w-auto p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Almacenamiento</option>
            <option value="Ambiente">Ambiente</option>
            <option value="Frío">Frío</option>
            <option value="Congelado">Congelado</option>
          </select>

          <input
            id="fechaCaducidad"
            v-model="filtros.fechaCaducidad"
            type="date"
            class="w-auto p-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
          />

          <button class="buscar"
            @click="aplicarFiltros"
           
          >
            Buscar
          </button>
          <button class="limpiar"
            @click="limpiarFiltros"
            
          >
            Limpiar
          </button>
        </div>
      </div>
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
.buscar{
  background-color: black !important;
  color: white;
  width: 80px;
  border-radius: 5px;
}
.limpiar{
  background-color: black !important;
  color: white;
  width: 80px;
  border-radius: 5px;
}
</style>