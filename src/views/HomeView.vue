<script setup>
import { ref, computed } from 'vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const selectedButton = ref(1);
const hoverButton = ref(null);

const gradientStyle = computed(() => ({
  padding: '1px',
  background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
}));

const getButtonStyle = (buttonId) => {
  if (selectedButton.value === buttonId || hoverButton.value === buttonId) {
    return {
      background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
      color: '#fff',
      border: '2px solid transparent',
    };
  }
  return {
    border: '2px solid',
    borderImage: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
    borderImageSlice: 1,
  };
};
</script>
<template>
  <main class="full-height">
    <Navbar />
    <div class="content-section pt-20 pb-32 bg-black overflow-hidden">
      <div class="container h-100">
        <div class="row g-16 h-100">
          <div class="col-12 col-md-6 d-flex align-items-center justify-content-center">
            <div class="d-inline-block p-1 rounded-pill" :style="gradientStyle">
              <img class="img-fluid rounded-pill" src="../assets/images/Banner.jpeg" alt="" />
            </div>
          </div>
          <div class="col-12 col-md-6 d-flex align-items-center">
            <div class="mw-md-lg">
              <h2 class="fs-10 text-white mb-2">Bienvenido a CHEF'S WAREHOUSE</h2>
              <p class="fs-17 text-light mb-16">El sitio donde cuidamos tu inventario.</p>

              <div class="btn-group mb-4" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  :checked="selectedButton === 1"
                />
                <label
                  class="btn btn-lg rounded-4 px-5 py-3 me-2"
                  :style="getButtonStyle(1)"
                  for="btnradio1"
                  @mouseover="hoverButton = 1"
                  @mouseleave="hoverButton = null"
                  @click="selectedButton = 1"
                >
                  ACCEDER
                </label>

                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                  :checked="selectedButton === 2"
                />
                <label
                  class="btn btn-lg rounded-4 px-5 py-3"
                  :style="getButtonStyle(2)"
                  for="btnradio2"
                  @mouseover="hoverButton = 2"
                  @mouseleave="hoverButton = null"
                  @click="selectedButton = 2"
                >
                  REGISTRO
                </label>
              </div>

              <transition name="fade" mode="out-in">
                <component :is="selectedButton === 1 ? Login : Register" key="selectedComponent" />
              </transition>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <Footer />
</template>



<style scoped>
/* Para que el main ocupe el 100% de la altura de la pantalla */
.full-height {
  height: 120vh;
  display: flex;
  flex-direction: column;
}

/* Ajustar la altura de la sección de contenido */
.content-section {
  flex-grow: 1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}


</style>
