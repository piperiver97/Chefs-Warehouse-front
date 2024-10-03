<!-- src/components/Ingredient.vue -->
<script setup>
import { ref, onMounted } from 'vue';
import IngredientService from '../core/apis/spring/ingredient/IngredientService';

const ingredients = ref([]);
const newIngredient = ref({
  nombre: '',
  cantidad: '',
  fechaDeCaducidad: '',
  almacenamiento: '',
  categoria: '',
  imagen: ''
});
const isEditing = ref(false);
const editingId = ref(null);
const loading = ref(false);
const errorMessage = ref('');

const fetchIngredients = async () => {
  loading.value = true;
  errorMessage.value = '';
  try {
    ingredients.value = await IngredientService.getAllIngredients();
  } catch (error) {
    errorMessage.value = 'Error al cargar ingredientes';
  } finally {
    loading.value = false;
  }
};

const deleteIngredient = async (id) => {
  errorMessage.value = '';
  try {
    await IngredientService.deleteIngredient(id);
    ingredients.value = ingredients.value.filter(ingredient => ingredient.id !== id);
  } catch (error) {
    errorMessage.value = `Error al eliminar el ingrediente: ${id}`;
  }
};

const editIngredient = (ingredient) => {
  isEditing.value = true;
  editingId.value = ingredient.id;
  newIngredient.value = { ...ingredient };
};

const submitForm = async () => {
  errorMessage.value = '';
  try {
    if (isEditing.value) {
      await IngredientService.updateIngredient(editingId.value, newIngredient.value);
      isEditing.value = false;
    } else {
      await IngredientService.createIngredient(newIngredient.value);
    }
    resetForm();
    fetchIngredients();
  } catch (error) {
    errorMessage.value = 'Error al guardar el ingrediente';
  }
};

const resetForm = () => {
  newIngredient.value = {
    nombre: '',
    cantidad: '',
    fechaDeCaducidad: '',
    almacenamiento: '',
    categoria: '',
    imagen: ''
  };
  isEditing.value = false;
  editingId.value = null;
};

onMounted(fetchIngredients);
</script>

<template>
  <div class="ingredient-container">
    <h2>Inventario del Restaurante</h2>
    
    <div v-if="loading" class="loading">Cargando inventario...</div>
    
    <div v-else-if="ingredients.length" class="ingredient-grid">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <img :src="ingredient.imagen" :alt="ingredient.nombre" class="ingredient-image" />
        <div class="ingredient-info">
          <h3>{{ ingredient.nombre }}</h3>
          <p><strong>Cantidad:</strong> {{ ingredient.cantidad }}</p>
          <p><strong>Caducidad:</strong> {{ ingredient.fechaDeCaducidad }}</p>
          <p><strong>Almacenamiento:</strong> {{ ingredient.almacenamiento }}</p>
          <p><strong>Categoría:</strong> {{ ingredient.categoria }}</p>
          <div class="button-group">
            <button class="edit" @click="editIngredient(ingredient)">Editar</button>
            <button class="delete" @click="deleteIngredient(ingredient.id)">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
    <p v-else>No hay ingredientes en el inventario.</p>

    <form @submit.prevent="submitForm">
      <h3>{{ isEditing ? 'Editar Ingrediente' : 'Añadir Nuevo Ingrediente' }}</h3>
      <input v-model="newIngredient.nombre" placeholder="Nombre del ingrediente" required />
      <input v-model="newIngredient.cantidad" type="number" min="1" placeholder="Cantidad" required />
      <input v-model="newIngredient.fechaDeCaducidad" type="date" required />
      <input v-model="newIngredient.almacenamiento" placeholder="Método de almacenamiento" required />
      <input v-model="newIngredient.categoria" placeholder="Categoría" required />
      <input v-model="newIngredient.imagen" placeholder="URL de la imagen" required />
      <button type="submit">{{ isEditing ? 'Actualizar Ingrediente' : 'Añadir Ingrediente' }}</button>
    </form>
    
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
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

/* Form styles */
form {
  max-width: 500px;
  margin: 30px auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

form input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #bdc3c7;
  border-radius: 4px;
  font-size: 1rem;
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

/* Loading state */
.loading {
  text-align: center;
  font-size: 1.2rem;
  color: #7f8c8d;
  margin: 20px 0;
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
</style>
