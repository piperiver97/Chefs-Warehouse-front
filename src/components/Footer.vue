
<script>
export default {
  name: 'FooterComponent',
}
</script>
<template>
  <footer class="footer bg-black text-light py-4 mb-0">
    <div class="container">
      <div class="row g-4">
        <div class="col-12 col-md-6 col-lg-4">
          <h5 class="mb-3 footer-heading">Sobre Nosotros</h5>
          <p class="mb-3">Innovando en soluciones digitales para transformar el futuro.</p>
          <div class="social-icons">
            <a href="https://github.com/piperiver97" target="_blank" rel="noopener noreferrer" class="me-3 social-icon">
              <i class="bi bi-github"></i>
            </a>
          </div>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <h5 class="mb-3 footer-heading">Enlaces Rápidos</h5>
          <ul class="list-unstyled">
            <li><a href="/" class="footer-link">Inicio</a></li>
            <li><a href="/serviciosview" class="footer-link">Servicios</a></li>
            <li><a href="/contactoview" class="footer-link">Contacto</a></li>
          </ul>
        </div>

        <div class="col-12 col-md-6 col-lg-4">
          <h5 class="mb-4 footer-heading">Contáctanos</h5>
          <p>
            <a href="https://github.com/piperiver97" target="_blank" rel="noopener noreferrer" class="footer-link">
              <i class="bi bi-envelope-fill me-2"></i> riverosfelipe2126@gmail.com
            </a>
          </p>
        </div>
      </div>
      <hr class="my-4 bg-secondary">
      <div class="row">
        <div class="col-md-12 text-center">
          <p class="mb-0">© {{ new Date().getFullYear() }} Piperiver97. Todos los derechos reservados.</p>
        </div>
      </div>
    </div>
  </footer>
</template>


<style scoped>
.footer {
  padding: 1rem;
  background-color: #000;
  color: #adb5bd;
}

.footer-heading {
  position: relative;
  padding-bottom: 10px;
}

.footer-heading::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 50px;
  height: 2px;
  background: linear-gradient(90deg, #007bff, #00ff88);
}

.footer-link {
  color: #adb5bd;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: #ffffff;
}

.social-icon {
  font-size: 1.5rem;
  color: #adb5bd;
  transition: color 0.3s ease, transform 0.3s ease;
}

.social-icon:hover {
  color: #ffffff;
  transform: translateY(-3px);
}

/* Responsivo */
@media (max-width: 768px) {
  .footer-heading {
    font-size: 1.2rem;
  }

  .footer-link {
    font-size: 1rem;
  }
  
  .social-icon {
    font-size: 1.2rem;
  }
}
</style>
