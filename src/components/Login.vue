<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/Auth'; // Asegúrate de que la ruta sea correcta
import { useRouter } from 'vue-router'; // Importa useRouter

const authStore = useAuthStore();
const router = useRouter(); // Inicializa el router

const email = ref('');
const password = ref('');

const handleSubmit = async () => {
  try {
    const result = await authStore.login(email.value, password.value);
    if (authStore.user.isAuthenticated) {
      // Redirigir al usuario a SolucionesView
      router.push('/solucionesview');
    } else {
      // Mostrar un mensaje de error
      console.error('Error en el login', result);
    }
  } catch (error) {
    console.error('Error en el login', error);
  }
};

// ... (el resto del código del componente se mantiene igual)
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