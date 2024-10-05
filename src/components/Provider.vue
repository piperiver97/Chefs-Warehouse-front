<template>
  <div class="provider-container">
    <h2>Proveedores</h2>
    <button class="add-provider" @click="openCreateProviderModal">Añadir Proveedor</button>
    
    <div class="provider-grid">
      <div v-if="providers.length" class="provider-item" v-for="provider in providers" :key="provider.id">
        <p><strong>Nombre:</strong> {{ provider.nombre }}</p>
        <p><strong>Contacto:</strong> {{ provider.contacto }}</p>
        <p><strong>Dirección:</strong> {{ provider.direccion }}</p>
        <p><strong>Teléfono:</strong> {{ provider.telefono }}</p>
        <p><strong>Correo Electrónico:</strong> {{ provider.correoElectronico }}</p>
        <p><strong>Categoría:</strong> {{ provider.categoria }}</p>

        <button @click="openEditProviderModal(provider)">Editar</button>
        <button @click="deleteProvider(provider.id)">Eliminar</button>
      </div>
    </div>


    <div v-if="isProviderModalVisible" class="modal-overlay">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3 v-if="isEditing">Editar Proveedor</h3>
        <h3 v-else>Añadir Proveedor</h3>

        <form @submit.prevent="submitProviderForm">
          <div class="form-group">
            <label for="nombre">Nombre del Proveedor:</label>
            <input id="nombre" v-model="newProvider.nombre" required />
          </div>
          <div class="form-group">
            <label for="contacto">Contacto:</label>
            <input id="contacto" v-model="newProvider.contacto" required />
          </div>
          <div class="form-group">
            <label for="direccion">Dirección:</label>
            <input id="direccion" v-model="newProvider.direccion" required />
          </div>
          <div class="form-group">
            <label for="telefono">Teléfono:</label>
            <input id="telefono" v-model="newProvider.telefono" required />
          </div>
          <div class="form-group">
            <label for="correoElectronico">Correo Electrónico:</label>
            <input id="correoElectronico" v-model="newProvider.correoElectronico" required />
          </div>
          <div class="form-group">
            <label for="categoria">Tipo de Categoría:</label>
            <select id="categoria" v-model="newProvider.categoria" required>
              <option disabled value="">Seleccione una categoría</option>
              <option v-for="categoria in categories" :key="categoria" :value="categoria">{{ categoria }}</option>
            </select>
          </div>
          <button type="submit">{{ isEditing ? 'Guardar Cambios' : 'Crear Proveedor' }}</button>
        </form>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script setup>
  import { ref, onMounted } from 'vue';
  import ProviderService from '../core/apis/spring/provider/ProviderService';
  
  // Variables reactivas para manejar los proveedores, categorías y el estado del formulario
  const providers = ref([]);
  const categories = ref([]);
  const newProvider = ref({
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    categoria: '' // Cambié a 'categoria'
  });
  const isProviderModalVisible = ref(false);
  const errorMessage = ref('');
  const isEditing = ref(false);  // Para saber si estamos editando o creando
  
  let editingProviderId = null; // Guardamos el ID del proveedor que estamos editando
  
  // Función para obtener los proveedores desde el servicio (llamada a la API)
  const fetchProviders = async () => {
    try {
      providers.value = await ProviderService.getAllProviders();
    } catch (error) {
      errorMessage.value = 'Error al cargar proveedores';
    }
  };
  
  // Función para obtener las categorías desde el backend
  const fetchCategories = async () => {
    try {
      categories.value = await ProviderService.getCategories();
    } catch (error) {
      errorMessage.value = 'Error al cargar las categorías';
    }
  };
  
  // Función para abrir el modal de crear proveedor
  const openCreateProviderModal = () => {
    resetProviderForm();
    isProviderModalVisible.value = true;
    isEditing.value = false; // No estamos editando
  };
  
  // Función para abrir el modal de editar proveedor
  const openEditProviderModal = (provider) => {
    newProvider.value = { ...provider }; // Cargamos los datos del proveedor
    isProviderModalVisible.value = true;
    isEditing.value = true; // Indicamos que estamos editando
    editingProviderId = provider.id; // Guardamos el ID del proveedor
  };
  
  // Función para cerrar el modal
  const closeModal = () => {
    isProviderModalVisible.value = false;
  };
  
  // Función para enviar el formulario de crear/editar proveedor
  const submitProviderForm = async () => {
    errorMessage.value = '';
    try {
      if (isEditing.value) {
        // Editar proveedor
        await ProviderService.updateProvider(editingProviderId, newProvider.value);
      } else {
        // Crear nuevo proveedor
        await ProviderService.createProvider(newProvider.value);
      }
      resetProviderForm();
      await fetchProviders();
      closeModal();
    } catch (error) {
      errorMessage.value = `Error al ${isEditing.value ? 'editar' : 'crear'} el proveedor: ${error.message}`;
    }
  };
  
  // Función para eliminar un proveedor
  const deleteProvider = async (id) => {
    try {
      await ProviderService.deleteProvider(id);
      await fetchProviders(); // Recargar lista después de eliminar
    } catch (error) {
      errorMessage.value = 'Error al eliminar el proveedor';
    }
  };
  
  // Función para resetear el formulario
  const resetProviderForm = () => {
    newProvider.value = {
      nombre: '',
      contacto: '',
      direccion: '',
      telefono: '',
      correoElectronico: '',
      categoria: '' // Cambié a 'categoria' aquí también
    };
    editingProviderId = null;
    isEditing.value = false;
  };
  
  // Al montar el componente, cargamos los proveedores y las categorías
  onMounted(async () => {
    await fetchProviders();
    await fetchCategories();
  });
  </script>
  
  <style scoped>
  .provider-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Muestra 2 elementos en pantallas más grandes y ajusta en pantallas más pequeñas */
    gap: 20px; /* Espaciado entre los elementos */
  }
  
  .provider-item {
    background-color: #ecf0f1;
    padding: 15px;
    border-radius: 5px;
  }
  
  .provider-item p {
    margin: 5px 0;
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
  }
  
  .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 90%;
    max-width: 400px;
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
  
  .form-group {
    margin-bottom: 15px;
  }
  
  .form-group label {
    display: block;
    margin-bottom: 5px;
  }
  
  .form-group input,
  .form-group select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  form button {
    width: 100%;
    padding: 12px;
    background-color: #2ecc71;
    color: white;
    border: none;
    font-size: 1.1rem;
    cursor: pointer;
  }
  </style>
  