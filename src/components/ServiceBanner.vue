<template>
  <div class="container mt-5">
    <h1 class="text-center mb-4">Características del Servicio</h1>

    <div class="row">
      <!-- Características superiores -->
      <div class="col-md-12 mb-4">
        <h2>Características Principales</h2>
        <div class="d-flex flex-wrap justify-content-center">
          <div
            v-for="(feature, index) in topFeatures"
            :key="index"
            class="card text-center m-2"
            style="width: 18rem;"
          >
            <div class="card-body">
              <h5 class="card-title">{{ feature }}</h5>
            </div>
          </div>
        </div>
      </div>

      <!-- Características inferiores -->
      <div class="col-md-12 mb-4">
        <h2>Detalles Adicionales</h2>
        <div class="row">
          <div
            v-for="(feature, index) in bottomFeatures"
            :key="index"
            class="col-md-4 mb-4"
          >
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">{{ feature.title }}</h5>
                <p class="card-text">{{ feature.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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

<style scoped>
.card {
  transition: transform 0.2s; /* Transición suave */
}

.card:hover {
  transform: scale(1.05); /* Efecto de hover */
}
</style>
