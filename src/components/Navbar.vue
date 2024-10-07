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
        <router-link class="navbar-brand ms-4" to="/">
          <img class="img-fluid logo" src="../assets/images/logo.png" alt="Gradia Logo" />
        </router-link>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item px-4" v-for="item in navItems" :key="item.name">
              <router-link class="nav-link d-inline-block p-0" :to="item.link">
                <h3 class="fs-17 fw-medium text-white mb-0">{{ item.name }}</h3>
              </router-link>
            </li>
          </ul>
        </div>

        <div class="d-lg-none me-4">
          <button class="btn navbar-burger p-0">
            
              <rect width="56" height="56" rx="28" fill="currentColor" />
              <path
                d="M37 32H19M37 24H19"
                stroke="black"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
          
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
  margin-left: 20px;
}

@media (max-width: 576px) {
  .logo {
    max-width: 100px;
    margin-left: 0;
  }

  .navbar {
    padding-left: 10px;
    padding-right: 10px;
  }
}

@media (max-width: 768px) {
  .navbar-brand {
    justify-content: center;
    margin-left: 0;
  }
  
  .nav-item {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
