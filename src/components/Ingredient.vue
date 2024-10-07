<script setup>
import { ref, onMounted } from 'vue';
import IngredientService from '../core/apis/spring/ingredient/IngredientService';
import ProviderService from '../core/apis/spring/provider/ProviderService';

const ingredients = ref([]); 
const providers = ref([]); 


const newProvider = ref({
  nombre: '',
  telefono: '',
  tipoCategoria: ''
});

const storageOptions = ['Frío', 'Congelado', 'Ambiente'];

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

const isEditing = ref(false); 
const editingId = ref(null); 
const loading = ref(false); 
const errorMessage = ref(''); 
const isModalVisible = ref(false); 
const isProviderModalVisible = ref(false); 
const isProviderInfoModalVisible = ref(false); 
const currentProvider = ref(null); 
const fetchProviders = async () => {
  try {
    providers.value = await ProviderService.getAllProviders();
  } catch (error) {
    errorMessage.value = 'Error al cargar proveedores';
  }
};

const fetchIngredients = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    ingredients.value = await IngredientService.getAllIngredients();
    await fetchProviders(); 
  } catch (error) {
    errorMessage.value = 'Error al cargar ingredientes';
  } finally {
    loading.value = false;
  }
};

const showProviderInfo = async (proveedorId) => {
  try {
    currentProvider.value = providers.value.find(p => p.id === proveedorId);
    if (!currentProvider.value) {
      throw new Error('Proveedor no encontrado');
    }
    isProviderModalVisible.value = false; 
    isProviderInfoModalVisible.value = true; 
  } catch (error) {
    errorMessage.value = 'Error al cargar información del proveedor';
  }
};

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

const editIngredient = (ingredient) => {
  isEditing.value = true;
  editingId.value = ingredient.id;
  newIngredient.value = { ...ingredient }; 
  closeModal(); 
  isModalVisible.value = true; 
};


const openCreateModal = () => {
  isEditing.value = false;
  resetForm();
  closeModal(); 
  isModalVisible.value = true; 
};



const closeModal = () => {
  isModalVisible.value = false; 
  isProviderModalVisible.value = false; 
  isProviderInfoModalVisible.value = false; 
  currentProvider.value = null; 
};

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

const resetProviderForm = () => {
  newProvider.value = {
    nombre: '',
    telefono: '',
    tipoCategoria: ''
  };
};

onMounted(fetchIngredients); 
</script>

<template>
  <div class="ingredient-container">
    <h2>Inventario del Restaurante</h2>
    <button class="add-ingredient" @click="openCreateModal">Añadir Ingrediente</button>

    <div v-if="loading" class="loading">Cargando inventario...</div>

    <div v-else-if="ingredients.length" class="ingredient-grid">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <img src="../assets/images/logo.png"  class="ingredient-image" />
        <div class="ingredient-info">
          <h3>{{ ingredient.nombre }}</h3>
          <p v-if="ingredient.cantidadKilos > 0"><strong>Kilos:</strong> {{ ingredient.cantidadKilos }}</p>
          <p v-if="ingredient.cantidadGramos > 0"><strong>Gramos:</strong> {{ ingredient.cantidadGramos }}</p>
          <p v-if="ingredient.cantidadUnidades > 0"><strong>Unidades:</strong> {{ ingredient.cantidadUnidades }}</p>
          <p><strong>Caducidad:</strong> {{ new Date(ingredient.fechaDeCaducidad).toLocaleDateString() }}</p>
          <p><strong>Almacenamiento:</strong> {{ ingredient.almacenamiento }}</p>
          <p><strong>Categoría:</strong> {{ ingredient.categoria }}</p>
          <div class="button-group">
          <button class="edit" @click="editIngredient(ingredient)">
         <img src="../assets/icons/Edit Property.svg" alt="Editar" class="icon" />
              </button>
              <button class="provider" @click="showProviderInfo(ingredient.proveedorId)">
                 Proveedor
             </button>

                <button class="delete" @click="deleteIngredient(ingredient.id)">
              <img src="../assets/icons/Delete.svg" alt="Eliminar" class="icon" />
             </button>
             </div>

        </div>
      </div>
    </div>
    <p v-else>No hay ingredientes en el inventario.</p>

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
            <label for="fechaDeCaducidad">Fecha de Caducidad:</label>
            <input id="fechaDeCaducidad" type="date" v-model="newIngredient.fechaDeCaducidad" required />
          </div>
          
          <div class="form-group">
            <label for="almacenamiento">Tipo de Almacenamiento:</label>
            <select id="almacenamiento" v-model="newIngredient.almacenamiento" required>
              <option v-for="option in storageOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>
          
          <div class="form-group">
            <label for="categoria">Categoría:</label>
            <select id="categoria" v-model="newIngredient.categoria" required>
              <option v-for="option in categoryOptions" :key="option" :value="option">{{ option }}</option>
            </select>
          </div>

          <div class="form-group">
            <label for="proveedor">Proveedor:</label>
            <select id="proveedor" v-model="newIngredient.proveedorId" required>
              <option value="" disabled selected>Seleccione un proveedor</option>
              <option v-for="provider in providers" :key="provider.id" :value="provider.id">{{ provider.nombre }}</option>
            </select>
          </div>

          <button type="submit">{{ isEditing ? 'Actualizar' : 'Crear' }}</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>

    <div v-if="isProviderModalVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
       
        <form @submit.prevent="submitProviderForm">
          <div class="form-group">
            <label for="nombre">Nombre del Proveedor:</label>
            <input id="nombre" v-model="newProvider.nombre" required />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input id="telefono" v-model="newProvider.telefono" required />
          </div>
          <div class="form-group">
            <label for="tipoCategoria">Tipo de Categoría:</label>
            <input id="tipoCategoria" v-model="newProvider.tipoCategoria" required />
          </div>
          <button type="submit">Crear Proveedor</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>

    <div v-if="isProviderInfoModalVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Información del Proveedor</h3>
        <div v-if="currentProvider">
          <p><strong>Nombre:</strong> {{ currentProvider.nombre }}</p>
          <p><strong>Teléfono:</strong> {{ currentProvider.telefono }}</p>
          <p><strong>Tipo de Categoría:</strong> {{ currentProvider.tipoCategoria }}</p>
        </div>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>

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
  width: 20px;
  height: 40px;
  gap: 50px;
  
}
.button-group button {
  background-color: transparent; 
  padding: 0; 
  display: flex;
  align-items: center;
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
}

button {
  padding: 8px 15px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s;
}

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

.ingredient-grid {
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
}
.ingredient-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  font-size: 2.2rem;
  color: #2c3e50;
  margin-bottom: 30px;
  text-align: center;
  border-bottom: 3px solid #e67e22;
  padding-bottom: 15px;
  font-weight: 600;
}

.add-ingredient {
  display: block;
  margin: 20px auto 30px;
  padding: 12px 24px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 2px 5px rgba(46, 204, 113, 0.2);
}

.add-ingredient:hover {
  background-color: #27ae60;
  transform: translateY(-2px);
}

.ingredient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 30px;
}

.ingredient-card {
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  display: flex;
  flex-direction: column;
}

.ingredient-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.ingredient-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-bottom: 1px solid #ecf0f1;
}

.ingredient-info {
  padding: 20px;
}

.ingredient-info h3 {
  font-size: 1.5rem;
  color: #2c3e50;
  margin-bottom: 15px;
  font-weight: 600;
}

.ingredient-info p {
  margin: 10px 0;
  color: #5d6d7e;
  font-size: 1rem;
  line-height: 1.4;
}

.ingredient-info strong {
  color: #34495e;
  font-weight: 600;
}

.button-group {
  display: flex;
  justify-content: flex-start;
  margin-top: 20px;
  gap: 15px;
}

.button-group button {
  background-color: transparent;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-radius: 6px;
  transition: background-color 0.2s, transform 0.2s;
}

.button-group .edit:hover {
  background-color: rgba(52, 152, 219, 0.1);
}

.button-group .delete:hover {
  background-color: rgba(231, 76, 60, 0.1);
}

.button-group .provider {
  background-color: #f39c12;
  color: white;
  padding: 8px 16px;
  border-radius: 6px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.button-group .provider:hover {
  background-color: #e67e22;
}

.icon {
  width: 24px;
  height: 24px;
}

/* Modal Styles */
.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(5px);
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 500px;
  max-height: 85vh;
  overflow-y: auto;
}

.modal-content h3 {
  color: #2c3e50;
  font-size: 1.8rem;
  margin-bottom: 25px;
  text-align: center;
}

.close {
  position: absolute;
  top: 15px;
  right: 15px;
  cursor: pointer;
  font-size: 24px;
  color: #7f8c8d;
  transition: color 0.3s;
}

.close:hover {
  color: #34495e;
}

/* Form Styles */
.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #34495e;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
  box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
}

form button {
  width: 100%;
  padding: 14px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #27ae60;
}

.error {
  color: #e74c3c;
  text-align: center;
  margin-top: 15px;
  font-size: 0.9rem;
}

.loading {
  text-align: center;
  font-size: 1.3rem;
  color: #7f8c8d;
  margin: 30px 0;
}
@media (max-width: 768px) {
  .ingredient-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  h2 {
    font-size: 1.8rem;
  }

  .modal-content {
    padding: 20px;
  }

  .ingredient-info h3 {
    font-size: 1.3rem;
  }
}

@media (max-width: 480px) {
  .ingredient-grid {
    grid-template-columns: 1fr;
  }

  .button-group {
    justify-content: space-between;
  }
}
</style>
