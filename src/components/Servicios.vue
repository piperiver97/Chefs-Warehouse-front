<script setup>
import { ref } from 'vue';

const topFeatures = ref([
  'Gestión eficiente de inventarios',
  'Organización de ingredientes simplificada',
  'Acceso a una lista de proveedores de confianza',
  'Soporte técnico disponible las 24 horas'
]);

const bottomFeatures = ref([
  {
    title: 'Gestión eficiente de inventarios',
    description: 'Manejamos tu inventario con precisión, minimizando pérdidas y optimizando recursos para que tu negocio crezca.'
  },
  {
    title: 'Organización de ingredientes simplificada',
    description: 'Clasificamos y organizamos tus ingredientes, facilitando el acceso y mejorando la eficiencia en la cocina.'
  },
  {
    title: 'Recetas personalizadas para cada cliente',
    description: 'Desarrollamos recetas que se adaptan a tus necesidades y preferencias, garantizando la satisfacción de tus clientes.'
  },
  {
    title: 'Acceso a una lista de proveedores de confianza',
    description: 'Te conectamos con proveedores de calidad, asegurando que siempre tengas los mejores ingredientes disponibles.'
  },
 
  {
    title: 'Informes de inventario en tiempo real',
    description: 'Accede a informes detallados sobre tu inventario en cualquier momento, lo que te permite tomar decisiones informadas.'
  },
 
]);
</script>

  
<template>
    <div>
      <section class="position-relative py-5">
        <div class="container">
          <div class="row">
            <div class="col-12 col-lg-5">
              <img class="img-fluid mb-5 d-lg-none" src="" alt="">
              <h2 class="display-5 mb-4 fw-bold text-white">¿Quienes somos?</h2>
              <p class="lead text-muted mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque massa nibh, pulvinar vitae aliquet nec, accumsan aliquet orci.</p>
              
              <div v-for="(feature, index) in topFeatures" :key="'top-' + index" class="d-flex mb-3">
                <div class="text-muted">
                  <svg style="width: 32px; height: 32px;" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M25.6 22.9C25.7 23 25.8 23 26 23H33C33.6 23 34 22.6 34 22C34 21.8 34 21.7 33.9 21.6L30.4 14.6C30.1 14.1 29.5 13.9 29 14.2C28.9 14.3 28.7 14.4 28.6 14.6L25.1 21.6C24.9 22 25.1 22.6 25.6 22.9ZM29.5 17.2L31.4 21H27.6L29.5 17.2ZM18.5 14C16 14 14 16 14 18.5C14 21 16 23 18.5 23C21 23 23 21 23 18.5C23 16 21 14 18.5 14ZM18.5 21C17.1 21 16 19.9 16 18.5C16 17.1 17.1 16 18.5 16C19.9 16 21 17.1 21 18.5C21 19.9 19.9 21 18.5 21ZM22.7 25.3C22.3 24.9 21.7 24.9 21.3 25.3L18.5 28.1L15.7 25.3C15.3 24.9 14.7 24.9 14.3 25.3C13.9 25.7 13.9 26.3 14.3 26.7L17.1 29.5L14.3 32.3C13.9 32.7 13.9 33.3 14.3 33.7C14.7 34.1 15.3 34.1 15.7 33.7L18.5 30.9L21.3 33.7C21.7 34.1 22.3 34.1 22.7 33.7C23.1 33.3 23.1 32.7 22.7 32.3L19.9 29.5L22.7 26.7C23.1 26.3 23.1 25.7 22.7 25.3ZM33 25H26C25.4 25 25 25.4 25 26V33C25 33.6 25.4 34 26 34H33C33.6 34 34 33.6 34 33V26C34 25.4 33.6 25 33 25ZM32 32H27V27H32V32Z" fill="#3d8bfd" />
                    <circle cx="24" cy="24" r="23.5" stroke="#6ea8fe" />
                    
                  </svg>
                </div>

                <div class="ms-3">
                  <h5 class="fw-normal gradient-text">{{ feature }}</h5>
                  
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-6 mb-5 mb-lg-0">
              <img class="img-fluid" src="../assets/images/Imagenq.jpg" alt="">
            </div>
            <div class="d-none d-lg-block position-absolute top-0 end-0 h-100" 
                 style="width: 50%; background-image: url('../assets/images/daas.jpg'); background-repeat: no-repeat; background-size: cover;">
            </div>
          </div>
        </div>
      </section>
  
      <section class="py-5">
        <div class="container">
          <div class="row align-items-center">
            <div class="col-12 col-lg-6 mb-5 mb-lg-0">
              <img class="img-fluid" src="../assets/images/daas.jpg" alt="">
            </div>
            <div class="col-12 col-lg-5 ms-auto">
              <div>
                <h2 class="display-5 mb-5 fw-bold text-white">¿Porque elegir nuestra empresa?</h2>
                
                <div v-for="(feature, index) in bottomFeatures" :key="'bottom-' + index" class="d-flex mb-4">
                  <div class="text-primary me-2">
                    <svg style="width: 24px; height: 24px" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 class="gradient-text">{{ feature.title }}</h4>
                    <p class="text-muted">{{ feature.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
</template>

  
  
  <style scoped>
  .text-white {
    background: linear-gradient(90deg, #007bff, #00ff88);
    -webkit-background-clip: text; 
    -webkit-text-fill-color: transparent; 
    background-clip: text; 
    color: transparent;  
  }
  
  .text-muted {
    color: #ffffff !important; 
  }
  
  .gradient-text {
     color: aliceblue;
  }
  
  </style>
