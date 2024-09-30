<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/Auth'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'vue-router'; // Importa useRouter

const authStore = useAuthStore();
const router = useRouter(); // Inicializa el router

const email = ref('');
const password = ref('');

// Estilos para el gradiente y el botón
const gradientStyle = {
  padding: '1px',
  background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
  borderRadius: '3px',
};

const buttonStyle = {
  letterSpacing: '1px',
  background: 'linear-gradient(98.24deg, #56C1E3 0%, #5B6AF0 100%)',
};

// Asegúrate de que el texto del input sea blanco al escribir
const inputStyle = {
  backgroundColor: 'black',
  color: 'white', // Cambia el color del texto a blanco
};

const handleSubmit = async () => {
  try {
    const result = await authStore.login(email.value, password.value);
    if (authStore.user.isAuthenticated) {
      // Redirigir al usuario a SolucionesView
      router.push('/serviciosview');
    } else {
      // Mostrar un mensaje de error
      console.error('Error en el login', result);
    }
  } catch (error) {
    console.error('Error en el login', error);
  }
};
</script>

<template>
  <section class="pt-20 pb-32 bg-black overflow-hidden">
    <div class="container">
      <div class="row g-16">
        <div class="col-12 col-md-6">
          <div class="mw-md-lg">
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
                        :style="inputStyle"
                        class="px-5 py-4 w-100 border-0 rounded-1"
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
                        :style="inputStyle"
                        class="px-5 py-4 w-100 border-0 rounded-1"
                        id="password"
                        type="password"
                        placeholder="********"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <button
                class="btn btn-light-light fs-20 fw-semibold px-4 py-2 border-3 text-white text-uppercase mb-8 rounded-pill"
                type="submit"
                :style="buttonStyle"
              >
                Acceder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Add any specific styles you need here */
</style>
