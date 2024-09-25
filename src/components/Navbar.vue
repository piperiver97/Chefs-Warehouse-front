<script>
export default {
  name: 'NavbarComponent',
  data() {
    return {
      navItems: ['Inicio', 'Soluciones', 'Conocenos', 'Contacto'], 
    };
  },
};
</script>
<template>
  <section>
    <nav class="navbar navbar-dark navbar-expand-lg bg-black py-3 px-5">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">
          <img class="img-fluid logo-small" src="../assets/images/logo.png" alt="Gradia Logo" />
        </a>
        <div class="collapse navbar-collapse me-5 justify-content-center">
          <ul class="navbar-nav">
            <li class="nav-item p-5" v-for="item in navItems" :key="item">
              <a class="nav-link d-inline-block p-0" href="#">
                <h3 class="fs-17 fw-medium text-white mb-0">{{ item }}</h3>
              </a>
            </li>
          </ul>
        </div>
        <div class="d-none d-lg-block">
          <div class="rounded-3" style="padding:2px; background: linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)">
       
          </div>
        </div>
        <div class="d-lg-none">
          <button class="btn navbar-burger p-0">
            <svg class="text-white" width="51" height="51" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="56" height="56" rx="28" fill="currentColor" />
              <path d="M37 32H19M37 24H19" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
    <!-- Rest of the code remains the same -->
  </section>
</template>



<style scoped>
.bg-black {
  background-color: black;
}

.btn-black {
  background-color: black;
}

.logo-small {
  max-width: 80px; /* Adjust this value to make the logo smaller */
  height: auto;
}

/* Add any additional styles if needed */
</style>