<!-- BuscadorVoz.vue -->
<template>
    <div class="buscador-voz">
      <button @click="iniciarReconocimiento" class="kitchen-btn">
        🎙️​
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, defineEmits } from 'vue';
  
  const emit = defineEmits(); // Define la función emit para emitir eventos
  
  const resultadoVoz = ref('');
  
  const iniciarReconocimiento = () => {
    const reconocimiento = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    
    reconocimiento.lang = 'es-ES'; // Establecer el idioma a español
    reconocimiento.interimResults = false;
    reconocimiento.maxAlternatives = 1;
  
    reconocimiento.onresult = (event) => {
      resultadoVoz.value = event.results[0][0].transcript;
      // Emitir el resultado para que el componente padre lo reciba
      emit('resultado', resultadoVoz.value);
    };
  
    reconocimiento.onerror = (event) => {
      console.error('Error en el reconocimiento de voz:', event.error);
      // Aquí puedes manejar el error para mostrar un mensaje al usuario, por ejemplo
      if (event.error === 'no-speech') {
        alert('No se detectó habla, por favor inténtalo de nuevo.');
      }
    };
  
    reconocimiento.start();
  };
  </script>
  
  <style scoped>
  .buscador-voz {
    margin-top: 1rem;
  }
  .kitchen-btn {
    /* Añadir estilos para el botón según sea necesario */
  }
  </style>
  