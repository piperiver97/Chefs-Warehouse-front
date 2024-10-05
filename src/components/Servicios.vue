<script setup>
import { ref } from 'vue'

const hoveredCard = ref(null)

const services = ref([
  {
    title: 'Sistema de Gestión 4.0',
    description: 'Plataforma inteligente que revoluciona el control de tu inventario',
    icon: 'fas fa-microchip',
    features: [
      'IA para predicción de demanda',
      'Dashboard en tiempo real',
      'Automatización de pedidos',
      'Analítica avanzada'
    ]
  },
  {
    title: 'Almacenamiento Inteligente',
    description: 'Espacios optimizados con tecnología de vanguardia',
    icon: 'fas fa-network-wired',
    features: [
      'Sensores IoT de temperatura',
      'Sistema RFID de tracking',
      'Optimización de espacio con IA',
      'Seguridad biométrica'
    ]
  },
  {
    title: 'Logística Predictiva',
    description: 'Distribución optimizada con algoritmos avanzados',
    icon: 'fas fa-robot',
    features: [
      'Rutas optimizadas por IA',
      'Predicción de tiempos exacta',
      'Flota conectada en tiempo real',
      'Embalaje inteligente'
    ]
  }
])
</script>
<template>
      <div class="container services-section py-5">
        <h2 class="text-center mb-5 section-title">
          Revoluciona tu Inventario con Tecnología de Punta
        </h2>
        <div class="row g-4">
          <div v-for="(service, index) in services" 
               :key="index" 
               class="col-lg-4 col-md-6">
            <div class="service-card" 
                 :class="{ 'active': hoveredCard === index }"
                 @mouseenter="hoveredCard = index"
                 @mouseleave="hoveredCard = null">
              <div class="service-icon">
                <i :class="service.icon"></i>
              </div>
              <h3 class="service-title">{{ service.title }}</h3>
              <p class="service-description">{{ service.description }}</p>
              <ul class="service-features">
                <li v-for="(feature, fIndex) in service.features" 
                    :key="fIndex">
                  {{ feature }}
                </li>
              </ul>
              <button class="btn btn-primary service-btn">Explorar Servicio</button>
            </div>
          </div>
        </div>
      </div>
    
  </template>
  
 
  
  <style scoped>
  .dark-theme {
    background-color: #000000;
    color: #ffffff;
  }
  
  .hero-section {
    position: relative;
    height: 100vh;
    overflow: hidden;
  }
  
  .carousel-item {
    height: 100vh;
  }
  
  .carousel-item img {
    object-fit: cover;
    filter: brightness(0.3);
  }
  
  .carousel-caption {
    top: 50%;
    transform: translateY(-50%);
    bottom: auto;
  }
  
  .text-gradient {
    background: linear-gradient(90deg, #007bff, #00ff88);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    font-size: 4rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px rgba(0, 123, 255, 0.5);
  }
  
  .section-title {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    background: linear-gradient(90deg, #007bff, #00ff88);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
  
  .service-card {
    background: linear-gradient(145deg, #0c1e3d, #162a47);
    border-radius: 20px;
    padding: 2rem;
    height: 100%;
    transition: all 0.3s ease;
    border: 1px solid #1e3a5f;
    position: relative;
    overflow: hidden;
    box-shadow: 0 10px 30px rgba(0, 123, 255, 0.1);
  }
  
  .service-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(145deg, rgba(0,123,255,0.1), rgba(0,255,136,0.1));
    opacity: 0;
    transition: opacity 0.3s ease;
  }
  
  .service-card.active {
    transform: translateY(-10px);
  }
  
  .service-card.active::before {
    opacity: 1;
  }
  
  .service-icon {
    font-size: 2.5rem;
    margin-bottom: 1.5rem;
    color: #00ff88;
    transition: all 0.3s ease;
  }
  
  .service-card.active .service-icon {
    color: #007bff;
  }
  
  .service-title {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: #ffffff;
  }
  
  .service-description {
    margin-bottom: 1.5rem;
    color: #a3b3c9;
  }
  
  .service-features {
    list-style: none;
    padding: 0;
    margin-bottom: 1.5rem;
  }
  
  .service-features li {
    margin-bottom: 0.5rem;
    color: #ffffff;
    position: relative;
    padding-left: 1.5rem;
  }
  
  .service-features li::before {
    content: '✓';
    position: absolute;
    left: 0;
    color: #00ff88;
  }
  
  .service-btn {
    background: linear-gradient(90deg, #007bff, #00ff88);
    border: none;
    color: #ffffff;
    font-weight: bold;
    padding: 0.75rem 1.5rem;
    border-radius: 50px;
    transition: all 0.3s ease;
  }
  
  .service-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    .text-gradient {
      font-size: 2.5rem;
    }
    
    .section-title {
      font-size: 2rem;
    }
  }
  </style>