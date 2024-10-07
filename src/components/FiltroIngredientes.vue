<script setup>
import { ref } from 'vue';
import FilterService from '../core/apis/spring/ingredient/FIlterService';
import BuscadorVoz from './Search.vue'; 

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

const actualizarBusqueda = (nuevoNombre) => {
  filtros.value.nombre = nuevoNombre; 
  aplicarFiltros(); 
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
</script>
<template>
  
  <div class="filtros kitchen-theme">
  
    <div class="filtro-ingredientes">
      <div class="flex flex-wrap items-center gap-4 mb-4"> <BuscadorVoz @resultado="actualizarBusqueda" />
        <div class="flex flex-1 flex-wrap items-center gap-2">
          <input
            id="nombre"
            v-model="filtros.nombre"
            type="text"
            class="kitchen-input flex-1 min-w-[200px]"
            placeholder="Buscar por nombre..."
          />
        <select
            id="tipoMedida"
            v-model="filtros.tipoMedida"
            class="kitchen-select w-auto"
          >
            <option value="">Tipo medida</option>
            <option value="KILOS">Kilos</option>
            <option value="GRAMOS">Gramos</option>
            <option value="UNIDADES">Unidades</option>
          </select>

          <select
            id="almacenamiento"
            v-model="filtros.almacenamiento"
            class="kitchen-select w-auto"
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
            class="kitchen-input w-auto"
          />
          

          <button class="kitchen-btn kitchen-btn-search" @click="aplicarFiltros">
            <i class="bi bi-search me-1"></i>
            Buscar
          </button>
          <button class="kitchen-btn kitchen-btn-clear" @click="limpiarFiltros">
            <i class="bi bi-x-circle me-1"></i>
            Limpiar
          </button>
          
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table v-if="ingredientesFiltrados.length > 0" class="kitchen-table min-w-full">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Almacenamiento</th>
              <th>Fecha de Caducidad</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="ingrediente in ingredientesFiltrados" :key="ingrediente.id">
              <td>{{ ingrediente.nombre }}</td>
              <td>{{ obtenerCantidad(ingrediente) }}</td>
              <td>{{ ingrediente.almacenamiento }}</td>
              <td>{{ formatearFecha(ingrediente.fechaDeCaducidad) }}</td>
            </tr>
          </tbody>
        </table>
        <div v-else-if="busquedaRealizada" class="kitchen-no-results">
          No se encontraron ingredientes con los filtros seleccionados
        </div>
      </div>
    </div>
  </div>
</template>



<style scoped>
.kitchen-theme {
  font-family: 'Roboto', sans-serif;
  background: linear-gradient(to right, #000000, #333333) !important;
}
.filtro-ingredientes{
  margin-left: 3%;
}

.kitchen-input,
.kitchen-select {
  padding: 0.5rem 1rem;
  border: 1px solid #333;
  border-radius: 4px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.kitchen-input:focus,
.kitchen-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 2px rgba(255, 193, 7, 0.2);
  outline: none;
}

.kitchen-btn {
  padding: 0.5rem 1rem;
  border-radius: 4px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  min-width: 100px;
}

.kitchen-btn-search {
  background-color: black;
  color: #fff;
  border: 1px solid #1a1a1a;
}

.kitchen-btn-search:hover {
  background-color: #333;
}

.kitchen-btn-clear {
  background-color: black;
  color: #fff;
  border: 1px solid #333;
}

.kitchen-btn-clear:hover {
  background-color: #1a1a1a;
}

.kitchen-table {
  width: 100%;
  border-collapse: collapse;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
}

.kitchen-table th,
.kitchen-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.kitchen-table th {
  background: linear-gradient(to right, #1a1a1a, #333333);
  color: #fff;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
}

.kitchen-table tr:hover {
  background-color: #f5f5f5;
}

.kitchen-no-results {
  text-align: center;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 4px;
  color: #666;
  font-style: italic;
}
.kitchen-theme {
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #000000, #1a1a1a) !important;
  padding: 2rem;

}

.filtro-ingredientes {
  margin: 0 auto;
  max-width: 1400px;
}

.kitchen-input,
.kitchen-select {
  padding: 0.75rem 1.25rem;
  border: 2px solid #333;
  border-radius: 8px;
  background-color: linear-gradient(135deg, #ffc107, #ff9800);
  color: black;
  font-size: 0.95rem;
  transition: all 0.3s ease;
} 

.kitchen-input::placeholder {
  color: black;
}

.kitchen-input:focus,
.kitchen-select:focus {
  border-color: #ffc107;
  box-shadow: 0 0 0 3px rgba(255, 193, 7, 0.2);
  outline: none;
  background-color: rgba(255, 255, 255, 0.1);
}

.kitchen-btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s ease;
  min-width: 120px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.kitchen-btn-search {
  background: linear-gradient(135deg, #ffc107, #ff9800);
  color: #000;
  border: none;
}

.kitchen-btn-search:hover {
  background: linear-gradient(135deg, #ffca28, #ffa726);
  transform: translateY(-2px);
}

.kitchen-btn-clear {
  background-color: transparent;
  color: #fff;
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.kitchen-btn-clear:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.4);
}

.kitchen-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  overflow: hidden;
}

.kitchen-table th {
  background: linear-gradient(135deg, #333333, #1a1a1a);
  color: #fff;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-size: 0.9rem;
  padding: 1rem 1.5rem;
}

.kitchen-table td {
  padding: 1rem 1.5rem;
  color: #fff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.kitchen-table tr:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.kitchen-no-results {
  text-align: center;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.7);
  font-style: italic;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .kitchen-theme {
    padding: 1rem;
  }
  
  .flex {
    flex-direction: column;
  }
  
  .kitchen-input,
  .kitchen-select,
  .kitchen-btn {
    width: 100%;
    margin-bottom: 0.5rem;
  }
}
</style>
