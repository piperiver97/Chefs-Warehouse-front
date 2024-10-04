<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VegetableLoading from './components/VegetableLoading.vue';

const isLoading = ref(false);
const router = useRouter();

// Escuchamos los cambios de ruta para iniciar y detener el loading
router.beforeEach((to, from, next) => {
  isLoading.value = true;
  next();
});

router.afterEach(() => {
  setTimeout(() => {
    isLoading.value = false;
  }, 1500);
});
</script>

<template>
  <div id="app">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <div> <!-- Aquí se envuelve el componente en un div -->
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
    
    <!-- Cargando vegetales -->
    <VegetableLoading v-if="isLoading" />
  </div>
</template>

<style scoped>
.fade-enter-active, 
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
