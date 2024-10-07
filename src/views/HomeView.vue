<script setup>
import { ref, computed } from 'vue';
import Login from '../components/Login.vue';
import Navbar from '@/components/Navbar.vue';

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
</template>

<style scoped>
.full-height {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-section {
  flex-grow: 1;
  display: flex;
  align-items: center;
  position: relative;
  overflow: hidden;
}

.content-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at center, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.8) 100%);
  z-index: 1;
}

.container {
  position: relative;
  z-index: 2;
}

h2 {
  font-size: 3.5rem !important;
  font-weight: 700;
  background: linear-gradient(90deg, #6CD5F6, #F89D5C, #5B6AF0);
  -webkit-background-clip: text;
  color: transparent;
  margin-bottom: 1.5rem;
}

.text-light {
  color: rgba(255, 255, 255, 0.8) !important;
  font-size: 1.2rem !important;
  line-height: 1.6;
}

.btn-group {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.btn-check {
  display: none;
}

.btn {
  position: relative;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all 0.3s ease;
  cursor: pointer;
  overflow: hidden;
}

.btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, #6CD5F6, #F89D5C, #5B6AF0);
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: -1;
}

.btn:hover::before {
  opacity: 1;
}

.rounded-pill {
  position: relative;
}

.rounded-pill::after {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background: linear-gradient(90deg, #6CD5F6, #F89D5C, #5B6AF0);
  filter: blur(20px);
  z-index: -1;
  opacity: 0.6;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  h2 {
    font-size: 2.5rem !important;
  }

  .btn-group {
    flex-direction: column;
  }

  .content-section {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }

  .mw-md-lg {
    max-width: 100%;
  }
}
</style>
