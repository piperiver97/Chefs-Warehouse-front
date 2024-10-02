<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router'; // Para detectar cambios de ruta
import VegetableLoading from './components/VegetableLoading.vue'; // Importar el componente de carga

const isLoading = ref(false);

const router = useRouter();

// Escuchamos los cambios de ruta para iniciar y detener el loading
router.beforeEach((to, from, next) => {
  isLoading.value = true; // Mostrar animación de carga
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false; // Ocultar la animación de carga después de un retraso de 3 segundos
  }, 1500); // Cambiar a 3000 ms para un tiempo más largo
});
</script>

<template>
  <div id="app">
    <!-- Transición de desvanecimiento entre vistas -->
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    
    <!-- Cargando vegetales -->
    <VegetableLoading v-if="isLoading" />
  </div>
</template>

<style scoped>
/* Estilos para la transición */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to /* .fade-leave-active en versiones anteriores */ {
  opacity: 0;
}
</style>
