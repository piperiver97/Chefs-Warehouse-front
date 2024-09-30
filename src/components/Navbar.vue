<script setup>
import { ref } from 'vue';

const navItems = ref([
  { name: 'Inicio', link: '/' },
  { name: 'Servicios', link: '/serviciosview' },
  { name: 'Contacto', link: '/contactoview' },
]);

</script>
<template>
  <section>
    <nav class="navbar navbar-dark navbar-expand-lg bg-black py-3">
      <div class="container-fluid">
        <!-- Cambiamos el <a> por <router-link> -->
        <router-link class="navbar-brand ms-4" to="/">
          <img class="img-fluid logo" src="../assets/images/logo.png" alt="Gradia Logo" />
        </router-link>
        <div class="collapse navbar-collapse justify-content-center">
          <ul class="navbar-nav">
            <li class="nav-item px-4" v-for="item in navItems" :key="item.name">
              <router-link class="nav-link d-inline-block p-0" :to="item.link">
                <h3 class="fs-17 fw-medium text-white mb-0">{{ item.name }}</h3>
              </router-link>
            </li>
          </ul>
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
  margin-left: 100px;
}

.navbar-brand {
  display: flex;
  align-items: center;
}

/* Add any additional styles if needed */
</style>