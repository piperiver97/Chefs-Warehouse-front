<script setup>
import { ref, onMounted } from 'vue';
import { RecipeService } from '../core/apis';

const recetas = ref([]);
const recetaForm = ref({
  nombre: '',
  tiempo_preparacion: null,
  tiempo_coccion: null,
  porciones: null,
  dificultad: 'FACIL',
  elaboracion: '',
  tecnicas_cocina: ''
});
const isEditing = ref(false);
const editingId = ref(null);

onMounted(async () => {
  await fetchRecetas();
});

async function fetchRecetas() {
  try {
    const response = await RecipeService.getAllRecipes();
    recetas.value = response.data;
  } catch (error) {
    console.error('Error al cargar las recetas:', error);
  }
}

async function createReceta() {
  try {
    const response = await RecipeService.createRecipe(recetaForm.value);
    recetas.value.push(response.data);
    resetForm();
    closeModal();
  } catch (error) {
    console.error('Error al crear la receta:', error);
  }
}

async function updateReceta() {
  try {
    const response = await RecipeService.updateRecipe(editingId.value, recetaForm.value);
    const index = recetas.value.findIndex(receta => receta.id === editingId.value);
    if (index !== -1) {
      recetas.value.splice(index, 1, response.data);
    }
    resetForm();
    closeModal();
  } catch (error) {
    console.error('Error al actualizar la receta:', error);
  }
}

async function deleteReceta(id) {
  try {
    await RecipeService.deleteRecipe(id);
    recetas.value = recetas.value.filter(receta => receta.id !== id);
  } catch (error) {
    console.error('Error al eliminar la receta:', error);
  }
}

function editReceta(receta) {
  recetaForm.value = { ...receta };
  isEditing.value = true;
  editingId.value = receta.id;
  const modal = new bootstrap.Modal(document.getElementById('recetaModal'));
  modal.show();
}

function openCreateModal() {
  resetForm();
  const modal = new bootstrap.Modal(document.getElementById('recetaModal'));
  modal.show();
}

function closeModal() {
  const modal = bootstrap.Modal.getInstance(document.getElementById('recetaModal'));
  modal.hide();
}

function resetForm() {
  recetaForm.value = {
    nombre: '',
    tiempo_preparacion: null,
    tiempo_coccion: null,
    porciones: null,
    dificultad: 'FACIL',
    elaboracion: '',
    tecnicas_cocina: ''
  };
  isEditing.value = false;
  editingId.value = null;
}

function getDifficultyInSpanish(difficulty) {
  const difficultyMap = {
    'FACIL': 'Fácil',
    'MEDIA': 'Media',
    'DIFICIL': 'Difícil'
  };
  return difficultyMap[difficulty] || difficulty;
}

function formatTotalTime(prep, cooking) {
  const total = prep + cooking;
  const hours = Math.floor(total / 60);
  const minutes = total % 60;
  return hours > 0 
    ? `${hours}h ${minutes}min`
    : `${minutes}min`;
}
</script>
<template>
    <div class="container my-4">
      <h1 class="text-center mb-4">Lista de Recetas</h1>
      
      <!-- Botón para crear receta -->
      <button class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#recetaModal" @click="openCreateModal">
        Crear Receta
      </button>
  
      <div class="row">
        <div v-for="receta in recetas" :key="receta.id" class="col-md-4 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ receta.nombre }}</h5>
              <p class="card-text">
                <strong>Tiempo de Preparación:</strong> {{ receta.tiempo_preparacion }} min<br>
                <strong>Tiempo de Cocción:</strong> {{ receta.tiempo_coccion }} min<br>
                <strong>Tiempo Total:</strong> {{ formatTotalTime(receta.tiempo_preparacion, receta.tiempo_coccion) }}<br>
                <strong>Porciones:</strong> {{ receta.porciones }}<br>
                <strong>Dificultad:</strong> {{ getDifficultyInSpanish(receta.dificultad) }}<br>
                <strong>Técnicas de Cocina:</strong> {{ receta.tecnicas_cocina }}<br>
              </p>
              <p class="card-text">
                <strong>Elaboración:</strong> {{ receta.elaboracion }}
              </p>
              <button class="btn btn-warning" @click="editReceta(receta)"> 
                <img src="@/assets/icons/Edit Property.svg" alt="Edit" style="width: 16px; height: 16px;"/> Editar
              </button>
              <button class="btn btn-danger" @click="deleteReceta(receta.id)">
                <img src="@/assets/icons/Delete.svg" alt="Delete" style="width: 16px; height: 16px;"/> Eliminar
              </button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Modal para crear y editar receta -->
      <div class="modal fade" id="recetaModal" tabindex="-1" aria-labelledby="recetaModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="recetaModalLabel">{{ isEditing ? 'Editar Receta' : 'Crear Receta' }}</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form @submit.prevent="isEditing ? updateReceta() : createReceta()">
                <div class="mb-3">
                  <label for="nombre" class="form-label">Nombre</label>
                  <input type="text" id="nombre" v-model="recetaForm.nombre" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="tiempoPreparacion" class="form-label">Tiempo de Preparación (min)</label>
                  <input type="number" id="tiempoPreparacion" v-model="recetaForm.tiempo_preparacion" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="tiempoCoccion" class="form-label">Tiempo de Cocción (min)</label>
                  <input type="number" id="tiempoCoccion" v-model="recetaForm.tiempo_coccion" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="porciones" class="form-label">Porciones</label>
                  <input type="number" id="porciones" v-model="recetaForm.porciones" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label for="dificultad" class="form-label">Dificultad</label>
                  <select id="dificultad" v-model="recetaForm.dificultad" class="form-select" required>
                    <option value="FACIL">Fácil</option>
                    <option value="MEDIA">Media</option>
                    <option value="DIFICIL">Difícil</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label for="elaboracion" class="form-label">Elaboración</label>
                  <textarea id="elaboracion" v-model="recetaForm.elaboracion" class="form-control" required></textarea>
                </div>
                <div class="mb-3">
                  <label for="tecnicasCocina" class="form-label">Técnicas de Cocina</label>
                  <input type="text" id="tecnicasCocina" v-model="recetaForm.tecnicas_cocina" class="form-control" required>
                </div>
                <button type="submit" class="btn btn-primary">{{ isEditing ? 'Actualizar' : 'Crear' }}</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
 
  
  <style>
  .card {
    border: 1px solid #ddd;
    border-radius: 8px;
    transition: transform 0.2s;
  }
  
  .card:hover {
    transform: scale(1.05);
  }
  </style>
  