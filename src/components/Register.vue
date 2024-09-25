<template>
  <section class="pt-20 pb-32 bg-black overflow-hidden">
    <div class="container">
      <div class="text-center">
        <a class="d-inline-block mb-28" href="#">
          <img class="img-fluid" src="" alt="">
        </a>
      </div>
      <div class="row g-16">
        <div class="col-12 col-md-6">
          <div class="d-flex justify-content-center">
            <div class="d-inline-block p-1 rounded-pill" :style="gradientStyle">
              <img class="img-fluid rounded-pill" src="../assets/images/fa.jpg" alt="">
            </div>
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="mw-md-lg">
            <h2 class="fs-10 text-white mb-2">Bienvenido a CHEF'S WAREHOUSE</h2>
            <p class="fs-17 text-light mb-16">El sitio donde cuidamos tu inventario.</p>
            <form @submit.prevent="handleSubmit">
              <div class="row mb-4 g-4">
                <div class="col-12">
                  <div class="form-group">
                    <label class="fs-18 fw-medium text-white mb-3" for="fullName">Full name</label>
                    <div class="rounded-1" :style="gradientStyle">
                      <input v-model="fullName" class="bg-black text-dark px-5 py-4 w-100 border-0 rounded-1" id="fullName" type="text" placeholder="i.e. John Doe">
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="fs-18 fw-medium text-white mb-3" for="email">Email address</label>
                    <div class="rounded-1" :style="gradientStyle">
                      <input v-model="email" class="bg-black text-dark px-5 py-4 w-100 border-0 rounded-1" id="email" type="email" placeholder="i.e. john@example.com">
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="form-group">
                    <label class="fs-18 fw-medium text-white mb-3" for="password">Password</label>
                    <div class="rounded-1" :style="gradientStyle">
                      <input v-model="password" class="bg-black text-dark px-5 py-4 w-100 border-0 rounded-1" id="password" type="password" placeholder="********">
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
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      agreed: false,
    };
  },
  computed: {
    gradientStyle() {
      return {
        padding: '1px',
        background: 'linear-gradient(90deg, rgba(108,213,246,1) 0%, rgba(248,157,92,1) 50%, rgba(91,106,240,1) 100%)',
        borderRadius: '3px',
      };
    },
    buttonStyle() {
      return {
        letterSpacing: '1px',
        background: 'linear-gradient(98.24deg, #56C1E3 0%, #5B6AF0 100%)',
      };
    }
  },
  methods: {
    handleSubmit() {
      // Handle form submission
      console.log('Form submitted with:', {
        fullName: this.fullName,
        email: this.email,
        password: this.password,
        agreed: this.agreed,
      });
    }
  }
};
</script>

<style scoped>
/* Add any specific styles you need here */
</style>
