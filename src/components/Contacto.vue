<script setup>
import { ref } from 'vue'

const hoveredCard = ref(null)

const contactMethods = ref([
  {
    type: 'location',
    title: 'Visítanos',
    description: 'Conoce nuestras instalaciones de última generación',
    icon: 'fas fa-building',
    address: 'Gijon - Asturias',
    hours: 'Lun - Vie: 9:00 - 18:00',
    buttonText: 'Ver en Mapa'
  },
  {
    type: 'phone',
    title: 'Llámanos',
    description: 'Soporte técnico y atención inmediata',
    icon: 'fas fa-phone-alt',
    phone: '+34 6314072',
    support: 'Soporte 24/7',
    buttonText: 'Llamar Ahora'
  },
  {
    type: 'online',
    title: 'Conéctate',
    description: 'Consulta online y redes sociales',
    icon: 'fas fa-globe',
    email: 'riverosfelipe2126@gmail.com',
    social: [
      { name: 'LinkedIn', url: '#', icon: 'fab fa-linkedin' },
      { name: 'Twitter', url: '#', icon: 'fab fa-twitter' },
      { name: 'Instagram', url: '#', icon: 'fab fa-instagram' }
    ],
    buttonText: 'Enviar Email'
  }
])

const handleContact = (contact) => {
  switch(contact.type) {
    case 'location':
      window.open(`https://maps.google.com/?q=${encodeURIComponent(contact.address)}`, '_blank')
      break
    case 'phone':
      window.location.href = `tel:${contact.phone}`
      break
    case 'online':
      window.location.href = `mailto:${contact.email}`
      break
  }
}
</script>
<template>
  <div class="dark-theme">
    <div class="hero-section">
      <div class="hero-content">
        <h1 class="display-3 fw-bold text-gradient">Contacta con Nosotros</h1>
        <p class="lead hero-subtitle">Estamos aquí para revolucionar la gestión de tu inventario</p>
      </div>
    </div>

    <div class="container contact-section py-5">
      <div class="row g-4">
        <div v-for="(contact, index) in contactMethods" 
             :key="index" 
             class="col-lg-4 col-md-6 col-sm-12"> <!-- Ajuste para pantallas pequeñas -->
          <div class="contact-card" 
               :class="{ 'active': hoveredCard === index }"
               @mouseenter="hoveredCard = index"
               @mouseleave="hoveredCard = null">
            <div class="contact-icon">
              <i :class="contact.icon"></i>
            </div>
            <h3 class="contact-title">{{ contact.title }}</h3>
            <p class="contact-description">{{ contact.description }}</p>
            <div class="contact-details">
              <template v-if="contact.type === 'location'">
                <p><i class="fas fa-map-marker-alt"></i> {{ contact.address }}</p>
                <p><i class="fas fa-clock"></i> {{ contact.hours }}</p>
              </template>
              <template v-else-if="contact.type === 'phone'">
                <a :href="'tel:' + contact.phone" class="contact-link">
                  <i class="fas fa-phone"></i> {{ contact.phone }}
                </a>
                <p><i class="fas fa-headset"></i> {{ contact.support }}</p>
              </template>
              <template v-else-if="contact.type === 'online'">
                <a :href="'mailto:' + contact.email" class="contact-link">
                  <i class="fas fa-envelope"></i> {{ contact.email }}
                </a>
                <div class="social-links">
                  <a v-for="social in contact.social" 
                     :key="social.name"
                     :href="social.url" 
                     class="social-icon"
                     :title="social.name">
                    <i :class="social.icon"></i>
                  </a>
                </div>
              </template>
            </div>
            <button class="btn btn-primary contact-btn" @click="handleContact(contact)">
              {{ contact.buttonText }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped>
.dark-theme {
  background-color: black;
  color: #ffffff;
}

.hero-section {
  position: relative;
  height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: black,
              url('your-hero-image.jpg') center/cover no-repeat;
}

.text-gradient {
  background: linear-gradient(90deg, #007bff, #00ff88);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-size: 4rem;
  margin-bottom: 1rem;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #a3b3c9;
}

.contact-card {
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

.contact-card.active {
  transform: translateY(-10px);
  box-shadow: 0 15px 40px rgba(0, 123, 255, 0.2);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #00ff88;
  transition: all 0.3s ease;
}

.contact-card.active .contact-icon {
  color: #007bff;
}

.contact-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #ffffff;
}

.contact-description {
  margin-bottom: 1.5rem;
  color: #a3b3c9;
}

.contact-details {
  margin-bottom: 1.5rem;
}

.contact-details p, .contact-link {
  color: #ffffff;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  text-decoration: none;
}

.contact-details i {
  margin-right: 10px;
  color: #00ff88;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 1rem;
}

.social-icon {
  color: #ffffff;
  font-size: 1.5rem;
  transition: color 0.3s ease;
}

.social-icon:hover {
  color: #00ff88;
}

.contact-btn {
  background: linear-gradient(90deg, #007bff, #00ff88);
  border: none;
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem 1.5rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  width: 100%;
}

.contact-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 123, 255, 0.3);
}
@media (max-width: 768px) {
  .text-gradient {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }

  .contact-card {
    padding: 1.5rem;
  }

  .contact-icon {
    font-size: 2rem;
  }

  .contact-title {
    font-size: 1.2rem;
  }

  .contact-description {
    font-size: 0.9rem;
  }

  .contact-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

@media (max-width: 576px) {
  .contact-section {
    padding: 2rem 1rem;
  }

  .contact-title {
    font-size: 1rem;
  }

  .contact-description {
    font-size: 0.85rem;
  }
}

@media (max-width: 768px) {
  .text-gradient {
    font-size: 2.5rem;
  }
  
  .hero-subtitle {
    font-size: 1.2rem;
  }
}
</style>
