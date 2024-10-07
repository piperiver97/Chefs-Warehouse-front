
<script setup>
</script>
<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark kitchen-navbar">
      <div class="container-fluid">
          <i class="bi bi-knife me-2"></i>
          <router-link to="/" class="nav-link" active-class="active">
            <img class="logotipo" src="../assets/images/logo.png"  >
              </router-link>
          

        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/ingredientview" class="nav-link" active-class="active">
                <i class="bi bi-egg-fried me-1"></i>
                Ingredientes
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/providerview" class="nav-link" active-class="active">
                <i class="bi bi-truck me-1"></i>
                Proveedores
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/recipeview" class="nav-link" active-class="active">
                <i class="bi bi-journal-text me-1"></i>
                Recetas
              </router-link>
            </li>
          </ul>
          <div class="navbar-filter">
          </div>
        </div>
      </div>
    </nav>
  </template>
  
  
  <style scoped>
  .logotipo{
    max-width: 100px;
  }
  .kitchen-navbar {
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    background: linear-gradient(135deg, #000000, #1a1a1a) !important;
  }
  
  .navbar-brand {
    font-family: 'Playfair Display', serif;
    font-size: 1.5rem;
  }
  
  .nav-link {
    font-family: 'Roboto', sans-serif;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-size: 0.9rem;
    padding: 0.5rem 1rem;
    transition: all 0.3s ease;
  }
  
  .nav-link:hover {
    color: #ffc107 !important;
  }
  
  .nav-link.active {
    color: #ffc107 !important;
    font-weight: bold;
  }
  
  .navbar-filter {
    margin-left: 1rem;
  }
  
  @media (max-width: 991.98px) {
    .navbar-filter {
      margin-top: 1rem;
      margin-left: 0;
    }
  }
  </style>