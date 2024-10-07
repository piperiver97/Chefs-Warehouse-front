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
  
  const providers = ref([]);
  const categories = ref([]);
  const newProvider = ref({
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    correoElectronico: '',
    categoria: '' 
  });
  const isProviderModalVisible = ref(false);
  const errorMessage = ref('');
  const isEditing = ref(false);  
  
  let editingProviderId = null; 
  
  const fetchProviders = async () => {
    try {
      providers.value = await ProviderService.getAllProviders();
    } catch (error) {
      errorMessage.value = 'Error al cargar proveedores';
    }
  };
  
  const fetchCategories = async () => {
    try {
      categories.value = await ProviderService.getCategories();
    } catch (error) {
      errorMessage.value = 'Error al cargar las categorías';
    }
  };
  
  const openCreateProviderModal = () => {
    resetProviderForm();
    isProviderModalVisible.value = true;
    isEditing.value = false; 
  };
  
  const openEditProviderModal = (provider) => {
    newProvider.value = { ...provider }; 
    isProviderModalVisible.value = true;
    isEditing.value = true; 
    editingProviderId = provider.id;
  };
  
  const closeModal = () => {
    isProviderModalVisible.value = false;
  };
  
  const submitProviderForm = async () => {
    errorMessage.value = '';
    try {
      if (isEditing.value) {
        await ProviderService.updateProvider(editingProviderId, newProvider.value);
      } else {
        await ProviderService.createProvider(newProvider.value);
      }
      resetProviderForm();
      await fetchProviders();
      closeModal();
    } catch (error) {
      errorMessage.value = `Error al ${isEditing.value ? 'editar' : 'crear'} el proveedor: ${error.message}`;
    }
  };
  
  const deleteProvider = async (id) => {
    try {
      await ProviderService.deleteProvider(id);
      await fetchProviders(); 
    } catch (error) {
      errorMessage.value = 'Error al eliminar el proveedor';
    }
  };
  
  const resetProviderForm = () => {
    newProvider.value = {
      nombre: '',
      contacto: '',
      direccion: '',
      telefono: '',
      correoElectronico: '',
      categoria: ''
    };
    editingProviderId = null;
    isEditing.value = false;
  };
  
  onMounted(async () => {
    await fetchProviders();
    await fetchCategories();
  });
  </script>
  
  <style scoped>
  .provider-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); 
    gap: 20px; 
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
  .provider-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h2 {
  color: #2c3e50;
  margin-bottom: 24px;
  font-size: 2rem;
}

.add-provider {
  background-color: #2ecc71;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 6px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 24px;
}

.add-provider:hover {
  background-color: #2ecc71;
}

.provider-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 24px;
}

.provider-item {
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.provider-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.provider-item p {
  margin: 10px 0;
  color: #34495e;
}

.provider-item p strong {
  color: #2c3e50;
  font-weight: 600;
}

.provider-item button {
  margin-top: 15px;
  margin-right: 10px;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.provider-item button:first-of-type {
  background-color: #2ecc71;
  color: white;
}

.provider-item button:last-of-type {
  background-color: #e74c3c;
  color: white;
}

.provider-item button:hover {
  opacity: 0.9;
}

.modal-overlay {
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
}

.modal-content {
  background-color: white;
  padding: 30px;
  border-radius: 12px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.close {
  font-size: 24px;
  color: #7f8c8d;
  transition: color 0.3s;
}

.close:hover {
  color: #34495e;
}

.modal-content h3 {
  color: #2c3e50;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  color: #34495e;
  font-weight: 500;
  margin-bottom: 8px;
}

.form-group input,
.form-group select {
  width: 100%;
  padding: 12px;
  border: 1px solid #bdc3c7;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #3498db;
}

form button {
  background-color: #2ecc71;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

form button:hover {
  background-color: #27ae60;
}

p[v-if="errorMessage"] {
  color: #e74c3c;
  margin-top: 15px;
  text-align: center;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .provider-grid {
    grid-template-columns: 1fr;
  }
  
  .modal-content {
    padding: 20px;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  .add-provider {
    width: 100%;
  }
}
  </style>
  