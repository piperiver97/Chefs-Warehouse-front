<template>
  <div>
    <h2>Lista de Ingredientes</h2>
    <button @click="showForm = !showForm">{{ showForm ? 'Cancelar' : 'Agregar Ingrediente' }}</button>
    <div v-if="showForm">
      <h3>{{ editMode ? 'Editar Ingrediente' : 'Agregar Ingrediente' }}</h3>
      <input v-model="ingredient.nombre" placeholder="Nombre" />
      <input v-model="ingredient.cantidad" placeholder="Cantidad" type="number" />
      <input v-model="ingredient.fechaDeCaducidad" placeholder="Fecha de Caducidad" type="date" />
      <input v-model="ingredient.almacenamiento" placeholder="Almacenamiento" />
      <input v-model="ingredient.categoria" placeholder="Categoría" />
      <input v-model="ingredient.imagen" placeholder="URL de la Imagen" />
      <button @click="editMode ? updateIngredient() : createIngredient()">
        {{ editMode ? 'Actualizar' : 'Agregar' }}
      </button>
    </div>
    <ul>
      <li v-for="ingredient in ingredients" :key="ingredient.id">
        <strong>{{ ingredient.nombre }}</strong> - {{ ingredient.cantidad }}
        <button @click="prepareEdit(ingredient)">Editar</button>
        <button @click="deleteIngredient(ingredient.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import {
  fetchIngredients,
  updateIngredient,
  deleteIngredient,
  createIngredient,
} from '../services/IngredientService.js'; // Asegúrate de que la ruta sea correcta

// Variables reactivas
const ingredients = ref([]);
const ingredient = ref({ name: '' });
const currentIngredientId = ref(null);
const editMode = ref(false);

// Función para obtener todos los ingredientes
const fetchAllIngredients = async () => {
  ingredients.value = await fetchIngredients();
};

// Resetea el formulario
const resetForm = () => {
  ingredient.value = { name: '' };
  currentIngredientId.value = null;
  editMode.value = false;
};

// Maneja la actualización de ingredientes
const handleUpdateIngredient = async () => {
  try {
    await updateIngredient(currentIngredientId.value, ingredient.value);
    resetForm();
    await fetchAllIngredients();
  } catch (error) {
    console.error(error);
  }
};

// Selecciona un ingrediente para editar
const selectIngredient = (ing) => {
  ingredient.value = { ...ing }; // Clonamos el ingrediente
  currentIngredientId.value = ing.id;
  editMode.value = true;
};

// Maneja la eliminación de un ingrediente
const handleDeleteIngredient = async (id) => {
  await deleteIngredient(id);
  await fetchAllIngredients();
};

// Maneja la creación de un nuevo ingrediente
const handleCreateIngredient = async () => {
  await createIngredient(ingredient.value);
  resetForm();
  await fetchAllIngredients();
};

// Se ejecuta cuando el componente se monta
onMounted(fetchAllIngredients);
</script>


<style scoped>
button {
  margin: 10px 0;
}
</style>
