<script setup>
import { ref } from 'vue';
import { useAuthStore } from '../stores/Auth';
import { useRouter } from 'vue-router';

const authStore = useAuthStore();
const router = useRouter();

const username = ref('');
const password = ref('');
const isLoading = ref(false);
const localError = ref('');

const handleSubmit = async () => {
  if (isLoading.value) return;

  localError.value = '';
  isLoading.value = true;

  try {
    const success = await authStore.login(username.value, password.value);
    console.log('Login success:', success);
    console.log('User role:', authStore.user.roles);

    if (success) {
      if (authStore.user.roles.includes('ADMIN')) {
        console.log('Redirecting to admin view');
        await router.push('/adminview');
      } else if (authStore.user.roles.includes('USER')) {
        console.log('Redirecting to servicios view');
        await router.push('/ingredientview');
      } else {
        console.log('Unknown role:', authStore.user.roles);
        localError.value = 'Rol no reconocido';
      }
    }
  } catch (error) {
    console.error('Error en login:', error);
    localError.value = 'Error al conectar con el servidor';
  } finally {
    isLoading.value = false;
  }
};

</script>
<template>
  <div class="container">
    <form @submit.prevent="handleSubmit">
      <div class="row mb-4 g-4">
        <div class="col-12">
          <div class="form-group">
            <label class="fs-18 fw-medium text-white mb-3" for="username">
              Ingrese su usuario
            </label>
            <div
              class="rounded-1"
              style="padding: 1px; background: linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%);"
            >
              <input
                v-model="username"
                class="px-5 py-4 w-100 border-0 rounded-1"
                id="username"
                type="text"
                placeholder="Nombre de usuario"
                required
                style="background: black; color: white;"
              />
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class="form-group">
            <label class="fs-18 fw-medium text-white mb-3" for="password">
              Contraseña
            </label>
            <div
              class="rounded-1"
              style="padding: 1px; background: linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%);"
            >
              <input
                v-model="password"
                class="px-5 py-4 w-100 border-0 rounded-1"
                id="password"
                type="password"
                placeholder="********"
                required
                style="background: black; color: white;"
              />
            </div>
          </div>
        </div>
      </div>

      <div v-if="localError || authStore.error" class="text-danger mb-3">
        {{ localError || authStore.error }}
      </div>
      
      <button
        class="btn btn-light-light fs-20 fw-semibold px-4 py-2 border-3 text-white text-uppercase mb-8 rounded-pill"
        type="submit"
        :disabled="isLoading"
        style="letter-spacing: 1px; background: linear-gradient(98.24deg, #56C1E3 0%, #5B6AF0 100%);"
      >
        {{ isLoading ? 'Cargando...' : 'Acceder' }}
      </button>
    </form>
  </div>
</template>


<style scoped>
input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

input:focus {
  outline: none;
}

@media (max-width: 576px) {
  .px-5 {
    padding-left: 1rem !important;
    padding-right: 1rem !important;
  }
  
  .py-4 {
    padding-top: 0.5rem !important;
    padding-bottom: 0.5rem !important;
  }

  .fs-18 {
    font-size: 14px !important;
  }

  .rounded-1 {
    border-radius: 5px !important;
  }
}

@media (max-width: 768px) {
  .fs-18 {
    font-size: 16px !important;
  }

  .rounded-1 {
    border-radius: 7px !important;
  }
}

@media (min-width: 1200px) {
  .fs-18 {
    font-size: 20px !important;
  }

  .px-5 {
    padding-left: 2rem !important;
    padding-right: 2rem !important;
  }
}
</style>

