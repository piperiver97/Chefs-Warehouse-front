<template>
  <div class="page-container">
    <footer class="footer bg-black text-light py-4">
      <div class="container">
        <div class="row g-4">
          <div class="col-md-6 col-lg-4">
            <h5 class="mb-3 footer-heading">Sobre Nosotros</h5>
            <p class="mb-3">Innovando en soluciones digitales para transformar el futuro.</p>
            <div class="social-icons">
              <a href="https://github.com/piperiver97" target="_blank" rel="noopener noreferrer" class="me-3 social-icon">
                <i class="bi bi-github"></i>
              </a>
              <!-- Añade más iconos de redes sociales si lo deseas -->
            </div>
          </div>
          <div class="col-md-6 col-lg-4">
            <h5 class="mb-3 footer-heading">Enlaces Rápidos</h5>
            <ul class="list-unstyled">
              <li><a href="#" class="footer-link">Inicio</a></li>
              <li><a href="#" class="footer-link">Servicios</a></li>
              <li><a href="#" class="footer-link">Proyectos</a></li>
              <li><a href="#" class="footer-link">Contacto</a></li>
            </ul>
          </div>
          <div class="col-md-6 col-lg-4">
            <h5 class="mb-4 footer-heading">Contáctanos</h5>
            <p><i class="bi bi-envelope-fill me-2"></i> feliperiveros123@gmail.com</p>
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
  </div>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.page-container {
  min-height: 100vh; /* Asegura que el contenedor ocupe toda la altura de la ventana */
  display: flex;
  flex-direction: column;
}

.footer {
  margin-top: auto; /* Empuja el footer hacia abajo */
 
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

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.footer::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(90deg, #007bff, #00ff88, #007bff);
  background-size: 200% 200%;
  animation: gradientFlow 5s ease infinite;
}
</style>
