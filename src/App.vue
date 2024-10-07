<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import VegetableLoading from './components/VegetableLoading.vue';
import Footer from './components/Footer.vue';


const isLoading = ref(false);
const router = useRouter();

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
        <div> 
          <component :is="Component" />
        </div>
      </transition>
    </router-view>
    
    <VegetableLoading v-if="isLoading" />
  </div>
  <Footer/>
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
