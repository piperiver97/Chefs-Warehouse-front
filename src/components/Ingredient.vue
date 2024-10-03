<script setup>
import { ref, onMounted } from 'vue';
import IngredientService from '../core/apis/spring/ingredient/IngredientService';
import ProviderService from '../core/apis/spring/provider/ProviderService';

const ingredients = ref([]); // Arreglo de ingredientes
const providers = ref([]); // Arreglo de proveedores

// Formulario para nuevo proveedor
const newProvider = ref({
  nombre: '',
  telefono: '',
  tipoCategoria: ''
});

// Opciones de almacenamiento
const storageOptions = ['Frío', 'Congelado', 'Ambiente'];

// Opciones de categoría corregidas
const categoryOptions = [
  'Vegetales',
  'Carnes',
  'Lácteos',
  'Granos y Cereales',
  'Embutidos',
  'Especias',
  'Legumbres',
  'Huevos'
];

// Estructura inicial para nuevo ingrediente
const newIngredient = ref({
  nombre: '',
  cantidadKilos: 0,
  cantidadGramos: 0,
  cantidadUnidades: 0,
  fechaDeCaducidad: '',
  almacenamiento: '',
  categoria: '',
  imagen: '',
  proveedorId: null
});

const isEditing = ref(false); // Indica si se está editando un ingrediente
const editingId = ref(null); // ID del ingrediente en edición
const loading = ref(false); // Estado de carga
const errorMessage = ref(''); // Mensaje de error
const isModalVisible = ref(false); // Modal para ingredientes
const isProviderModalVisible = ref(false); // Modal para añadir proveedores
const currentProvider = ref(null); // Información del proveedor actual

// Cargar proveedores
const fetchProviders = async () => {
  try {
    providers.value = await ProviderService.getAllProviders();
  } catch (error) {
    errorMessage.value = 'Error al cargar proveedores';
  }
};

// Cargar ingredientes
const fetchIngredients = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    ingredients.value = await IngredientService.getAllIngredients();
    await fetchProviders(); // Cargar proveedores tras cargar ingredientes
  } catch (error) {
    errorMessage.value = 'Error al cargar ingredientes';
  } finally {
    loading.value = false;
  }
};

// Mostrar la información de un proveedor
const showProviderInfo = async (proveedorId) => {
  try {
    currentProvider.value = providers.value.find(p => p.id === proveedorId);
    if (!currentProvider.value) {
      throw new Error('Proveedor no encontrado');
    }
    closeModal(); // Cierra otros modales
    isProviderModalVisible.value = true; // Abre modal del proveedor
  } catch (error) {
    errorMessage.value = 'Error al cargar información del proveedor';
  }
};

// Eliminar un ingrediente
const deleteIngredient = async (id) => {
  if (!confirm('¿Estás seguro de que quieres eliminar este ingrediente?')) return;
  errorMessage.value = '';
  try {
    await IngredientService.deleteIngredient(id);
    ingredients.value = ingredients.value.filter(ingredient => ingredient.id !== id);
  } catch (error) {
    errorMessage.value = `Error al eliminar el ingrediente: ${error.message}`;
  }
};

// Editar un ingrediente
const editIngredient = (ingredient) => {
  isEditing.value = true;
  editingId.value = ingredient.id;
  newIngredient.value = { ...ingredient }; // Copia el ingrediente a editar
  closeModal(); // Cierra otros modales
  isModalVisible.value = true; // Abre modal de edición
};

// Abrir modal para crear ingrediente
const openCreateModal = () => {
  isEditing.value = false;
  resetForm();
  closeModal(); // Asegura que otros modales estén cerrados
  isModalVisible.value = true; // Abre modal de ingredientes
};

// Abrir modal para crear proveedor
const openCreateProviderModal = () => {
  resetProviderForm();
  closeModal(); // Asegura que otros modales estén cerrados
  isProviderModalVisible.value = true; // Abre modal de proveedores
};

// Cerrar cualquier modal
const closeModal = () => {
  isModalVisible.value = false; // Cierra modal de ingredientes
  isProviderModalVisible.value = false; // Cierra modal de proveedores
};

// Enviar formulario de ingredientes
const submitIngredientForm = async () => {
  errorMessage.value = '';
  try {
    if (isEditing.value) {
      await IngredientService.updateIngredient(editingId.value, newIngredient.value);
    } else {
      await IngredientService.createIngredient(newIngredient.value);
    }
    resetForm();
    await fetchIngredients();
    closeModal();
  } catch (error) {
    errorMessage.value = `Error al ${isEditing.value ? 'actualizar' : 'crear'} el ingrediente: ${error.message}`;
  }
};

// Enviar formulario de proveedor
const submitProviderForm = async () => {
  errorMessage.value = '';
  try {
    await ProviderService.createProvider(newProvider.value);
    resetProviderForm();
    await fetchProviders();
    closeModal();
  } catch (error) {
    errorMessage.value = `Error al crear el proveedor: ${error.message}`;
  }
};

// Resetea formulario de ingredientes
const resetForm = () => {
  newIngredient.value = {
    nombre: '',
    cantidadKilos: 0,
    cantidadGramos: 0,
    cantidadUnidades: 0,
    fechaDeCaducidad: '',
    almacenamiento: '',
    categoria: '',
    imagen: '',
    proveedorId: null
  };
  isEditing.value = false;
  editingId.value = null;
};

// Resetea formulario de proveedores
const resetProviderForm = () => {
  newProvider.value = {
    nombre: '',
    telefono: '',
    tipoCategoria: ''
  };
};

onMounted(fetchIngredients); // Cargar datos al montar el componente
</script>



<template>
  <div class="ingredient-container">
    <h2>Inventario del Restaurante</h2>
    <button class="add-ingredient" @click="openCreateModal">Añadir Ingrediente</button>
    <button class="add-provider" @click="openCreateProviderModal">Añadir Proveedor</button>

    <div v-if="loading" class="loading">Cargando inventario...</div>

    <div v-else-if="ingredients.length" class="ingredient-grid">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <img :src="ingredient.imagen" :alt="ingredient.nombre" class="ingredient-image" />
        <div class="ingredient-info">
          <h3>{{ ingredient.nombre }}</h3>
          <p v-if="ingredient.cantidadKilos > 0"><strong>Kilos:</strong> {{ ingredient.cantidadKilos }}</p>
          <p v-if="ingredient.cantidadGramos > 0"><strong>Gramos:</strong> {{ ingredient.cantidadGramos }}</p>
          <p v-if="ingredient.cantidadUnidades > 0"><strong>Unidades:</strong> {{ ingredient.cantidadUnidades }}</p>
          <p><strong>Caducidad:</strong> {{ new Date(ingredient.fechaDeCaducidad).toLocaleDateString() }}</p>
          <p><strong>Almacenamiento:</strong> {{ ingredient.almacenamiento }}</p>
          <p><strong>Categoría:</strong> {{ ingredient.categoria }}</p>
          <div class="button-group">
            <button class="edit" @click="editIngredient(ingredient)">Editar</button>
            <button class="provider" @click="showProviderInfo(ingredient.proveedorId)">Información Proveedor</button>
            <button class="delete" @click="deleteIngredient(ingredient.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No hay ingredientes en el inventario.</p>

    <!-- Modal de Ingrediente -->
    <div v-if="isModalVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>{{ isEditing ? 'Editar Ingrediente' : 'Añadir Nuevo Ingrediente' }}</h3>
        <form @submit.prevent="submitIngredientForm">
          <div class="form-group">
            <label for="nombre">Nombre:</label>
            <input id="nombre" v-model="newIngredient.nombre" required />
          </div>
          
          <div class="form-group">
            <label for="cantidadKilos">Cantidad en Kilos:</label>
            <input id="cantidadKilos" v-model="newIngredient.cantidadKilos" type="number" min="0" />
          </div>
          
          <div class="form-group">
            <label for="cantidadGramos">Cantidad en Gramos:</label>
            <input id="cantidadGramos" v-model="newIngredient.cantidadGramos" type="number" min="0" />
          </div>
          
          <div class="form-group">
            <label for="cantidadUnidades">Cantidad en Unidades:</label>
            <input id="cantidadUnidades" v-model="newIngredient.cantidadUnidades" type="number" min="0" />
          </div>
          
          <div class="form-group">
            <label for="fechaCaducidad">Fecha de Caducidad:</label>
            <input id="fechaCaducidad" v-model="newIngredient.fechaDeCaducidad" type="date" required />
          </div>
          
          <div class="form-group">
            <label for="almacenamiento">Almacenamiento:</label>
            <select id="almacenamiento" v-model="newIngredient.almacenamiento" required>
              <option value="">Seleccione almacenamiento</option>
              <option v-for="option in storageOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="categoria">Categoría:</label>
            <select id="categoria" v-model="newIngredient.categoria" required>
              <option value="">Seleccione categoría</option>
              <option v-for="option in categoryOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="imagen">URL de Imagen:</label>
            <input id="imagen" v-model="newIngredient.imagen" type="url" />
          </div>

          <div class="form-group">
            <label for="proveedor">Proveedor:</label>
            <select id="proveedor" v-model="newIngredient.proveedorId" required>
              <option value="">Seleccione proveedor</option>
              <option v-for="provider in providers" :key="provider.id" :value="provider.id">
                {{ provider.nombre }}
              </option>
            </select>
          </div>

          <button type="submit">{{ isEditing ? 'Actualizar Ingrediente' : 'Añadir Ingrediente' }}</button>
        </form>
      </div>
    </div>

    <!-- Modal de Proveedor -->
    <div v-if="isProviderModalVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Añadir Nuevo Proveedor</h3>
        <form @submit.prevent="submitProviderForm">
          <div class="form-group">
            <label for="providerNombre">Nombre:</label>
            <input id="providerNombre" v-model="newProvider.nombre" required />
          </div>
          <div class="form-group">
            <label for="providerTelefono">Teléfono:</label>
            <input id="providerTelefono" v-model="newProvider.telefono" required />
          </div>
          <div class="form-group">
            <label for="providerTipoCategoria">Tipo de Categoría:</label>
            <input id="providerTipoCategoria" v-model="newProvider.tipoCategoria" required />
          </div>
          <button type="submit">Añadir Proveedor</button>
        </form>
      </div>
    </div>

    <!-- Mostrar Información del Proveedor -->
    <div v-if="isProviderModalVisible && currentProvider" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Información del Proveedor</h3>
        <div>
          <p><strong>Nombre:</strong> {{ currentProvider.nombre }}</p>
          <p><strong>Teléfono:</strong> {{ currentProvider.telefono }}</p>
          <p><strong>Tipo de Categoría:</strong> {{ currentProvider.tipoCategoria }}</p>
        </div>
      </div>
    </div>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>




<style scoped>
.ingredient-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 2px solid #e67e22;
  padding-bottom: 10px;
}

.ingredient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
}

.ingredient-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.ingredient-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.ingredient-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ecf0f1;
}

.ingredient-info {
  padding: 15px;
}

.ingredient-info h3 {
  font-size: 1.4rem;
  color: #2c3e50;
  margin-bottom: 10px;
}

.ingredient-info p {
  margin: 8px 0;
  color: #7f8c8d;
  font-size: 0.95rem;
}

.ingredient-info strong {
  color: #34495e;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

button.edit {
  background-color: #3498db;
  color: white;
}

button.delete {
  background-color: #e74c3c;
  color: white;
}

button:hover {
  opacity: 0.9;
}

/* Estilos del Modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
}

.add-ingredient {
  margin: 20px 0;
  padding: 10px 15px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

form button {
  width: 100%;
  padding: 12px;
  background-color: #2ecc71;
  color: white;
  font-size: 1.1rem;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 10px;
}

.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 20px 0;
}
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button.provider {
  background-color: #f39c12;
  color: white;
}

.modal-content {
  max-height: 80vh;
  overflow-y: auto;
}

/* Ajustamos el grid para que las tarjetas sean más anchas */
.ingredient-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

</style>
