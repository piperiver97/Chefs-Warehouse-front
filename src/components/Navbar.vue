
<script setup>
import { ref } from 'vue';

const navItems = ref(['Inicio', 'Soluciones', 'Conocenos', 'Contacto']);

const gradientStyle = {
  padding: '2px',
  background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)'
};
</script>
<template>
  <section>
    <nav class="navbar navbar-dark navbar-expand-lg bg-black py-3">
      <div class="container-fluid">
        <a class="navbar-brand ms-4" href="#">
          <img class="img-fluid logo" src="../assets/images/logo.png" alt="Gradia Logo" />
        </a>
        <div class="collapse navbar-collapse justify-content-center">
          <ul class="navbar-nav">
            <li class="nav-item px-4" v-for="item in navItems" :key="item">
              <a class="nav-link d-inline-block p-0" href="#">
                <h3 class="fs-17 fw-medium text-white mb-0">{{ item }}</h3>
              </a>
            </li>
          </ul>
        </div>
        <div class="d-none d-lg-block me-4">
          <div class="rounded-3" :style="gradientStyle">
            <!-- Content for the gradient box -->
          </div>
        </div>
        <div class="d-lg-none me-4">
          <button class="btn navbar-burger p-0">
            <svg class="text-white" width="51" height="51" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" rx="28" fill="currentColor" />
              <path d="M37 32H19M37 24H19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  </section>
</template>


<style scoped>
.bg-black {
  background-color: black;
}

.btn-black {
  background-color: black;
}

.logo {
  max-width: 130px;
  height: auto;
  margin-left: 200px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

/* Add any additional styles if needed */
</style>