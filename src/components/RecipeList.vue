<template>
    <div class="container">
      <h2>Recetas</h2>
      <button class="btn btn-success mb-3" @click="openModal">Crear Nueva Receta</button>
  
      <div v-if="error" class="alert alert-danger alert-dismissible fade show" role="alert">
        {{ error }}
        <button type="button" class="btn-close" @click="error = null" aria-label="Close"></button>
      </div>
  
      <div v-if="loading" class="text-center">
        <p>Cargando recetas...</p>
      </div>
  
      <div v-else-if="!recipes.length" class="text-center">
        <p>No hay recetas disponibles. ¡Crea una nueva!</p>
      </div>
  
      <div v-else class="row">
        <div class="col-md-4" v-for="recipe in recipes" :key="recipe.id">
          <div class="card mb-3">
            <div class="card-body">
              <h5 class="card-title">{{ recipe.nombre }}</h5>
              <p class="card-text">
                <strong>Tiempo de preparación:</strong> {{ recipe.tiempo_preparacion }} minutos<br />
                <strong>Tiempo de cocción:</strong> {{ recipe.tiempo_coccion }} minutos<br />
                <strong>Porciones:</strong> {{ recipe.porciones }}<br />
                <strong>Dificultad:</strong> {{ recipe.dificultad }}<br />
              </p>
              <div>
                <h6>Elaboración:</h6>
                <p>{{ recipe.elaboracion }}</p>
              </div>
              <button class="btn btn-primary me-2" @click="editRecipe(recipe)">Editar</button>
              <button class="btn btn-danger" @click="deleteRecipe(recipe.id)">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para Crear y Editar Recetas -->
      <Teleport to="body">
        <div v-if="showModal" class="modal-overlay">
          <div class="modal-wrapper">
            <div class="modal">
              <div class="modal-header">
                <h5 class="modal-title">{{ editingRecipe ? 'Editar Receta' : 'Crear Nueva Receta' }}</h5>
                <button type="button" class="btn-close" @click="closeModal"></button>
              </div>
              <div class="modal-body">
                <form @submit.prevent="submitRecipe">
                  <div class="mb-3">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input type="text" v-model="form.nombre" class="form-control" id="nombre" required />
                  </div>
                  <div class="mb-3">
                    <label for="tiempo_preparacion" class="form-label">Tiempo de Preparación (min)</label>
                    <input type="number" v-model="form.tiempo_preparacion" class="form-control" id="tiempo_preparacion" required />
                  </div>
                  <div class="mb-3">
                    <label for="tiempo_coccion" class="form-label">Tiempo de Cocción (min)</label>
                    <input type="number" v-model="form.tiempo_coccion" class="form-control" id="tiempo_coccion" required />
                  </div>
                  <div class="mb-3">
                    <label for="porciones" class="form-label">Porciones</label>
                    <input type="number" v-model="form.porciones" class="form-control" id="porciones" required />
                  </div>
                  <div class="mb-3">
                    <label for="dificultad" class="form-label">Dificultad</label>
                    <select v-model="form.dificultad" class="form-control" id="dificultad" required>
                      <option value="Fácil">Fácil</option>
                      <option value="Media">Media</option>
                      <option value="Difícil">Difícil</option>
                    </select>
                  </div>
                  <div class="mb-3">
                    <label for="elaboracion" class="form-label">Elaboración</label>
                    <textarea v-model="form.elaboracion" class="form-control" id="elaboracion" rows="3" required></textarea>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="closeModal">Cancelar</button>
                    <button type="submit" class="btn btn-primary" :disabled="submitting">
                      {{ submitting ? 'Guardando...' : (editingRecipe ? 'Actualizar' : 'Crear') }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </template>
  
  <script setup>
 import { ref, onMounted } from 'vue';
import RecipeService from '../core/apis/spring/Recipe/RecipeService';

const recipes = ref([]);
const loading = ref(true);
const error = ref(null);
const showModal = ref(false);
const editingRecipe = ref(null);
const submitting = ref(false);

const defaultForm = {
  nombre: '',
  tiempo_preparacion: 0,
  tiempo_coccion: 0,
  porciones: 0,
  dificultad: 'Fácil',
  elaboracion: '',
  tecnicas_cocina: ''
};

const form = ref({ ...defaultForm });

const fetchRecipes = async () => {
  loading.value = true;
  error.value = null;
  try {
    recipes.value = await RecipeService.getAllRecipes();
  } catch (err) {
    error.value = 'Error al obtener recetas: ' + (err.response?.data?.message || err.message);
    console.error('Error fetching recipes:', err);
  } finally {
    loading.value = false;
  }
};

const openModal = () => {
  form.value = { ...defaultForm };
  editingRecipe.value = null;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  editingRecipe.value = null;
  form.value = { ...defaultForm };
};

const submitRecipe = async () => {
  submitting.value = true;
  error.value = null;

  try {
    if (editingRecipe.value) {
      const updatedRecipe = await RecipeService.updateRecipe(editingRecipe.value.id, form.value);
      const index = recipes.value.findIndex((r) => r.id === editingRecipe.value.id);
      if (index !== -1) {
        recipes.value[index] = updatedRecipe;
      }
    } else {
      const newRecipe = await RecipeService.createRecipe(form.value);
      recipes.value.push(newRecipe);
    }
    closeModal();
  } catch (err) {
    error.value = 'Error al guardar la receta: ' + (err.response?.data?.message || err.message);
    console.error('Error submitting recipe:', err);
  } finally {
    submitting.value = false;
  }
};

const editRecipe = (recipe) => {
  editingRecipe.value = recipe;
  form.value = {
    nombre: recipe.nombre,
    tiempo_preparacion: recipe.tiempo_preparacion,
    tiempo_coccion: recipe.tiempo_coccion,
    porciones: recipe.porciones,
    dificultad: recipe.dificultad,
    elaboracion: recipe.elaboracion,
    tecnicas_cocina: recipe.tecnicas_cocina || ''
  };
  showModal.value = true;
};

const deleteRecipe = async (id) => {
  if (!confirm('¿Estás seguro de que deseas eliminar esta receta?')) return;

  error.value = null;
  try {
    await RecipeService.deleteRecipe(id);
    recipes.value = recipes.value.filter((recipe) => recipe.id !== id);
  } catch (err) {
    error.value = 'Error al eliminar la receta: ' + (err.response?.data?.message || err.message);
    console.error('Error deleting recipe:', err);
  }
};

onMounted(fetchRecipes);
  </script>
  
  <style scoped>
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
  
  .modal-wrapper {
    background-color: white;
    border-radius: 8px;
    max-width: 500px;
    width: 90%;
  }
  
  .modal {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  </style>
  