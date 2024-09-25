<script setup>
import { ref, computed } from 'vue';
import Login from './Login.vue';  // Importar el componente Login
import Register from './Register.vue';  // Importar el componente Register

// Variable reactiva para rastrear el botón sobre el que se está pasando el ratón
const hoverButton = ref(null);

// Variable reactiva para rastrear el botón seleccionado
const selectedButton = ref(1); // Inicialmente seleccionado el botón "ACCEDER"

// Computed para el estilo del degradado del borde
const gradientStyle = computed(() => ({
  padding: '1px',
  background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
}));

// Función para obtener el estilo del botón
const getButtonStyle = (buttonId) => {
  if (selectedButton.value === buttonId || hoverButton.value === buttonId) {
    // Si el botón está seleccionado o está siendo hovered, cambiamos el fondo al degradado
    return {
      background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
      color: '#fff',
      border: '2px solid transparent',
    };
  }
  // De lo contrario, solo tiene el borde degradado
  return {
    border: '2px solid',
    borderImage: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
    borderImageSlice: 1,
  };
};
</script>
<template>
  <section class="pt-20 pb-32 bg-black overflow-hidden">
    <div class="container">
      <div class="row g-16">
        <div class="col-12 col-md-6">
          <div class="d-flex justify-content-center">
            <div class="d-inline-block p-1 rounded-pill" :style="gradientStyle">
              <img class="img-fluid rounded-pill" src="../assets/images/fa.jpg" alt="" />
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mw-md-lg">
            <h2 class="fs-10 text-white mb-2">Bienvenido a CHEF'S WAREHOUSE</h2>
            <p class="fs-17 text-light mb-16">
              Lorem ipsum dolor sit amet, consectetur adipis.
            </p>
            <form @submit.prevent="handleSubmit">
              <div class="row mb-4 g-4">
                <div class="col-12">
                  <div class="form-group">
                    <label class="fs-18 fw-medium text-white mb-3" for="email">
                      Ingrese su correo
                    </label>
                    <div class="rounded-1" :style="gradientStyle">
                      <input
                        v-model="email"
                        class="bg-black text-dark px-5 py-4 w-100 border-0 rounded-1"
                        id="email"
                        type="email"
                        placeholder="ejemplo.ware@hotmail.com"
                      />
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="fs-18 fw-medium text-white mb-3" for="password">
                      Contraseña
                    </label>
                    <div class="rounded-1" :style="gradientStyle">
                      <input
                        v-model="password"
                        class="bg-black text-dark px-5 py-4 w-100 border-0 rounded-1"
                        id="password"
                        type="password"
                        placeholder="********"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-light-light fs-20 fw-semibold px-5 py-4 border-3 text-white text-uppercase mb-8 rounded-pill"
                type="submit"
                :style="buttonStyle"
              >
                Registrar
              </button>

              <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio1"
                  autocomplete="off"
                  checked
                />
                <label
                  class="btn btn-lg rounded-4 px-5 py-3 me-2"
                  :style="getButtonStyle(1)"
                  for="btnradio1"
                  @mouseover="hoverButton = 1"
                  @mouseleave="hoverButton = null"
                  @click="selectedButton = 1"
                  >ACCEDER</label
                >

                <input
                  type="radio"
                  class="btn-check"
                  name="btnradio"
                  id="btnradio2"
                  autocomplete="off"
                />
                <label
                  class="btn btn-lg rounded-4 px-5 py-3"
                  :style="getButtonStyle(2)"
                  for="btnradio2"
                  @mouseover="hoverButton = 2"
                  @mouseleave="hoverButton = null"
                  @click="selectedButton = 2"
                  >REGISTRO</label
                >
              </div>
             
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<style scoped>
/* Agregar estilos adicionales si es necesario */
</style>
